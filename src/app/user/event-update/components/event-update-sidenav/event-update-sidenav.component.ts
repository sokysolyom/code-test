import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  filter,
  map,
  Observable,
  of,
  take,
  tap,
  throwError,
  Subscription,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '@app/user/event/services/event.service';
import { EventRegisterService } from '@app/user/event-register/services/event-register.service';
import { IEventRegisterSettings } from '@app/user/event-register/interfaces/event-register.interface';
import { Role } from '@app/shared/enums/role.enum';
import { IAppState } from '@app/state/app.state';
import { roleSelector } from '@app/state/auth/auth.selector';
import { eventEditIdSelector } from '@app/state/event-edit/event-edit.selector';
import { NotificationService } from '@app/core/services/notification.service';
import {
  postAccommodationSettings,
  postEventIdData,
  postRegistrationSettings,
  postSubmissionSettings,
} from '@app/state/event-edit/event-edit.actions';
import { EventUpdateService } from '../../services/event-update.service';
import { ParticipationStatusService } from '../../services/participation-status.service';

/**
 * This component is responsible for displaying event update sidenav
 */
@Component({
  selector: 'summeet-event-update-sidenav',
  standalone: true,
  imports: [
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './event-update-sidenav.component.html',
  styleUrl: './event-update-sidenav.component.scss',
})
export class EventUpdateSidenavComponent implements OnInit, OnDestroy {
  public isPartner: boolean = false;
  public isHealthcareProfessional: boolean = false;
  public isSubject: boolean = false;
  public isRegisteredToEvent: boolean = false;
  public isAdmin: boolean = false;
  public eventId: string = '';
  public eventSettings: IEventRegisterSettings | null = null;
  public isActiveParticipation: boolean = false;
  private subscription: Subscription = new Subscription();

  private readonly store = inject(Store<IAppState>);
  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly notificationService = inject(NotificationService);
  private readonly eventService = inject(EventService);
  private readonly eventRegisterService = inject(EventRegisterService);
  private readonly route = inject(ActivatedRoute);
  private readonly participationStatusService = inject(
    ParticipationStatusService,
  );

  /**
   * This method is called when the component is initialized.
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

    this.store
      .select(roleSelector)
      .pipe(
        take(1),
        map(role => {
          this.isHealthcareProfessional = role === Role.HEALTHCARE_PROFESSIONAL;
          this.isPartner = role === Role.PARTNER;
          this.isSubject = role === Role.SUBJECT;
        }),
        concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
        concatMap(eventId => {
          this.eventId = eventId;
          return this.eventUpdateService.iAmRegistered(eventId);
        }),
        tap(isRegistered => {
          if (isRegistered) {
            this.isRegisteredToEvent = true;
          }
        }),
        concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
        concatMap(eventId => {
          if (this.isHealthcareProfessional) {
            return this.eventUpdateService.getParticipation(eventId).pipe(
              tap(data => {
                this.isActiveParticipation = data.isParticipationActive;
              }),
            );
          }
          return of(null); // Continue the stream even if not a healthcare professional
        }),
        concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
        concatMap((eventId: string) => this.dispatchStoreItems(eventId)),
        filter(() => this.isPartner || this.isSubject),
        concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
        concatMap((eventId: string) =>
          this.eventService.settingsPartners(eventId).pipe(
            map(partners => ({ eventId, partners })),
            concatMap(({ eventId, partners }) => {
              return this.isPartner
                ? this.eventRegisterService.isUserAdministrator(
                    eventId,
                    partners[0].id,
                  )
                : of(false);
            }),
            tap(isAdmin => {
              if (isAdmin) {
                this.isAdmin = true;
              }
            }),
          ),
        ),
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

    // Initial fetch

    // Listen for refresh triggers
    this.subscription.add(
      this.participationStatusService.refreshParticipationStatus$
        .pipe(
          concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
          concatMap(eventId =>
            this.eventUpdateService.getParticipation(eventId),
          ),
        )
        .subscribe(participation => {
          this.isActiveParticipation = participation.isParticipationActive;
        }),
    );
  }

  /**
   * This method is used to dispatch the store items.
   * @param {string} eventId - The event id.
   * @returns {Observable<void>} - The observable.
   */
  private dispatchStoreItems(eventId: string): Observable<void> {
    return this.eventRegisterService.eventSettings(eventId).pipe(
      take(1),
      tap(data => {
        this.eventSettings = data;
        this.store.dispatch(
          postRegistrationSettings({
            registrationSettings: {
              isPaid: data.registrationSettings.isPaid,
            },
          }),
        );

        this.store.dispatch(
          postSubmissionSettings({
            submissionSettings: {
              isActiveParticipationEnabled:
                data.submissionsSettings.isActiveParticipationEnabled,
              isAbstractUploadEnabled:
                data.submissionsSettings.isAbstractUploadEnabled,
              isPresentationUploadEnabled:
                data.submissionsSettings.isPresentationUploadEnabled,
              isPosterUploadEnabled:
                data.submissionsSettings.isPosterUploadEnabled,
              isOtherFilesUploadEnabled:
                data.submissionsSettings.isOtherFilesUploadEnabled,
            },
          }),
        );

        this.store.dispatch(
          postAccommodationSettings({
            accommodationSettings: {
              hasAccommodation: data.accommodationSettings.hasAccommodation,
            },
          }),
        );
      }),
      map(() => void 0), // Convert to Observable<void>
    );
  }

  /**
   * This method is called when the component is destroyed
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
