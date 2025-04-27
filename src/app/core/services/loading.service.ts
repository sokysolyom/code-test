import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { LoadingComponent } from '@app/shared/components/loading/loading.component';

/**
 * Loading Service
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public activeOverlayRef: OverlayRef | undefined;
  public loadingStatus$ = new BehaviorSubject<boolean>(false);
  private readonly scrollStrategy = inject(ScrollStrategyOptions);
  private readonly overlay = inject(Overlay);

  /**
   * Constructor
   * @description Initialize service
   * @returns {OverlayRef} - Overlay reference
   */
  private showOverlay(): OverlayRef {
    const position = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      positionStrategy: position,
      scrollStrategy: this.scrollStrategy.block(),
      hasBackdrop: true,
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const component = new ComponentPortal(LoadingComponent);
    overlayRef.attach(component);
    return overlayRef;
  }

  /**
   * Get loading status
   * @description Get loading status
   * @returns {void}
   */
  public onShowLoading(): void {
    if (!this.activeOverlayRef) {
      this.activeOverlayRef = this.showOverlay();
    }
  }

  /**
   * Hide loading status
   * @description Hide loading status
   * @returns {void}
   */
  public onHideLoading(): void {
    if (this.activeOverlayRef) {
      this.activeOverlayRef?.dispose();
      this.activeOverlayRef = undefined;
    }
  }

  /**
   * Get loading status
   * @description Get loading status
   * @returns {void}
   */
  public showLoading(): void {
    this.loadingStatus$.next(true);
  }

  /**
   * Hide loading status
   * @description Hide loading status
   * @returns {void}
   */
  public hideLoading(): void {
    this.loadingStatus$.next(false);
  }
}
