import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { INotificationData } from '../notifications.interface';

/**
 * Component for displaying a warning notification.
 */
@Component({
  selector: 'summeet-warning-notification',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './warning-notification.component.html',
  styleUrls: ['./warning-notification.component.scss'],
})
export class WarningNotificationComponent {
  public data: INotificationData = inject(MAT_SNACK_BAR_DATA);

  /**
   * Dismisses the notification.
   * @returns {void}
   */
  public dismiss(): void {
    this.data.preClose();
  }
}
