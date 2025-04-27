import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, mergeAll, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/state/app.state';
import { accessTokenSelector } from '@app/state/auth/auth.selector';
import { GeneralService } from '../../static/services/general.service';

/**
 * This guard is used to check if the user can activate the route.
 */
@Injectable({
  providedIn: 'root',
})
export class PartnerAccessAccessGuard implements CanActivate {
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);
  private readonly generalService = inject(GeneralService);
  /**
   * This method is used to check if the user can activate the route.
   * @returns {Observable<boolean>} - The observable of the boolean.
   */
  public canActivate(): Observable<boolean> {
    return this.store.select(accessTokenSelector).pipe(
      take(1),
      // eslint-disable-next-line sonarjs/function-return-type
      map(isLoggedIn => {
        if (isLoggedIn) {
          return this.generalService.getAccessToStand().pipe(
            take(1),
            map(res => {
              // eslint-disable-next-line sonarjs/no-selector-parameter
              if (res) {
                return true;
              } else {
                void this.router.navigate(['/general/uvod']);
                return false;
              }
            }),
          );
        } else {
          void this.router.navigate(['/general/uvod']);
          return false;
        }
      }),
      map(obs => (obs instanceof Observable ? obs : of(obs))),
      mergeAll(),
    );
  }
}
