import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { concatMap, of, tap } from 'rxjs';
import { BreadcrumbService } from '@app/core/services/breadcrumb.service';
import { Disposable } from '@app/core/utils/disposable';
import { IAppState } from '@app/state/app.state';
import { removeAuthCredentials } from '@app/state/auth/auth.action';
import { refreshTokenSelector } from '@app/state/auth/auth.selector';
import { AuthService } from '@auth/services/auth.service';

/**
 * Navbar Component
 */
@Component({
  selector: 'summeet-layout-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.scss'],
})
export class LayoutNavbarComponent extends Disposable implements OnInit {
  public breadcrumbs: Array<{ label: string; url: string }> = [];
  private readonly router = inject(Router);
  private readonly store = inject(Store<IAppState>);
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  /**
   * Public constructor
   */
  public constructor() {
    super();
  }

  /**
   * On init
   * @description Initialize breadcrumbs and check if user is logged in
   * @returns {void}
   */
  public ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$
      .pipe(
        tap(breadcrumbs => {
          this.breadcrumbs = breadcrumbs;
        }),
      )
      .subscribe();
  }

  /**
   * Logout
   * @description Logout user
   * @returns {void}
   */
  public logout(): void {
    this.store
      .select(refreshTokenSelector)
      .pipe(
        concatMap(refreshToken => {
          if (typeof refreshToken === 'string') {
            return this.authService.logout(refreshToken);
          }
          return of(null);
        }),
        concatMap(() => {
          this.store.dispatch(removeAuthCredentials());
          return of(null);
        }),
        tap(() => void this.router.navigate(['/auth'])),
      )
      .subscribe();
  }
}
