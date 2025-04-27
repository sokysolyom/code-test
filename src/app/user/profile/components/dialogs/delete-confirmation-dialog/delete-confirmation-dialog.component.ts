import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * This component represents the delete confirmation dialog.
 */
@Component({
  selector: 'summeet-delete-confirmation-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent implements OnInit {
  private readonly dialogRef = inject(
    MatDialogRef<DeleteConfirmationDialogComponent>,
  );
  public readonly name = inject<string>(MAT_DIALOG_DATA);
  public deleteConfirmation: FormControl<string | null> =
    new FormControl<string>('', [
      Validators.required,
      Validators.pattern('VYMAZAT'),
    ]);

  /**
   * On init
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  /**
   * Close dialog
   * @returns {void}
   */
  public closeDialog(): void {
    this.dialogRef.close(false);
  }

  /**
   * On submit
   * @returns {void}
   */
  public onSubmit(): void {
    if (this.deleteConfirmation.valid) {
      this.dialogRef.close(true);
    }
  }
}
