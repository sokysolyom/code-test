import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import {
  IAuthQueryParams,
  IResetPasswordData,
} from '@auth/interfaces/auth.type';
import { IAuthFormControl } from '@auth/interfaces/auth-form.type';
import { NotificationService } from '@app/core/services/notification.service';
import { AuthService } from '@auth/services/auth.service';
import { equalityValidator } from '@app/core/utils/validators/equality.validator';

/**
 *
 */
@Component({
  selector: 'summeet-reset-password',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup<IAuthFormControl>;
  private queryParams!: IAuthQueryParams;
  public hideConfirmPassword: boolean = true;
  public hidePassword: boolean = true;

  private readonly authService = inject(AuthService);
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
        confirmPassword: new FormControl<string | null>(
          '',
          Validators.required,
        ),
      },
      {
        updateOn: 'change',
        validators: equalityValidator('newPassword', 'confirmPassword'),
      },
    );
  }

  /**
   * This method is called when the form is submitted.
   * @returns {void}
   */
  public onSubmit(): void {
    const resetPassword: IResetPasswordData = {
      email: this.queryParams.email,
      passwordResetToken: this.queryParams.token,
      newPassword: this.resetPasswordForm.value.newPassword!,
    };
    this.authService
      .resetPassword(resetPassword)
      .pipe(
        tap(() => {
          this.notificationService.success('Heslo bolo zmenené');
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
