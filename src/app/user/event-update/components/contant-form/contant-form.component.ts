import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactService } from '@app/static/services/contact.service';
import { ProfileService } from '@app/user/profile/services/profile.service';
import { NotificationService } from '@app/core/services/notification.service';
import { IUserInfoResponse } from '@app/user/profile/interfaces/profile-personal-statements.interface';
import { Telephonenumber } from '@app/shared/pipes/telephone.pipe';
import { IContactFormInterface } from '@app/static/types/general.type';
import { ISelectOption } from '../../interfaces/event-update.interface';

/**
 * This component is used to display the contact form.
 */
@Component({
  selector: 'summeet-contant-form',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    Telephonenumber,
  ],
  templateUrl: './contant-form.component.html',
  styleUrl: './contant-form.component.scss',
})
export class ContantFormComponent implements OnInit {
  public selectedType!: string;
  public types: ISelectOption[] = [
    {
      value: 'Zmena objednaných služieb',
      viewValue: 'Zmena objednaných služieb',
    },
    { value: 'Odhlásenie z podujatia', viewValue: 'Odhlásenie z podujatia' },
    { value: 'Iné', viewValue: 'Iné' },
  ];
  public messageControl: FormControl<string | null> = new FormControl<
    string | null
  >('', Validators.required);
  public userData!: IUserInfoResponse;

  private readonly contactService = inject(ContactService);
  private readonly profileService = inject(ProfileService);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.profileService
      .info()
      .pipe(
        map(data => {
          this.userData = data;
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
   * This method is called when the form is submitted.
   * @returns {void}
   */
  public onSubmit(): void {
    const data: IContactFormInterface = {
      name: this.userData.firstName + ' ' + this.userData.lastName,
      email: this.userData.email,
      phoneNumber: this.userData.phoneNumber,
      subject: this.selectedType,
      message: this.messageControl.value ?? '',
    };
    this.contactService
      .sendContactForm(data)
      .pipe(
        map(() => {
          this.notificationService.success('Správa bola úspešne odoslaná.');
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
