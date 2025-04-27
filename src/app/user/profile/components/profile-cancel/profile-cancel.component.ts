import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

/**
 * This component is used to cancel the profile.
 */
@Component({
  selector: 'summeet-profile-cancel',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './profile-cancel.component.html',
  styleUrl: './profile-cancel.component.scss',
})
export class ProfileCancelComponent {
  private readonly dialog = inject(MatDialog);
  /**
   * This method is used to cancel the profile.
   * @returns {void}
   */
  public onCancel(): void {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '90%',
      maxWidth: '800px',
    });
  }
}
