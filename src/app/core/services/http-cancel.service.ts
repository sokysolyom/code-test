import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * HTTP Cancel Service
 */
@Injectable({
  providedIn: 'root',
})
export class HttpCancelService {
  private pendingHTTPRequests$ = new Subject<void>();

  /**
   * Cancel pending requests
   * @description Cancel pending requests
   * @returns {void}
   */
  public cancelPendingRequests(): void {
    this.pendingHTTPRequests$.next();
  }

  /**
   * On cancel pending requests
   * @description On cancel pending requests
   * @returns {Observable<void>} - Pending HTTP requests
   */
  public onCancelPendingRequests(): Observable<void> {
    return this.pendingHTTPRequests$.asObservable();
  }
}
