import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '@app/core/services/notification.service';
import { RegisterService } from '@app/register/services/register.service';
import { IProfileRepresentativeWorkForm } from '../../interfaces/profile-representative-work-form.interface';
import { ProfileService } from '../../services/profile.service';

/**
 * This component is used to display the profile representative statements.
 */
@Component({
  selector: 'summeet-profile-representative-statements',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './profile-representative-statements.component.html',
  styleUrl: './profile-representative-statements.component.scss',
})
export class ProfileRepresentativeStatementsComponent implements OnInit {
  public workData!: IProfileRepresentativeWorkForm;
  public isSlovak: boolean = false;
  public isCzech: boolean = false;
  public isDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public currentFlag!: string;

  private readonly profileService = inject(ProfileService);
  private readonly registerService = inject(RegisterService);
  private readonly notificationService = inject(NotificationService);
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Initializes the component
   */
  public ngOnInit(): void {
    this.profileService
      .workDataRepresentative()
      .pipe(
        tap(workData => {
          this.workData = workData;

          if (workData.country === 'Slovenská republika') {
            this.isSlovak = true;
            this.currentFlag = 'sk';
          } else if (workData.country === 'Česká republika') {
            this.isCzech = true;
            this.currentFlag = 'cz';
          } else {
            // Fetch the country details from the endpoint
            this.registerService.getCountries(workData.country).subscribe({
              next: country => {
                if (country) {
                  this.currentFlag = country[0].officialNameSk; // Set the current flag to the country's display name
                  this.iconRegistry.addSvgIconLiteral(
                    country[0].officialNameSk,
                    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
                    this.sanitizer.bypassSecurityTrustHtml(country[0].flag), // Assuming `country.flag` contains the SVG string
                  );
                }
              },
              error: err => {
                const errorResponse = err as HttpErrorResponse;

                const errorMessage =
                  errorResponse.error &&
                  typeof errorResponse.error === 'object' &&
                  'message' in errorResponse.error
                    ? (errorResponse.error as { message: string }).message
                    : 'An unknown error occurred';

                this.notificationService.error(errorMessage);
              },
            });
          }

          this.isDataLoaded$.next(true);
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
