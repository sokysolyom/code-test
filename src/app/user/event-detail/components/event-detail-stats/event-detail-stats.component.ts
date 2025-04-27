import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EventItemComponent } from '@app/user/event/components/event-item/event-item.component';

/**
 * This component is used to display the event detail stats.
 */
@Component({
  selector: 'summeet-event-detail-stats',
  standalone: true,
  imports: [EventItemComponent, MatCardModule],
  templateUrl: './event-detail-stats.component.html',
  styleUrl: './event-detail-stats.component.scss',
})
export class EventDetailStatsComponent {}
