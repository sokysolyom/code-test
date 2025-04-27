import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export interface IDisposable {
  /**
   * Destroy signal$ fired when destroying component
   */
  destroySignal$: Subject<null>;
}

/**
 * Disposable
 */
@Directive()
export abstract class Disposable implements OnDestroy {
  public destroySignal$ = new Subject<null>();

  /**
   * Destroy component
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.destroySignal$.next(null);
    this.destroySignal$.complete();
  }
}
