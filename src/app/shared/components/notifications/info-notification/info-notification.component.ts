import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { INotificationData } from '../notifications.interface';

/**
 * Component for displaying a success notification.
 */
@Component({
  selector: 'summeet-info-notification',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './info-notification.component.html',
  styleUrls: ['./info-notification.component.scss'],
})
export class InfoNotificationComponent {
  public data: INotificationData = inject(MAT_SNACK_BAR_DATA);

  /**
   * Dismisses the notification.
   * @returns {void}
   */
  public dismiss(): void {
    this.data.preClose();
  }
}
