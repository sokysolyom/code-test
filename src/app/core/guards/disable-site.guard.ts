import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * This guard is used to check if the registration is disabled.
 */
@Injectable({
  providedIn: 'root',
})
export class DisabledSiteGuard implements CanActivate {
  private readonly router = inject(Router);
  /**
   * This method is used to check if the user can activate the route.
   * @returns {boolean} - The boolean.
   */
  public canActivate(): boolean {
    const isAllowed = localStorage.getItem('isAllowed');
    if (isAllowed === null) {
      void this.router.navigate(['/general/maintenance']);
      return false;
    } else {
      return true;
    }
  }
}
