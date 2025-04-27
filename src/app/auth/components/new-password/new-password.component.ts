import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap, catchError, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { NotificationService } from '@app/core/services/notification.service';
import { AuthService } from '@auth/services/auth.service';

/**
 *
 */
@Component({
  selector: 'summeet-new-password',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent {
  public emailControl: FormControl<string | null> = new FormControl<
    string | null
  >('', Validators.compose([Validators.required, Validators.email]));
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is used to submit the new password form.
   * @returns {void}
   */
  public onSubmit(): void {
    this.authService
      .newPassword(this.emailControl.value!)
      .pipe(
        tap(() => {
          this.notificationService.success('Email bol zaslaný');
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
