import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/state/app.state';
import { eventEditIdSelector } from '@app/state/event-edit/event-edit.selector';
import { postEventIdData } from '@app/state/event-edit/event-edit.actions';

/**
 * This component is responsible for displaying event update representative sidenav
 */
@Component({
  selector: 'summeet-event-update-representative-sidenav',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './event-update-representative-sidenav.component.html',
  styleUrl: './event-update-representative-sidenav.component.scss',
})
export class EventUpdateRepresentativeSidenavComponent implements OnInit {
  public eventId: string = '';
  private readonly store = inject(Store<IAppState>);
  private readonly route = inject(ActivatedRoute);

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(
        postEventIdData({
          id: params.get('id') ?? '',
        }),
      );
    });
    this.store.select(eventEditIdSelector).subscribe(eventId => {
      this.eventId = eventId;
    });
  }
}
