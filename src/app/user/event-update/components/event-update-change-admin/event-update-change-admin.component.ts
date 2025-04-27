import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChangeAdminDialogComponent } from '../dialogs/change-admin-dialog/change-admin-dialog.component';

/**
 * This component is responsible for displaying event update change admin
 */
@Component({
  selector: 'summeet-event-update-change-admin',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './event-update-change-admin.component.html',
  styleUrl: './event-update-change-admin.component.scss',
})
export class EventUpdateChangeAdminComponent {
  private readonly dialog = inject(MatDialog);

  /**
   * Open change admin dialog
   * @returns {void}
   */
  public changeAdmin(): void {
    this.dialog.open(ChangeAdminDialogComponent, {
      width: '90%',
      maxWidth: '800px',
    });
  }
}
