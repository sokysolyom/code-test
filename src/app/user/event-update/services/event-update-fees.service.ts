import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { IProformaInvoiceResponse } from '../interfaces/event-update-fees.interface';

/**
 * This service is used to handle the event register.
 */
@Injectable({
  providedIn: 'root',
})
export class EventUpdateFeesService {
  private readonly httpClient = inject(HttpClient);

  /**
   * This method is used to get the invoice datas.
   * @param {string} eventId - The event id.
   * @returns {Observable<IProformaInvoiceResponse>} - The response.
   */
  public invoiceData(eventId: string): Observable<IProformaInvoiceResponse> {
    return this.httpClient.get<IProformaInvoiceResponse>(
      environment.baseUrl + `/invoices/proforma-invoices/events/${eventId}`,
    );
  }

  /**
   * This method is used to get the invoice file.
   *  @param {string} id - The file id.
   * @returns {Observable<string>} - The response.
   */
  public downloadInvoice(id: string): Observable<string> {
    return this.httpClient.get<string>(
      environment.baseUrl + `/invoices/proforma-invoices/${id}`,
    );
  }
}
