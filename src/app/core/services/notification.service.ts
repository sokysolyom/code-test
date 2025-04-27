import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from '@app/shared/components/notifications/error-notification/error-notification.component';
import { InfoNotificationComponent } from '@app/shared/components/notifications/info-notification/info-notification.component';
import { SuccessNotificationComponent } from '@app/shared/components/notifications/success-notification/success-notification.component';
import { WarningNotificationComponent } from '@app/shared/components/notifications/warning-notification/warning-notification.component';

/**
 * Notification Service
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Success
   * @description Show success notification
   * @param {string} message - Message
   * @returns {void}
   */
  public success(message: string): void {
    const snackBar = this.snackBar.openFromComponent(
      SuccessNotificationComponent,
      {
        data: {
          message,
          preClose: () => {
            snackBar.dismiss();
          },
        },
        panelClass: ['notification-snackbar'],
        duration: 5000,
      },
    );
  }

  /**
   * Error
   * @description Show error notification
   * @param {string} message - Message
   * @returns {void}
   */
  public error(message: string): void {
    const snackBar = this.snackBar.openFromComponent(
      ErrorNotificationComponent,
      {
        data: {
          message,
          preClose: () => {
            snackBar.dismiss();
          },
        },
        panelClass: ['notification-snackbar'],
        duration: 10_000,
      },
    );
  }

  /**
   * Info
   * @description Show info notification
   * @param {string} message - Message
   * @returns {void}
   */
  public info(message: string): void {
    const snackBar = this.snackBar.openFromComponent(
      InfoNotificationComponent,
      {
        data: {
          message,
          preClose: () => {
            snackBar.dismiss();
          },
        },
        panelClass: ['notification-snackbar'],
        duration: 15_000,
      },
    );
  }

  /**
   * Warning
   * @description Show warning notification
   * @param {string} message - Message
   * @returns {void}
   */
  public warning(message: string): void {
    const snackBar = this.snackBar.openFromComponent(
      WarningNotificationComponent,
      {
        data: {
          message,
          preClose: () => {
            snackBar.dismiss();
          },
        },
        panelClass: ['notification-snackbar'],
        duration: 10_000,
      },
    );
  }
}
