import { Component, inject, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, take, tap, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { equalityValidator } from '@app/core/utils/validators/equality.validator';
import { IAuthQueryParams } from '@auth/interfaces/auth.type';
import { IAuthFormControl } from '@auth/interfaces/auth-form.type';
import { NotificationService } from '@app/core/services/notification.service';
import { IFinishRegistrationData } from '@app/register/interfaces/register.type';
import { RegisterService } from '@app/register/services/register.service';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';

/**
 * This component is used to display the participant registration confirm page.
 */
@Component({
  selector: 'summeet-participant-registration-confirm',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './participant-registration-confirm.component.html',
  styleUrls: ['./participant-registration-confirm.component.scss'],
})
export class ParticipantRegistrationConfirmComponent implements OnInit {
  public resetPasswordForm!: FormGroup<IAuthFormControl>;
  private queryParams!: IAuthQueryParams;
  public hideConfirmPassword: boolean = true;
  public hidePassword: boolean = true;

  private readonly registerService = inject(RegisterService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams as IAuthQueryParams;
    this.resetPasswordForm = new FormGroup<IAuthFormControl>(
      {
        email: new FormControl<string | null>({
          disabled: true,
          value: this.queryParams.email,
        }),
        newPassword: new FormControl<string | null>(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$',
            ),
          ]),
        ),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        updateOn: 'change',
        validators: equalityValidator('password', 'confirmPassword'),
      },
    );
  }

  /**
   * This method is called when the form is submitted.
   * @returns {void}
   */
  public onSubmit(): void {
    const finishRegistrationData: IFinishRegistrationData = {
      email: this.queryParams.email,
      registrationToken: this.queryParams.token,
      newPassword: this.resetPasswordForm.value.newPassword!,
    };
    this.registerService
      .finishRegistration(finishRegistrationData)
      .pipe(
        take(1),
        tap(() => {
          this.notificationService.success('Zmenenie hesla bolo úspešné');
          void this.router.navigate(['/auth/prihlasenie']);
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
