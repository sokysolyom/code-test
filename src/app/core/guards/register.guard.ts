// register.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { IAppState } from '@app/state/app.state';
import { eventRegisterSelector } from '@app/state/event-register/event-register.selector';

/**
 * This guard is used to check if the user has registered for an event.
 */
@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);

  /**
   * This method is used to check if the user has registered for an event.
   * @returns {Observable<boolean>} - The response.
   */
  public canActivate(): Observable<boolean> {
    return this.store.select(eventRegisterSelector).pipe(
      take(1),
      map(data => {
        if (!data?.event.id) {
          // Only redirect when the event ID is missing
          void this.router.navigate(['/user/event/upcoming']);
          return false;
        }
        return true;
      }),
    );
  }
}
