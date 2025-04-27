import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IAppState } from '@app/state/app.state';
import {
  accessTokenSelector,
  refreshTokenSelector,
} from '@app/state/auth/auth.selector';
import {
  postAuthAccessToken,
  removeAuthCredentials,
} from '@app/state/auth/auth.action';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../services/loading.service';
import { HttpCancelService } from '../services/http-cancel.service';

export const BYPASS_INTERCEPTOR = new HttpContextToken(() => false);
export const BYPASS_LOADING = new HttpContextToken(() => false);
export const BYPASS_REFRESH_STRATEGY = new HttpContextToken(() => false);

export const httpRequestInterceptor: HttpInterceptorFn = (request, next) => {
  const store = inject(Store<IAppState>);
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);
  const httpCancelService = inject(HttpCancelService);

  const isRefreshing = new BehaviorSubject<boolean>(false);
  const refreshTokenSubject = new BehaviorSubject<string | null>(null);

  const addRequestHeaders = (
    req: HttpRequest<unknown>,
  ): Observable<HttpRequest<unknown>> => {
    return store.select(accessTokenSelector).pipe(
      take(1),
      map(token =>
        req.clone({
          headers: token
            ? req.headers.set('Authorization', `Bearer ${token}`)
            : req.headers,
        }),
      ),
    );
  };

  const handle401Error = (
    req: HttpRequest<unknown>,
    nextHandler: HttpHandlerFn,
  ): Observable<HttpEvent<unknown>> => {
    if (isRefreshing.getValue()) {
      return refreshTokenSubject.pipe(
        takeUntil(httpCancelService.onCancelPendingRequests()),
        filter(token => token != null),
        take(1),
        concatMap(() => addRequestHeaders(req)),
        switchMap(requestWithToken => nextHandler(requestWithToken)),
      );
    } else {
      isRefreshing.next(true);
      refreshTokenSubject.next(null);
      return store.select(refreshTokenSelector).pipe(
        take(1),
        filter(token => (token?.length ?? 0) > 0),
        concatMap(token => authService.performTokenRefresh(token ?? '')),
        concatMap(data => {
          store.dispatch(
            postAuthAccessToken({
              accessToken: data.accessToken,
            }),
          );
          isRefreshing.next(false);
          refreshTokenSubject.next(data.accessToken);
          return addRequestHeaders(req);
        }),
        concatMap(requestWithHeaders => nextHandler(requestWithHeaders)),
        catchError(error => {
          isRefreshing.next(false);
          refreshTokenSubject.next(null);
          httpCancelService.cancelPendingRequests();
          store.dispatch(removeAuthCredentials());
          return throwError(() => error);
        }),
      );
    }
  };

  const isApiRequest = request.urlWithParams.startsWith(environment.baseUrl);

  if (request.context.get(BYPASS_INTERCEPTOR) === true || !isApiRequest) {
    return next(request);
  } else {
    if (request.context.get(BYPASS_LOADING) === false) {
      loadingService.showLoading();
    }

    return addRequestHeaders(request).pipe(
      switchMap(requestWithHeaders => next(requestWithHeaders)),
      tap(e => {
        if (e instanceof HttpResponse) {
          loadingService.hideLoading();
        }
      }),
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          request.context.get(BYPASS_REFRESH_STRATEGY) !== true
        ) {
          loadingService.hideLoading();
          return handle401Error(request, next);
        } else {
          loadingService.hideLoading();
          return throwError(() => error);
        }
      }),
    );
  }
};
