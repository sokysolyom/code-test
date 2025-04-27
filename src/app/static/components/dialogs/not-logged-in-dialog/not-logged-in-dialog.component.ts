import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * This component is used to display the not logged in dialog.
 */
@Component({
  selector: 'summeet-not-logged-in-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './not-logged-in-dialog.component.html',
  styleUrls: ['./not-logged-in-dialog.component.scss'],
})
export class NotLoggedInDialogComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<NotLoggedInDialogComponent>);

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
