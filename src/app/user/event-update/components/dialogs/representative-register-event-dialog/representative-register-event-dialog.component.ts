import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import {
  take,
  map,
  Observable,
  from,
  concatMap,
  tap,
  catchError,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EventRegisterAccommodationFormComponent } from '@app/user/event-register/components/event-register-accommodation-form/event-register-accommodation-form.component';
import { EventRegisterRecapStateComponent } from '@app/user/event-register/components/event-register-recap-state/event-register-recap-state.component';
import { IRegistrationsForm } from '@app/user/event-register/interfaces/event-register.interface';
import { EventRegisterService } from '@app/user/event-register/services/event-register.service';
import { IAppState } from '@app/state/app.state';
import {
  postEvetnRegisterPaymentRegistrationFee,
  resetEventRegister,
} from '@app/state/event-register/event-register.actions';
import { IEventRegisterState } from '@app/state/event-register/event-register.reducer';
import { eventRegisterSelector } from '@app/state/event-register/event-register.selector';
import { eventEditSelect } from '@app/state/event-edit/event-edit.selector';
import { NotificationService } from '@app/core/services/notification.service';

/**
 * This component is used to display representative registration for event
 */
@Component({
  selector: 'summeet-representative-register-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    EventRegisterAccommodationFormComponent,
    EventRegisterRecapStateComponent,
  ],
  templateUrl: './representative-register-event-dialog.component.html',
  styleUrl: './representative-register-event-dialog.component.scss',
})
export class RepresentativeRegisterEventDialogComponent implements OnInit {
  @ViewChild('stepper')
  private myStepper!: MatStepper;
  public data!: IEventRegisterState;
  public isLinear: boolean = false;
  public isAccommodationVisible: boolean = false;

  private readonly dialogRef = inject(
    MatDialogRef<RepresentativeRegisterEventDialogComponent>,
  );
  public readonly dialogData = inject<{
    userId: string;
    legalPersonId: string;
  }>(MAT_DIALOG_DATA);
  private readonly store = inject(Store<IAppState>);
  private readonly eventRegisterService = inject(EventRegisterService);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dialogRef.disableClose = true;

    this.store
      .select(eventEditSelect)
      .pipe(
        take(1),
        concatMap(event =>
          this.eventRegisterService
            .eventSettings(event.id)
            .pipe(map(settings => ({ settings, eventId: event.id }))),
        ),
        map(({ settings, eventId }) => {
          this.isAccommodationVisible =
            settings.accommodationSettings.hasAccommodation;
          return eventId;
        }),
        concatMap(eventId =>
          this.eventRegisterService.registrationFeesByPartner(
            eventId,
            this.dialogData.userId,
            null,
            this.dialogData.legalPersonId,
          ),
        ),
        map(fee => {
          this.store.dispatch(
            postEvetnRegisterPaymentRegistrationFee({
              registrationFee: fee.price ?? 0,
            }),
          );
        }),
      )
      .subscribe();
  }

  /**
   * This method is called when the component is initialized.
   * @param {object} event - The event object.
   * @param {object} event.target - The target object.
   * @param {number} event.target.innerWidth - The inner width.
   * @returns {void}
   */
  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    this.isLinear = event.target.innerWidth <= 599;
  }

  /**
   * This method is used to fetch the recap data.
   * @returns {void}
   */
  public fetchRecapData(): void {
    this.store
      .select(eventRegisterSelector)
      .pipe(
        take(1),
        map(data => (this.data = data)),
      )
      .subscribe();
  }

  /**
   * This method is called when the back button is clicked
   * @returns {void}
   */
  public onBack(): void {
    this.myStepper.previous();
  }

  /**
   * This method is called when the next button is clicked
   * @param {boolean} isLast - The isLast flag.
   * @returns {void}
   */
  public onNext(isLast?: boolean): void {
    this.myStepper.next();
    if (isLast) {
      this.fetchRecapData();
    }
  }

  /**
   * This method is used to go to the index.
   * @param {number} index - The index.
   * @returns {void}
   */
  public goToIndex(index: number): void {
    this.myStepper.selectedIndex = index;
  }

  /**
   * This method is used to close the dialog
   * @returns {void}
   */
  public closeDialog(): void {
    this.store.dispatch(resetEventRegister());
    this.dialogRef.close(null);
  }

  /**
   * This method is called when the form is submitted
   * @returns {IRegistrationsForm} - The registration form data
   */
  private getData(): IRegistrationsForm {
    return {
      accommodationsRegistrations:
        this.data.accommodation.accommodation?.nights.map(roomGroup => ({
          roomGroupId: roomGroup.id,
          preferredRoommate:
            this.data.accommodation.accommodation?.preferedRoommate ?? '', // Use an empty string if `preferredRoommate` is not defined
        })) ?? [],
      mealIds: this.data.accommodation.meal?.map(meal => meal.id) ?? [],
      payerRegistration: {
        userId: null, // Set to empty string if not required
        legalPersonId: this.dialogData.legalPersonId,
        vipCode: null,
      },
      isParticipationActive: this.data.participation.isParticipation,
    };
  }

  /**
   * This method is used to get the file data.
   * @returns {Observable<void>} - The observable
   */
  private getRegisterData(): Observable<void> {
    return this.store.select(eventRegisterSelector).pipe(
      take(1),
      map(data => {
        this.data = data;
      }),
    );
  }

  /**
   * This method is called when the form is submitted
   * @returns {void}
   */
  public onSubmit(): void {
    from(this.getRegisterData()) // Call getRegisterData first
      .pipe(
        concatMap(() => this.store.select(eventEditSelect).pipe(take(1))),
        concatMap(
          event =>
            this.eventRegisterService
              .registerByPartner(
                this.getData(),
                event.id,
                this.dialogData.userId,
              )
              .pipe(map(() => event.id)), // Pass the event ID for further chaining
        ),
        tap(() => {
          this.notificationService.success(
            'Registrácia na podujatie bola úspešná',
          );
          this.store.dispatch(resetEventRegister());
          this.dialogRef.close(true);
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
