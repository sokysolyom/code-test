import { Component, inject, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { take, tap, catchError, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { NotificationService } from '@app/core/services/notification.service';
import { ContactService } from '@app/static/services/contact.service';
import { IContactFormInterface } from '@app/static/types/general.type';

/**
 * This component is used to display the contact page.
 */
@Component({
  selector: 'summeet-contact',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactForm!: UntypedFormGroup;
  private readonly contactService = inject(ContactService);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.contactForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl(
        '',
        Validators.compose([Validators.required, Validators.email]),
      ),
      phoneNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[0-9,+ ]{10,13}'),
      ]),
      subject: new UntypedFormControl('', Validators.required),
      message: new UntypedFormControl('', Validators.required),
    });
  }

  /**
   * This method is called when the form is submitted.
   * @returns {void}
   */
  public onSubmit(): void {
    const contactData = this.contactForm.value as IContactFormInterface;
    this.contactService
      .sendContactForm(contactData)
      .pipe(
        take(1),
        tap(() =>
          this.notificationService.success('Vaša správa bola úspešne odoslaná'),
        ),
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
