import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  filter,
  iif,
  map,
  of,
  startWith,
  Subject,
  take,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EventRegisterService } from '@app/user/event-register/services/event-register.service';
import { IAppState } from '@app/state/app.state';
import {
  eventEditIdSelector,
  eventEditSubmissionSettingsSelector,
} from '@app/state/event-edit/event-edit.selector';
import { NotificationService } from '@app/core/services/notification.service';
import { DeleteConfirmationDialogComponent } from '@app/user/profile/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ISubmissionSettings } from '@app/state/event-register/event-register.reducer';
import {
  IAbstractDialogData,
  ISubmissionResponse,
} from '../../interfaces/event-update.interface';
import { AbstractDialogComponent } from '../dialogs/abstract-dialog/abstract-dialog.component';
import { EventUpdateService } from '../../services/event-update.service';

/**
 * This component is used to update files for the event
 */
@Component({
  selector: 'summeet-event-update-files',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './event-update-files.component.html',
  styleUrl: './event-update-files.component.scss',
})
export class EventUpdateFilesComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'type', 'actions'];
  public dataSource = new MatTableDataSource<ISubmissionResponse>([]);
  private fetchSubmissions$ = new Subject<void>();
  public isActive: boolean = false;
  private destroy$ = new Subject<void>();
  public submissionSettings: ISubmissionSettings | null = null;

  private readonly dialog = inject(MatDialog);
  private readonly eventUpdateService = inject(EventUpdateService);
  private readonly eventRegisterService = inject(EventRegisterService);
  private readonly store = inject(Store<IAppState>);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is called when the component is destroyed
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this.fetchSubmissions$
      .asObservable()
      .pipe(
        startWith([]),
        takeUntil(this.destroy$), // Automatically unsubscribe on destroy
        concatMap(() =>
          this.store.select(eventEditIdSelector).pipe(
            take(1),
            concatMap(eventId =>
              this.eventUpdateService.getParticipation(eventId).pipe(
                tap(data => {
                  this.isActive = data.isParticipationActive;
                }),
                map(data => ({
                  eventId,
                  isActive: data.isParticipationActive,
                })), // Pass both `eventId` and `isActive`
              ),
            ),
          ),
        ),
        concatMap(
          ({ eventId, isActive }) =>
            isActive
              ? this.eventUpdateService.getSubmissions(eventId).pipe(
                  tap(submissions => {
                    this.dataSource.data = submissions;
                  }),
                )
              : of(null), // Skip fetching submissions if not active
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

    this.store
      .select(eventEditSubmissionSettingsSelector)
      .pipe(
        take(2),
        map(submissionSettings => {
          this.submissionSettings = submissionSettings ?? null;
        }),
      )
      .subscribe();
  }

  /**
   * This method is used to handle file selection
   * @param {Event} event - The event object
   * @param {string} fileType - The type of file
   * @returns {void}
   */
  public onFileSelected(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.store
        .select(eventEditIdSelector)
        .pipe(
          take(1),
          concatMap(eventId =>
            iif(
              () => fileType === 'poster', // Condition to check the file type
              this.eventRegisterService.postPoster(eventId, formData), // Call the postPoster method
              this.eventRegisterService.postPresentation(eventId, formData), // Call the postPresentation method
            ),
          ),
          tap(() => {
            this.fetchSubmissions$.next();
            this.notificationService.success('Súbor bol úspešne pridaný.');
          }),
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

  /**
   * This method is used to upload an abstract
   * @returns {void}
   */
  public uploadAbstract(): void {
    const dialogRef = this.dialog.open(AbstractDialogComponent, {
      width: '90%',
      maxWidth: '800px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        // eslint-disable-next-line sonarjs/function-return-type
        concatMap(result => {
          if (result && typeof result === 'object') {
            return this.store.select(eventEditIdSelector).pipe(
              take(1),
              concatMap(eventId =>
                this.eventRegisterService.postAbstract(eventId, [
                  result,
                ] as IAbstractDialogData[]),
              ),
              tap(() => {
                this.fetchSubmissions$.next();
                this.notificationService.success(
                  'Abstrakt bol úspešne pridaný.',
                );
              }),
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
            );
          }
          return [];
        }),
      )
      .subscribe();
  }

  /**
   * This method is used to edit an abstract
   * @param {string} id - The abstract ID
   * @returns {void}
   */
  public editAbstract(id: string): void {
    this.store
      .select(eventEditIdSelector)
      .pipe(
        take(1),
        concatMap(eventId =>
          this.eventUpdateService
            .getAbstractById(eventId, id)
            .pipe(map(data => ({ eventId, abstractId: id, data }))),
        ),
        concatMap(({ eventId, abstractId, data }) => {
          const dialogRef = this.dialog.open(AbstractDialogComponent, {
            width: '90%',
            maxWidth: '800px',
            data,
          });
          return dialogRef
            .afterClosed()
            .pipe(map(result => ({ eventId, abstractId, result })));
        }),
        // eslint-disable-next-line sonarjs/function-return-type
        concatMap(({ eventId, abstractId, result }) => {
          if (result && typeof result === 'object') {
            return this.eventUpdateService
              .putAbstractById(
                eventId,
                abstractId,
                result as IAbstractDialogData,
              )
              .pipe(
                tap(() => {
                  this.fetchSubmissions$.next();
                  this.notificationService.success(
                    'Abstrakt bol úspešne upravený.',
                  );
                }),
              );
          }
          return [];
        }),
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
   * This method is used to delete an item
   * @param {string} type - The item type
   * @param {string} id - The item ID
   * @returns {void}
   */
  public deleteItem(type: string, id: string): void {
    if (type === 'abstrakt') {
      this.deleteAbstract(id);
    } else {
      this.deleteFile(type, id);
    }
  }

  /**
   * This method is used to download a file
   * @param {string} id - The file ID
   * @returns {void}
   */
  public downloadItem(id: string): void {
    this.eventUpdateService
      .downloadFile(id)
      .pipe(
        tap(blob => {
          const url = globalThis.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'file';
          document.body.append(a);
          a.click();
          globalThis.URL.revokeObjectURL(url);
        }),
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
   * This method is used to delete a file
   * @param {string} type - The file type
   * @param {string} id - The file ID
   * @returns {void}
   */
  private deleteFile(type: string, id: string): void {
    let fileType = type;
    if (type === 'prednáška') {
      fileType = 'prednášku';
    }
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '90%',
      maxWidth: '800px',
      data: fileType,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(result => result === true),
        concatMap(() => this.eventUpdateService.deleteFile(id)),
        tap(() => {
          this.notificationService.success('Súbor bol úspešne zmazaný.');
          this.fetchSubmissions$.next();
        }),
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
   * This method is used to delete an abstract
   * @param {string} id - The abstract ID
   * @returns {void}
   */
  private deleteAbstract(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '90%',
      maxWidth: '800px',
      data: 'abstrakt',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(result => result === true),
        concatMap(() => this.store.select(eventEditIdSelector).pipe(take(1))),
        concatMap(eventId =>
          this.eventUpdateService.deleteAbstractById(eventId, id),
        ),
        tap(() => {
          this.notificationService.success('Abstrakt bol úspešne zmazaný.');
          this.fetchSubmissions$.next();
        }),
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
