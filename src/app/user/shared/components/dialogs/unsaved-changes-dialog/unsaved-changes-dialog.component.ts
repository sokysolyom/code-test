import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/**
 * This component is used to display a dialog when the user tries to leave a page with unsaved changes.
 */
@Component({
  selector: 'summeet-unsaved-changes-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './unsaved-changes-dialog.component.html',
  styleUrls: ['./unsaved-changes-dialog.component.scss'],
})
export class UnsavedChangesDialogComponent implements OnInit {
  private readonly dialogRef = inject(
    MatDialogRef<UnsavedChangesDialogComponent>,
  );

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }
  /**
   * This method is called when the user clicks on the button.
   * @param {boolean} value - The value to close the dialog with.
   * @returns {void}
   */
  public onClick(value: boolean): void {
    this.dialogRef.close(value);
  }
}
