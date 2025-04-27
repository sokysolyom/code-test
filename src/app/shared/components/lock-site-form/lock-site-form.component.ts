import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js';

/**
 * This component is used to display the lock site form.
 */
@Component({
  selector: 'summeet-lock-site-form',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './lock-site-form.component.html',
  styleUrl: './lock-site-form.component.scss',
})
export class LockSiteFormComponent {
  public password: FormControl<string | null> = new FormControl<string | null>(
    '',
    Validators.required,
  );
  public hidePassword: boolean = true;

  private readonly router = inject(Router);

  /**
   * This method is called when the form is submitted.
   * @returns {void}
   */
  public submit(): void {
    // Example of MD5 hashing

    // eslint-disable-next-line sonarjs/new-cap, @typescript-eslint/no-unsafe-member-access
    const hashedValue = CryptoJS.MD5(this.password.value ?? '').toString(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      CryptoJS.enc.Base64,
    );
    if (hashedValue === 'IYN49QFZcFdKQF1v4K7mOQ==') {
      localStorage.setItem('isAllowed', 'true');
      void this.router.navigate(['/general/uvod']);
    }
  }
}
