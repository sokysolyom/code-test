import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  filter,
  map,
  take,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Role } from '@app/shared/enums/role.enum';
import {
  BirthDates,
  DayFromDate,
  DayRangeFromDatePipe,
  MonthFromDate,
} from '@app/shared/pipes/birth-dates.pipe';
import { IAppState } from '@app/state/app.state';
import { NotificationService } from '@app/core/services/notification.service';
import { eventEditIdSelector } from '@app/state/event-edit/event-edit.selector';
import { DeleteConfirmationDialogComponent } from '@app/user/profile/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DayDifferencePipe } from '@app/shared/pipes/accommodation-dates.pipe';
import { EventUpdateService } from '../../services/event-update.service';
import { IRegisteredUsersCustomTable } from '../../interfaces/registered-users-custom-table.interface';

/**
 * Registered Users Custom Table Component
 */
@Component({
  selector: 'summeet-registered-users-custom-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MonthFromDate,
    DayFromDate,
    BirthDates,
    MatButtonModule,
    DayRangeFromDatePipe,
    DayDifferencePipe,
  ],
  templateUrl: './registered-users-custom-table.component.html',
  styleUrl: './registered-users-custom-table.component.scss',
})
export class RegisteredUsersCustomTableComponent {
  @Input() public userData!: IRegisteredUsersCustomTable;
  @Output() public fetchUsers = new EventEmitter<void>();
  public healtcareRole = Role.HEALTHCARE_PROFESSIONAL;
  public readonly panelOpenState = signal(false);

  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly store = inject(Store<IAppState>);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  /**
   * Delete user
   * @param {string} userId - The user id
   * @param {string} name - The user name
   * @returns {void}
   */
  public deleteUser(userId: string, name: string): void {
    const deleteDialogRef = this.dialog.open(
      DeleteConfirmationDialogComponent,
      {
        width: '90%',
        maxWidth: '800px',
        data: name,
      },
    );

    deleteDialogRef
      .afterClosed()
      .pipe(
        filter((res): res is boolean => res !== null),
        concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
        concatMap(eventId =>
          this.eventUpdateService.deleteUserFromEventByPartner(eventId, userId),
        ),
        tap(() => this.fetchUsers.emit()),
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;

          const errorMessage =
            errorResponse.error &&
            typeof errorResponse.error === 'object' &&
            'message' in errorResponse.error
              ? (errorResponse.error as { message: string }).message
              : 'An unknown error occurred';

          this.notificationService.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }

  /**
   * This method is used to fetch the user data.
   * @param {string} userId - The user id.
   * @param {boolean} isOpen - The is open.
   * @returns {void} - The void.
   */
  public fetchUserData(userId: string, isOpen: boolean): void {
    if (!isOpen) return;

    this.store
      .select(eventEditIdSelector)
      .pipe(
        take(1),
        concatMap(eventId =>
          this.eventUpdateService
            .accommodationSettingsByPartner(eventId, userId)
            .pipe(
              map(response => {
                const user = this.userData.users.find(u => u.id === userId);
                if (user) {
                  user.accommodation = response; // Assign the response to the user's accommodation field
                }
                return eventId; // Pass the eventId downstream
              }),
            ),
        ),
        concatMap(eventId =>
          this.eventUpdateService.mealSettingsByPartner(eventId, userId).pipe(
            map(response => {
              const user = this.userData.users.find(u => u.id === userId);
              if (user) {
                user.meals = response; // Assign the response to the user's meals field
              }
            }),
          ),
        ),
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;

          const errorMessage =
            errorResponse.error &&
            typeof errorResponse.error === 'object' &&
            'message' in errorResponse.error
              ? (errorResponse.error as { message: string }).message
              : 'An unknown error occurred';

          this.notificationService.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }
}
