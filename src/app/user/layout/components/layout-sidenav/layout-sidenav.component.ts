import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { concatMap, filter, map, Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/state/app.state';
import {
  refreshTokenSelector,
  roleSelector,
} from '@app/state/auth/auth.selector';
import { updateSidenavVisibility } from '@app/state/event/event.action';
import { AuthService } from '@auth/services/auth.service';
import { removeAuthCredentials } from '@app/state/auth/auth.action';
import { Role } from '@app/shared/enums/role.enum';

/**
 * This component is responsible for rendering the sidenav of the layout.
 */
@Component({
  selector: 'summeet-layout-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './layout-sidenav.component.html',
  styleUrl: './layout-sidenav.component.scss',
})
export class LayoutSidenavComponent implements OnInit {
  public isNavigationVisible$: Observable<boolean> = of(true);
  public isPartner: boolean = false;
  public isHealthcareProfessional: boolean = false;
  public isSubject: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store
      .select(roleSelector)
      .pipe(
        take(1),
        map(role => {
          this.isHealthcareProfessional = role === Role.HEALTHCARE_PROFESSIONAL;
          this.isPartner = role === Role.PARTNER;
          this.isSubject = role === Role.SUBJECT;
        }),
      )
      .subscribe();
  }

  /**
   * This method is called when the user clicks on the activity dropdown.
   * @returns {void}
   */
  public logout(): void {
    this.store.dispatch(updateSidenavVisibility({ content: false }));
    this.store.dispatch(removeAuthCredentials());
    this.store
      .select(refreshTokenSelector)
      .pipe(
        take(1),
        filter(refreshToken => !!refreshToken),
        concatMap(refreshToken => {
          return refreshToken
            ? this.authService.logout(refreshToken).pipe(take(1))
            : of(null);
        }),
      )
      .subscribe();
    void this.router.navigate(['/general']);
  }

  /**
   * This method is called when the user clicks on the activity dropdown.
   * @returns {void}
   */
  public isUpdateEventActive(): boolean {
    const currentUrl = this.router.url;
    return (
      currentUrl.includes('/user/event/update-event') ||
      currentUrl.includes('/user/event/my-events')
    );
  }
}
