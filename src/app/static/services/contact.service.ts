import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { IContactFormInterface, IEmailRespones } from '../types/general.type';

/**
 * This service is used to handle the contact form.
 */
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly httpClient = inject(HttpClient);

  /**
   * This method is used to send the contact form.
   * @param {IContactFormInterface} data - The data of the contact form.
   * @returns {Observable<IEmailRespones>} - The response of the email.
   */
  public sendContactForm(
    data: IContactFormInterface,
  ): Observable<IEmailRespones> {
    return this.httpClient.post<IEmailRespones>(
      environment.baseUrl + '/mail/contact-form',
      data,
    );
  }
}
