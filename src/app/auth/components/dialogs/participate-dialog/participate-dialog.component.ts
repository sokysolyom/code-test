import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * This component is used to display the participate dialog.
 */
@Component({
  selector: 'summeet-participate-dialog',
  templateUrl: './participate-dialog.component.html',
  styleUrls: ['./participate-dialog.component.scss'],
})
export class ParticipateDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<ParticipateDialogComponent>);

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  /**
   * This method is called when the dialog is closed.
   * @returns {void}
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
