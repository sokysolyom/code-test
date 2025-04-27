import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventUpdateSidenavComponent } from '../event-update-sidenav/event-update-sidenav.component';
import { EventUpdateRepresentativeSidenavComponent } from '../event-update-representative-sidenav/event-update-representative-sidenav.component';

/**
 * This component is responsible for displaying event update overview
 */
@Component({
  selector: 'summeet-event-update-overview',
  standalone: true,
  imports: [
    RouterModule,
    EventUpdateSidenavComponent,
    EventUpdateRepresentativeSidenavComponent,
  ],
  templateUrl: './event-update-overview.component.html',
  styleUrl: './event-update-overview.component.scss',
})
export class EventUpdateOverviewComponent {}
