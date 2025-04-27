import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This service is for updating the sidenav based on the active participation
 */
@Injectable({
  providedIn: 'root',
})
export class ParticipationStatusService {
  private refreshParticipationStatus = new Subject<void>();

  public refreshParticipationStatus$ =
    this.refreshParticipationStatus.asObservable();

  /**
   * This method is triggering the refresh
   * @returns {void}
   */
  public triggerRefresh(): void {
    this.refreshParticipationStatus.next();
  }
}
