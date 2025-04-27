import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * This component is used to display the logged in dialog.
 */
@Component({
  selector: 'summeet-logged-in-dialog',
  templateUrl: './logged-in-dialog.component.html',
  styleUrls: ['./logged-in-dialog.component.scss'],
})
export class LoggedInDialogComponent {
  public dialogRef = inject(MatDialogRef<LoggedInDialogComponent>);

  /**
   * This method is called when the dialog is closed.
   * @returns {void}
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
