/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { getReasonPhrase } from 'http-status-codes';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

interface IErrorResponse {
  message?: string;
  // Add any other fields you expect in the error response
}

export const HttpErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<any> => {
  const notificationService = inject(NotificationService);

  return next(request).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      if (errorResponse.status >= 500) {
        const errMessage =
          errorResponse.status === 0
            ? 'Portal connection lost, trying to reconnect'
            : ((errorResponse.error as IErrorResponse).message ?? // Type assertion here
              getReasonPhrase(errorResponse.status));

        notificationService.error(`Error: ${errMessage}`);
      }

      return throwError(() => errorResponse);
    }),
  );
};
