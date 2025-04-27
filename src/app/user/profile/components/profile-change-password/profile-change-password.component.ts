import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { equalityValidator } from '@app/core/utils/validators/equality.validator';
import { NotificationService } from '@app/core/services/notification.service';
import {
  IChangePassword,
  IChangePasswordData,
} from '../../interfaces/profile-personal-statements.interface';
import { ProfileService } from '../../services/profile.service';

/**
 * This component is used to change the password.
 */
@Component({
  selector: 'summeet-profile-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './profile-change-password.component.html',
  styleUrl: './profile-change-password.component.scss',
})
export class ProfileChangePasswordComponent implements OnInit {
  public passwordForm!: FormGroup<IChangePassword>;
  public hideConfirmPassword: boolean = true;
  public hidePassword: boolean = true;
  public hideOldPassword: boolean = true;

  private readonly profileService = inject(ProfileService);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is used to initialize the component.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.passwordForm = new FormGroup<IChangePassword>(
      {
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$',
            ),
          ]),
        ),
        newPasswordConfirm: new FormControl('', Validators.required),
      },
      {
        updateOn: 'change',
        validators: equalityValidator('newPassword', 'newPasswordConfirm'),
      },
    );
  }

  /**
   * This method is used to submit the form.
   * @returns {void}
   */
  public onSubmit(): void {
    const data: IChangePasswordData = {
      currentPassword: this.passwordForm.value.oldPassword ?? '',
      newPassword: this.passwordForm.value.newPassword ?? '',
    };

    this.profileService
      .changePassword(data)
      .pipe(
        tap(() => {
          // Reset the form and clear validation state
          this.passwordForm.reset();
          this.resetFormState();
          this.clearFormErrors();

          this.notificationService.success('Heslo bolo úspešne zmenené.');
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
   * This method is used to reset the form state.
   * @returns {void}
   */
  private resetFormState(): void {
    for (const controlName of Object.keys(this.passwordForm.controls)) {
      const control = this.passwordForm.get(controlName);
      if (control) {
        control.markAsPristine();
        control.markAsUntouched();
      }
    }
  }

  /**
   * This method is used to clear the form errors.
   * @returns {void}
   */
  private clearFormErrors(): void {
    for (const controlName of Object.keys(this.passwordForm.controls)) {
      const control = this.passwordForm.get(controlName);
      if (control) {
        control.setErrors(null); // Clear all errors
      }
    }
  }
}
