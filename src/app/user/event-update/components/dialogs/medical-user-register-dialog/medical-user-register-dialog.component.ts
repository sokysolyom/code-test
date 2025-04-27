import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { catchError, map, switchMap, take, tap, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { EventRegisterPersonalFormComponent } from '@app/user/event-register/components/event-register-personal-form/event-register-personal-form.component';
import { EventRegisterWorkplaceFormComponent } from '@app/user/event-register/components/event-register-workplace-form/event-register-workplace-form.component';
import { IAppState } from '@app/state/app.state';
import { eventRegisterSelector } from '@app/state/event-register/event-register.selector';
import { IEventRegisterState } from '@app/state/event-register/event-register.reducer';
import { resetEventRegister } from '@app/state/event-register/event-register.actions';
import { EventUpdateService } from '@app/user/event-update/services/event-update.service';
import { IHealthcareProfessionalDialogData } from '@app/user/event-update/interfaces/medical-user-register-dialog.interface';
import { NotificationService } from '@app/core/services/notification.service';

/**
 * Medical user register dialog component
 */
@Component({
  selector: 'summeet-medical-user-register-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    EventRegisterPersonalFormComponent,
    EventRegisterWorkplaceFormComponent,
  ],
  templateUrl: './medical-user-register-dialog.component.html',
  styleUrl: './medical-user-register-dialog.component.scss',
})
export class MedicalUserRegisterDialogComponent implements OnInit {
  @ViewChild('stepper')
  private myStepper!: MatStepper;
  public data!: IEventRegisterState;
  public isLinear: boolean = false;

  private readonly dialogRef = inject(
    MatDialogRef<MedicalUserRegisterDialogComponent>,
  );
  public readonly emailData = inject<string>(MAT_DIALOG_DATA);
  private readonly store = inject(Store<IAppState>);
  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
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
   * This method is called when the submit button is clicked
   * @returns {void}
   */
  public onSubmit(): void {
    this.store
      .select(eventRegisterSelector)
      .pipe(
        take(1),
        map(data => {
          // Map the data to IHealthcareProfessionalDialogData
          const healthcareProfessionalData: IHealthcareProfessionalDialogData =
            {
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
              medicTypeId: data.workplace.medicType.id,
              medicalExpertiseId: data.workplace.medicalExpertise.id,
              chamberId: data.workplace.chamberId,
              canPrescribeMedications: data.workplace.canPrescribeMedications,
              workplaceFullName: data.workplace.workplaceFullName,
              workplaceStreet: data.workplace.workplaceStreet,
              workplaceStreetNumber: data.workplace.workplaceStreetNumber,
              workplaceZipCode: data.workplace.workplaceZipCode,
            };

          return healthcareProfessionalData;
        }),
        switchMap(healthcareProfessionalData =>
          this.eventUpdateService
            .registerHealthcareProfessionalByPartner(healthcareProfessionalData)
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
