import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { removeAuthCredentials } from './auth.action'; // Adjust the path as necessary

/**
 * This effect is responsible for redirecting the user to the login page
 */
@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  public redirectToLogin$ = createEffect(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    (): Observable<Action<'[Auth] Remove Auth Credentials'>> =>
      this.actions$.pipe(
        ofType(removeAuthCredentials), // Listen for the specific action
        tap(() => {
          void this.router.navigate(['/auth/prihlasenie']); // Redirect the user
        }),
      ),
    { dispatch: false }, // No further actions dispatched
  );
}
