import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * Change admin dialog component
 */
@Component({
  selector: 'summeet-change-admin-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './change-admin-dialog.component.html',
  styleUrl: './change-admin-dialog.component.scss',
})
export class ChangeAdminDialogComponent {
  public email: FormControl<string | null> = new FormControl<string | null>(
    null,
    Validators.compose([Validators.required, Validators.email]),
  );

  private readonly dialogRef = inject(MatDialogRef<ChangeAdminDialogComponent>);

  /**
   * This method is used to close the dialog
   * @returns {void}
   */
  public closeDialog(): void {
    this.dialogRef.close(null);
  }

  /**
   * This method is used to submit the dialog
   * @returns {void}
   */
  public submit(): void {
    this.dialogRef.close(true);
  }
}
