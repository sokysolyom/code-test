import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * This component is used to display the maintanance mode dialog.
 */
@Component({
  selector: 'summeet-maintanance-mode-dialog',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './maintanance-mode-dialog.component.html',
  styleUrls: ['./maintanance-mode-dialog.component.scss'],
})
export class MaintananceModeDialogComponent implements OnInit {
  private readonly dialogRef = inject(
    MatDialogRef<MaintananceModeDialogComponent>,
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
