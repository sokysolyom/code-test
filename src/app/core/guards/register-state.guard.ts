// register-state.guard.ts
import { inject, Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  NavigationEnd,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { resetEventRegister } from '@app/state/event-register/event-register.actions';
import { IAppState } from '@app/state/app.state';

export interface ICanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * This guard is used to reset the event register state when navigating away from the registration process.
 */
@Injectable({
  providedIn: 'root',
})
export class RegisterStateGuard
  implements CanDeactivate<ICanComponentDeactivate>
{
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);

  /**
   * Constructor
   */
  public constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const destination = event.url;

        // Only reset state if navigating away from the registration process
        // Update this to check for the appropriate condition
        if (
          !destination.includes('user/event/event-register') &&
          !destination.includes('user/event/my-events')
        ) {
          this.store.dispatch(resetEventRegister());
        }
      });
  }

  /**
   * This method is used to check if the user can deactivate the component.
   * @param {ICanComponentDeactivate} component - The component.
   * @param {ActivatedRouteSnapshot} currentRoute - The current route.
   * @param {RouterStateSnapshot} currentState - The current state.
   * @param {RouterStateSnapshot} nextState - The next state.
   * @returns {Observable<boolean> | Promise<boolean> | boolean} - The response.
   */
  public canDeactivate(
    component: ICanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (nextState) {
      // Perform the deactivation check
      return component.canDeactivate ? component.canDeactivate() : true;
    }

    return true;
  }
}
