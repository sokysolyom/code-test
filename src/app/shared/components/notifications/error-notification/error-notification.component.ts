import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { INotificationData } from '../notifications.interface';

/**
 * Component for displaying an error notification.
 */
@Component({
  selector: 'summeet-error-notification',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss'],
})
export class ErrorNotificationComponent {
  public data: INotificationData = inject(MAT_SNACK_BAR_DATA);

  /**
   * Dismisses the notification.
   * @returns {void}
   */
  public dismiss(): void {
    this.data.preClose();
  }
}
