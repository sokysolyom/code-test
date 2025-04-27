import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * This component is used to display the cant prescribe medication dialog.
 */
@Component({
  selector: 'summeet-cant-prescribe-medication-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './cant-prescribe-medication-dialog.component.html',
  styleUrls: ['./cant-prescribe-medication-dialog.component.scss'],
})
export class CantPrescribeMedicationDialogComponent implements OnInit {
  public dialogRef = inject(
    MatDialogRef<CantPrescribeMedicationDialogComponent>,
  );

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
