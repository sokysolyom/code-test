import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

/**
 * This component is used to display the event detail sidenav.
 */
@Component({
  selector: 'summeet-event-detail-sidenav',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './event-detail-sidenav.component.html',
  styleUrl: './event-detail-sidenav.component.scss',
})
export class EventDetailSidenavComponent {}
