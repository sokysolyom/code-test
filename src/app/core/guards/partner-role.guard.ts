import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { IAppState } from '@app/state/app.state';
import { roleSelector } from '@app/state/auth/auth.selector';
import { Role } from '@app/shared/enums/role.enum';

/**
 * Auth Guard
 */
@Injectable({
  providedIn: 'root',
})
export class PartnerRoleGuard implements CanActivate {
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);

  /**
   * Can Activate
   * @description Check if user is authenticated
   * @returns {Observable<boolean>} - Observable
   */
  public canActivate(): Observable<boolean> {
    return this.store.select(roleSelector).pipe(
      take(1),
      map(role => {
        return role === Role.PARTNER;
      }),
    );
  }
}
