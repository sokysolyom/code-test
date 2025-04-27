import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';

/**
 * This service is used to provide general services.
 */
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private readonly httpClient = inject(HttpClient);

  /**
   * This method is used to get the access to the stand.
   * @returns {Observable<boolean>} - The access to the stand.
   */
  public getAccessToStand(): Observable<boolean> {
    return this.httpClient.get<boolean>(
      environment.baseUrl + '/user/can-access-stand',
    );
  }
}
