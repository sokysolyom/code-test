import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { catchError, concatMap, map, take, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { NotificationService } from '@app/core/services/notification.service';
import { RegisterService } from '@app/register/services/register.service';
import { IVerifyEmailFormControl } from '@app/user/event-update/interfaces/event-update.interface';
import { IValidateUserData } from '@app/user/event-update/interfaces/verify-email-dialog.interface';
import { EventUpdateService } from '@app/user/event-update/services/event-update.service';
import { eventEditIdSelector } from '@app/state/event-edit/event-edit.selector';
import { IAppState } from '@app/state/app.state';
import { UtilitiesService } from '@app/core/services/utilities.service';

/**
 * Verify email dialog component
 */
@Component({
  selector: 'summeet-verify-email-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './verify-email-dialog.component.html',
  styleUrl: './verify-email-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class VerifyEmailDialogComponent implements OnInit {
  public email: FormControl<string | null> = new FormControl<string | null>(
    null,
    Validators.compose([Validators.required, Validators.email]),
  );
  public checkForm!: FormGroup<IVerifyEmailFormControl>;
  public isChecking: boolean = false;
  public startDate = new Date(
    new Date().getFullYear() - 18,
    new Date().getMonth(),
    new Date().getDate(),
  );
  public readonly isHealthcareProfessional = inject<boolean>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<VerifyEmailDialogComponent>);
  private readonly notificationService = inject(NotificationService);
  private readonly registerService = inject(RegisterService);
  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly store = inject(Store<IAppState>);
  private readonly utilitiesService = inject(UtilitiesService);

  /**
   * This method is called when the component is initialized.
   */
  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.checkForm = new FormGroup<IVerifyEmailFormControl>({
      firstName: new FormControl<string | null>(null, Validators.required),
      lastName: new FormControl<string | null>(null, Validators.required),
      dateOfBirth: new FormControl<string | null>(null, Validators.required),
    });
  }

  /**
   * This method is used to close the dialog
   * @returns {void}
   */
  public closeDialog(): void {
    this.dialogRef.close(null);
  }

  /**
   * This method is used to check the email.
   * @returns {void}
   */
  public checkEmail(): void {
    this.registerService
      .checkEmail(this.email.value!)
      .pipe(
        tap(() => {
          this.dialogRef.close({
            email: this.email.value,
            isRegistered: false,
          });
          this.notificationService.info(
            'Zadaný email zatiaľ nie je zaregistrovaný',
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

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (errorResponse.error && errorResponse.error.statusCode === 409) {
            this.notificationService.info(
              'Účastník už má vytvorené konto na webových stránkach spoločnosti SUMMEET. Po zadaní overovacích údajov ho môžete zaregistrovať na podujatie.',
            );
            this.isChecking = true;
          } else {
            this.notificationService.error(errorMessage);
          }

          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }

  /**
   * This method is called when the form is submitted
   * @returns {void}
   */
  public onSubmit(): void {
    const data: IValidateUserData = {
      email: this.email.value ?? '',
      firstName: this.checkForm.get('firstName')?.value ?? '',
      lastName: this.checkForm.get('lastName')?.value ?? '',
      birthDate: this.utilitiesService.toUtcSameDay(
        this.checkForm.get('dateOfBirth')?.value ?? '',
      ),
    };

    this.eventUpdateService
      .validateUser(data)
      .pipe(
        concatMap(userId =>
          this.store.select(eventEditIdSelector).pipe(
            take(1),
            map(eventId => ({ userId, eventId })),
          ),
        ),
        concatMap(({ userId, eventId }) =>
          this.eventUpdateService
            .isUserRegistered(eventId, userId)
            .pipe(map(isRegistered => ({ userId, isRegistered }))),
        ),
        tap(({ userId, isRegistered }) => {
          // eslint-disable-next-line sonarjs/no-selector-parameter
          if (isRegistered) {
            this.notificationService.info(
              'Zadaný účastník je na toto podujatie už zaregistrovaný.',
            );
            this.dialogRef.close(null);
          } else {
            this.dialogRef.close({
              email: this.email.value,
              isRegistered: true,
              authId: userId,
            });
            this.notificationService.info(
              'Zadaný email zatiaľ nie je zaregistrovaný na podujatie',
            );
          }
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
