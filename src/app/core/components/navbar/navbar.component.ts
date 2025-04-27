import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { concatMap, filter, Observable, of, take, tap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@env';
import {
  accessTokenSelector,
  refreshTokenSelector,
  roleSelector,
} from '@app/state/auth/auth.selector';
import { activeDropDownSelector } from '@app/state/event/event.selector';
import { IAppState } from '@app/state/app.state';
import {
  updateActiveDropDown,
  updateSidenavVisibility,
} from '@app/state/event/event.action';
import { removeAuthCredentials } from '@app/state/auth/auth.action';

/**
 * This component is used to display the navbar.
 */
@Component({
  selector: 'summeet-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatDividerModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public type!: string;
  @ViewChild('activityDropDown') public activityDropDown!: MatMenuTrigger;
  public isRegistratDisabled = environment.isRegistratDisabled;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store<IAppState>);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store
      .select(accessTokenSelector)
      .pipe(
        tap(isLoggedIn => {
          this.isLoggedIn$ = isLoggedIn ? of(true) : of(false);
        }),
      )
      .subscribe();
    this.store
      .select(activeDropDownSelector)
      .pipe(
        tap(res => {
          if (res) {
            this.activityDropDown.openMenu();
          }
        }),
      )
      .subscribe();
    this.store
      .select(roleSelector)
      .pipe(
        tap(res => {
          this.type = res as string;
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
  public closedActivity(): void {
    this.store.dispatch(updateActiveDropDown({ content: false }));
  }
}
