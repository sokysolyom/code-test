import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * This component represents the event update unsubscribe.
 */
@Component({
  selector: 'summeet-event-update-unsubscribe',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './event-update-unsubscribe.component.html',
  styleUrl: './event-update-unsubscribe.component.scss',
})
export class EventUpdateUnsubscribeComponent {
  /**
   * Open phone
   * @description Open phone
   * @returns {void}
   */
  public openPhone(): void {
    globalThis.location.href = 'tel:+421950666565';
  }
}
