import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventDetailSidenavComponent } from '../event-detail-sidenav/event-detail-sidenav.component';

/**
 * This component is used to display the event detail overview.
 */
@Component({
  selector: 'summeet-event-detail-overview',
  standalone: true,
  imports: [EventDetailSidenavComponent, RouterModule],
  templateUrl: './event-detail-overview.component.html',
  styleUrl: './event-detail-overview.component.scss',
})
export class EventDetailOverviewComponent {}
