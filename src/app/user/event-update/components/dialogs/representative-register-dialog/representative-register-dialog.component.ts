import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { take, map, tap, catchError, throwError, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { EventRegisterPersonalFormComponent } from '@app/user/event-register/components/event-register-personal-form/event-register-personal-form.component';
import { EventRegisterRepresentativeTermsComponent } from '@app/user/event-register/components/event-register-representative-terms/event-register-representative-terms.component';
import { eventRegisterSelector } from '@app/state/event-register/event-register.selector';
import { IEventRegisterState } from '@app/state/event-register/event-register.reducer';
import { resetEventRegister } from '@app/state/event-register/event-register.actions';
import { IAppState } from '@app/state/app.state';
import { IRepresentativeRegisterDialogData } from '@app/user/event-update/interfaces/representative-register-dialog.interface';
import { EventUpdateService } from '@app/user/event-update/services/event-update.service';
import { NotificationService } from '@app/core/services/notification.service';

/**
 * This component is used to display the representative register dialog
 */
@Component({
  selector: 'summeet-representative-register-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    EventRegisterRepresentativeTermsComponent,
    EventRegisterPersonalFormComponent,
  ],
  templateUrl: './representative-register-dialog.component.html',
  styleUrl: './representative-register-dialog.component.scss',
})
export class RepresentativeRegisterDialogComponent implements OnInit {
  @ViewChild('stepper')
  private myStepper!: MatStepper;
  public data!: IEventRegisterState;
  public isLinear: boolean = false;

  private readonly dialogRef = inject(
    MatDialogRef<RepresentativeRegisterDialogComponent>,
  );
  public readonly dialogData = inject<{
    email: string;
    legalPersonId: string;
  }>(MAT_DIALOG_DATA);
  private readonly store = inject(Store<IAppState>);
  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly notificationService = inject(NotificationService);

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
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
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
   * @returns {void}
   */
  public onNext(): void {
    this.myStepper.next();
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
   * @returns {void}
   */
  public onSubmit(): void {
    this.store
      .select(eventRegisterSelector)
      .pipe(
        take(1),
        map(data => {
          // Map the data to IRepresentativeRegisterDialogData
          const representativeData: IRepresentativeRegisterDialogData = {
            email: data.participant.email,
            firstName: data.participant.firstName,
            lastName: data.participant.lastName,
            birthDate: data.participant.birthDate,
            titlesBeforeName: data.participant.titlesBeforeName,
            titlesAfterName: data.participant.titlesAfterName,
            sex: data.participant.sex,
            phoneNumber: data.participant.phoneNumber,
            street: data.participant.street,
            streetNumber: data.participant.streetNumber,
            zipCode: data.participant.zipCode,
            isInformedAboutEvents: data.workplace.isInformedAboutEvents,
            isSubscribedToNewsletter: data.workplace.isSubscribedToNewsletter,
            hasAffidavit: data.workplace.hasAffidavit,
            hasConsentedToDataProcessing:
              data.workplace.hasConsentedToDataProcessing,
            hasAcceptedTerms: data.workplace.hasAcceptedTerms,
            legalPersonId: this.dialogData.legalPersonId,
          };
          return representativeData;
        }),
        switchMap(representativeData =>
          this.eventUpdateService
            .registerRepresentativeByPartner(representativeData)
            .pipe(
              tap(userId => {
                this.notificationService.success(
                  'Úspešne ste zaregistrovali konto zdravotníckeho pracovníka.',
                );
                this.store.dispatch(resetEventRegister());
                this.dialogRef.close(userId);
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
            ),
        ),
      )
      .subscribe();
  }
}
