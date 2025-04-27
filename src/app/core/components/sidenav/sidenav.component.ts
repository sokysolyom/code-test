import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, filter, concatMap, of } from 'rxjs';
import { IAppState } from '@app/state/app.state';
import { removeAuthCredentials } from '@app/state/auth/auth.action';
import {
  accessTokenSelector,
  refreshTokenSelector,
  roleSelector,
} from '@app/state/auth/auth.selector';
import {
  updateIsDataChanged,
  updateSidenavVisibility,
} from '@app/state/event/event.action';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@env';

/**
 * This component is used to display the sidenav.
 */
@Component({
  selector: 'summeet-sidenav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public type!: string;
  @ViewChild('participationMep') public activityDropDown!: MatExpansionPanel;
  public isRegistratDisabled = environment.isRegistratDisabled;

  private readonly router = inject(Router);
  private readonly store = inject(Store<IAppState>);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store.select(accessTokenSelector).subscribe(isLoggedIn => {
      this.isLoggedIn$ = of(!!isLoggedIn); // Simplified to set isAuthed directly
    });

    this.store.select(roleSelector).subscribe(role => {
      this.type = role ?? '';
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.store.dispatch(updateSidenavVisibility({ content: false }));
      });
  }

  /**
   * This method is called when the user clicks on the activity dropdown.
   * @returns {void}
   */
  public collapseOnClick(): void {
    this.store.dispatch(updateSidenavVisibility({ content: false }));
  }

  /**
   * This method is called when the user clicks on the activity dropdown.
   * @returns {void}
   */
  public logout(): void {
    this.store.dispatch(updateSidenavVisibility({ content: false }));
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
    this.store.dispatch(updateIsDataChanged({ content: false }));
    this.store.dispatch(removeAuthCredentials());
    void this.router.navigate(['/general']);
    this.collapseOnClick();
  }
}
