import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  map,
  take,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IAppState } from '@app/state/app.state';
import { eventEditIdSelector } from '@app/state/event-edit/event-edit.selector';
import { NotificationService } from '@app/core/services/notification.service';
import { environment } from '@env';
import { DateFormatWithTimePipe } from '@app/shared/pipes/accommodation-dates.pipe';
import { NormalDate } from '@app/shared/pipes/birth-dates.pipe';
import { EventUpdateFeesService } from '../../services/event-update-fees.service';
import { IFeesTableData } from '../../interfaces/event-update.interface';
import { IProformaInvoiceResponse } from '../../interfaces/event-update-fees.interface';

/**
 * This component is used to display the fees for the event
 */
@Component({
  selector: 'summeet-event-update-fees',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    DateFormatWithTimePipe,
    NormalDate,
  ],
  templateUrl: './event-update-fees.component.html',
  styleUrl: './event-update-fees.component.scss',
})
export class EventUpdateFeesComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'fee'];
  public dataSource = new MatTableDataSource<IFeesTableData>([]);
  public invoiceData!: IProformaInvoiceResponse;
  public isPaid: boolean = false;
  public isDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public noInvoiceFound = false;

  private readonly eventUpdateFeesService = inject(EventUpdateFeesService);
  private readonly store = inject(Store<IAppState>);
  private readonly notificationService = inject(NotificationService);

  /**
   * This method is initilized with  the component
   * @returns {void}
   */
  public ngOnInit(): void {
    this.store
      .select(eventEditIdSelector)
      .pipe(
        take(1),
        concatMap((eventId: string) =>
          this.eventUpdateFeesService.invoiceData(eventId),
        ),
        map((data: IProformaInvoiceResponse) => {
          this.invoiceData = data;
          this.dataSource.data = data.items.map(item => ({
            name: item.name,
            fee: +item.totalPriceInclVat,
          }));
          this.isPaid = data.sumOfPayments >= data.totalPriceInclVat;
          this.isDataLoaded$.next(true);
        }),
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;
          let errorMessage = '';
          if (errorResponse.status === 404) {
            this.noInvoiceFound = true;
          } else {
            errorMessage =
              errorResponse.error &&
              typeof errorResponse.error === 'object' &&
              'message' in errorResponse.error
                ? (errorResponse.error as { message: string }).message
                : 'An unknown error occurred';

            this.notificationService.error(errorMessage);
          }

          return throwError(() => new Error(errorMessage));
        }),
      )
      .subscribe();
  }

  /**
   * This method is used to get the total cost of the event
   * @returns {number} The total cost of the event
   */
  public getTotalCost(): number {
    return this.dataSource.data
      .map(t => t.fee)
      .reduce((acc, value) => acc + value, 0);
  }

  /**
   * This method is used to show the invoice in other tab.
   * @param {string} id - The id of the file
   * @returns {void}
   */
  public openInvoice(id: string): void {
    const url = `${environment.baseUrl}/invoices/proforma-invoices/${id}`;
    window.open(url, '_blank');
  }
}
