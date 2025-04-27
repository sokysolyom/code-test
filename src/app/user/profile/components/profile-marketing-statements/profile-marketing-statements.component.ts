import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@app/core/services/notification.service';
import {
  IMarketingStatements,
  IMarketingStatementsData,
} from '../../interfaces/profile-personal-statements.interface';
import { ProfileService } from '../../services/profile.service';

/**
 * This component is used to display the profile marketing statements.
 */
@Component({
  selector: 'summeet-profile-marketing-statements',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './profile-marketing-statements.component.html',
  styleUrl: './profile-marketing-statements.component.scss',
})
export class ProfileMarketingStatementsComponent
  implements OnInit, AfterViewInit
{
  public marketingDataForm!: FormGroup<IMarketingStatements>;

  private readonly profileService = inject(ProfileService);
  private readonly notificationService = inject(NotificationService);

  /**
   * Initializes the component.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.marketingDataForm = new FormGroup<IMarketingStatements>({
      inform: new FormControl(false),
      newsletter: new FormControl(false),
    });
  }

  /**
   * Initializes the component after the view is initialized.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    this.profileService
      .marketingStatements()
      .pipe(
        map(data => {
          this.marketingDataForm.patchValue({
            inform: data.isInformedAboutEvents,
            newsletter: data.isSubscribedToNewsletter,
          });
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
   * Handles the form submission.
   * @returns {void}
   */
  public onSubmit(): void {
    // to something
    const data: IMarketingStatementsData = {
      isInformedAboutEvents:
        this.marketingDataForm.get('inform')?.value ?? false,
      isSubscribedToNewsletter:
        this.marketingDataForm.get('newsletter')?.value ?? false,
    };
    this.profileService
      .putMarketingStatements(data)
      .pipe(
        map(() => {
          this.notificationService.success(
            'Marketingové vyhlásenia boli uložené',
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

          this.notificationService.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }
}
