import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { accessTokenSelector } from '@app/state/auth/auth.selector';
import { IAppState } from '@app/state/app.state';
import { NotificationService } from '@app/core/services/notification.service';
import { WINDOW_REF } from '@app/core/utils/window-ref';
import { GeneralService } from '@app/static/services/general.service';
import { CantPrescribeMedicationDialogComponent } from '../dialogs/cant-prescribe-medication-dialog/cant-prescribe-medication-dialog.component';
import { NotLoggedInDialogComponent } from '../dialogs/not-logged-in-dialog/not-logged-in-dialog.component';

/**
 * This component is used to display the partner item.
 */
@Component({
  selector: 'summeet-partner-item',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './partner-item.component.html',
  styleUrls: ['./partner-item.component.scss'],
})
export class PartnerItemComponent {
  @Input() public src!: string;
  @Input() public link!: string;
  @Input() public isVirtualTent!: boolean;
  @Input() public name!: string;
  @Input() public hasVirtualTent!: boolean;
  @Input() public virtualTentLink!: string;

  private readonly router = inject(Router);
  private readonly generalService = inject(GeneralService);
  private readonly window = inject(WINDOW_REF);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store<IAppState>);

  /**
   * This method is called when the partner item is clicked.
   * @returns {void}
   */
  public navigateToPage(): void {
    if (this.link) {
      this.window.open(this.link, '_blank');
    }
  }

  /**
   * This method is called when the virtual tent is clicked.
   * @returns {void}
   */
  private hasVAccesToStand(): void {
    if (this.hasVirtualTent) {
      this.window.open(this.virtualTentLink, '_blank');
    } else {
      void this.router.navigate([`/general/partner/${this.name}/stanok`]);
    }
  }

  /**
   * This method is called when the virtual tent is clicked.
   * @returns {void}
   */
  private openCantPrescribeMedicationDialog(): void {
    this.dialog.open(CantPrescribeMedicationDialogComponent, {
      width: '90%',
      maxWidth: '1200px',
    });
  }

  /**
   * This method is called when the virtual tent is clicked.
   * @returns {void}
   */
  public navigateToVirtualTent(): void {
    this.store.select(accessTokenSelector).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.generalService
          .getAccessToStand()
          .pipe(
            tap(isAccess => {
              // eslint-disable-next-line sonarjs/no-selector-parameter
              if (isAccess) {
                this.hasVAccesToStand();
              } else {
                this.openCantPrescribeMedicationDialog();
              }
            }),
            catchError(err => {
              const errorResponse = err as HttpErrorResponse;

              const errorMessage =
                errorResponse.error &&
                typeof errorResponse.error === 'object' &&
                'message' in errorResponse.error
                  ? (errorResponse.error as { message: string }).message
                  : 'An unknown error occurred';

              this.notificationService.error(errorMessage);
              return throwError(() => new Error(errorMessage));
            }),
          )
          .subscribe();
      } else {
        this.dialog.open(NotLoggedInDialogComponent, {
          width: '90%',
          maxWidth: '1200px',
        });
      }
    });
  }
}
