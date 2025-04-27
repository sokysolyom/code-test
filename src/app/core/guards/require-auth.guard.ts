import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { IAppState } from '@app/state/app.state';
import { authSelector } from '@app/state/auth/auth.selector';

/**
 * Require Auth Guard
 * @description Guards routes that require authentication
 */
@Injectable({
  providedIn: 'root',
})
export class RequireAuthGuard implements CanActivate {
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);

  /**
   * Can Activate
   * @description Check if user has valid access token
   * @returns {Observable<boolean>} - Observable
   */
  public canActivate(): Observable<boolean> {
    return this.store.select(authSelector).pipe(
      take(1),
      map(auth => {
        if (auth.accessToken) {
          void this.router.navigate(['/general/uvod']);
          return false;
        }
        return true;
      }),
    );
  }
}
