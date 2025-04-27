import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, take, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@app/core/services/notification.service';
import { IAppState } from '@app/state/app.state';
import {
  eventEditIdSelector,
  eventEditSubmissionSettingsSelector,
} from '@app/state/event-edit/event-edit.selector';
import { EventUpdateService } from '../../services/event-update.service';
import { ParticipationStatusService } from '../../services/participation-status.service';

/**
 * This component is used to update the participation type of an event
 */
@Component({
  selector: 'summeet-event-update-participation-type',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './event-update-participation-type.component.html',
  styleUrl: './event-update-participation-type.component.scss',
})
export class EventUpdateParticipationTypeComponent implements OnInit {
  public isActive: boolean | null = null;
  public participationState: boolean | null = null;
  public isActiveParticipation: boolean = false;

  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly notificationService = inject(NotificationService);
  private readonly store = inject(Store<IAppState>);
  private readonly participationStatusService = inject(
    ParticipationStatusService,
  );

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store
      .select(eventEditIdSelector)
      .pipe(
        take(1),
        concatMap(eventId => {
          return this.eventUpdateService.getParticipation(eventId);
        }),
        tap(data => {
          this.isActive = data.isParticipationActive;
          this.participationState = data.isParticipationActive;
        }),
        concatMap(() =>
          this.store.select(eventEditSubmissionSettingsSelector).pipe(take(2)),
        ),
        map(submissionSettings => {
          this.isActiveParticipation = Boolean(
            submissionSettings?.isActiveParticipationEnabled || this.isActive,
          );
        }),
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;

          const errorMessage =
            errorResponse.error &&
            typeof errorResponse.error === 'object' &&
            'message' in errorResponse.error
              ? (errorResponse.error as { message: string }).message
              : 'An unknown error occurred';

          this.notificationService.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }

  /**
   * This method is called when the active state is toggled
   * @param {boolean} state - The state of the active state
   * @returns {void}
   */
  public togleActive(state: boolean): void {
    this.isActive = state;
  }
  /**
   * This method is called when the form is submitted
   * @returns {void}
   */
  public onSubmit(): void {
    this.store
      .select(eventEditIdSelector)
      .pipe(
        take(1),
        concatMap(eventId => {
          return this.eventUpdateService.putParticipation(
            {
              isParticipationActive: this.isActive ?? false,
            },
            eventId,
          );
        }),
        tap(() => {
          this.notificationService.success('Typ účasti bolo úspešne zmenené');
          this.participationState = this.isActive;
          this.participationStatusService.triggerRefresh();
        }),
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;
          const errorMessage =
            errorResponse.error &&
            typeof errorResponse.error === 'object' &&
            'message' in errorResponse.error
              ? (errorResponse.error as { message: string }).message
              : 'An unknown error occurred';
          this.notificationService.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }
}
