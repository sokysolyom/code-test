import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { IAppState } from '@app/state/app.state';
import { userIdSelector } from '@app/state/auth/auth.selector';

/**
 * Auth Guard
 */
@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);

  /**
   * Can Activate
   * @description Check if user is authenticated
   * @returns {Observable<boolean>} - Observable
   */
  public canActivate(): Observable<boolean> {
    return this.store.select(userIdSelector).pipe(
      take(1),
      map(id => {
        if (id !== null) {
          void this.router.navigate(['/general/uvod']);
          return false;
        }
        return true;
      }),
    );
  }
}
