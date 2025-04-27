import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { IAppState } from '@app/state/app.state';
import { authSelector } from '@app/state/auth/auth.selector';

/**
 * Auth Guard
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);

  /**
   * Can Activate
   * @description Check if user is authenticated
   * @returns {Observable<boolean>} - Observable
   */
  public canActivate(): Observable<boolean> {
    return this.store.select(authSelector).pipe(
      take(1),
      map(auth => {
        if (!auth.accessToken) {
          void this.router.navigate(['/auth']);
          return false;
        }
        return true;
      }),
    );
  }
}
