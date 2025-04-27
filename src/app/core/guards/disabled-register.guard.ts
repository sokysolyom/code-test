import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '@env';

/**
 * This guard is used to check if the registration is disabled.
 */
@Injectable({
  providedIn: 'root',
})
export class DisabledRegisterGuard implements CanActivate {
  private readonly router = inject(Router);
  /**
   * This method is used to check if the user can activate the route.
   * @returns {boolean} - The boolean.
   */
  public canActivate(): boolean {
    const isRegistratDisabled = environment.isRegistratDisabled;
    if (isRegistratDisabled) {
      void this.router.navigate(['/general/uvod']);
      return false;
    } else {
      return true;
    }
  }
}
