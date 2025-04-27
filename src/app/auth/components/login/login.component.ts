import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap, take, catchError, throwError } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpErrorResponse } from '@angular/common/http';
import { ParticipantService } from '@app/user/participant/services/participant.service';
import { postAuthCredentials } from '@app/state/auth/auth.action';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IAppState } from '@app/state/app.state';
import { ILoginFormControl } from '@auth/interfaces/auth-form.type';
import { NotificationService } from '@app/core/services/notification.service';
import { IAuthResponse, ILoginFormData } from '@auth/interfaces/auth.type';
import { AuthService } from '@auth/services/auth.service';

/**
 * This component is used to login the user.
 */
@Component({
  selector: 'summeet-login',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup<ILoginFormControl>;
  public loginResponse!: IAuthResponse;
  public hidePassword: boolean = true;
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly store = inject(Store<IAppState>);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly participantService = inject(ParticipantService);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.loginForm = new FormGroup<ILoginFormControl>({
      email: new FormControl<string | null>('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl<string | null>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  /**
   * This method is used to submit the login form.
   * @returns {void}
   */
  public onSubmit(): void {
    const userLogin: ILoginFormData = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.authService
      .loginUser(userLogin)
      .pipe(
        take(1),
        tap(res => (this.loginResponse = res)),
        tap(res => {
          this.store.dispatch(postAuthCredentials({ content: res }));
          this.notificationService.success('Prihlásenie bolo úspešné');
          void this.router.navigate(['/user/event/upcoming']);
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
