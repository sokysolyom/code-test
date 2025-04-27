import {
  OverlayRef,
  ScrollStrategyOptions,
  Overlay,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { PICTURE_BROWSER_DATA_TOKEN } from '@app/core/utils/picture-browser-data.token';
import { PictureBrowserComponent } from '../../shared/components/picture-browser/picture-browser.component';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class PictureBrowserService {
  public activeOverlayRef: OverlayRef | undefined;

  private readonly scrollStrategy = inject(ScrollStrategyOptions);
  public overlay = inject(Overlay);
  private readonly router = inject(Router);

  /**
   * Constructor to initialize the PictureBrowserService.
   * Subscribes to router events to hide the overlay when navigation occurs.
   * @returns {void}
   */
  public constructor() {
    this.router.events.subscribe(() => {
      this.onHideOverlay();
    });
  }

  /**
   * This method is used to show the overlay.
   * @param {ImageItem[]} images - The images.
   * @param {number} index - The index.
   * @returns {OverlayRef} - The overlay reference.
   */
  private showOverlay(images: ImageItem[], index: number): OverlayRef {
    const position = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      positionStrategy: position,
      scrollStrategy: this.scrollStrategy.block(),
      hasBackdrop: true,
      backdropClass: 'picture-browser-backdrop',
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const dataInjector = Injector.create({
      providers: [
        { provide: PICTURE_BROWSER_DATA_TOKEN, useValue: { images, index } },
      ],
    });
    const component = new ComponentPortal(
      PictureBrowserComponent,
      null,
      dataInjector,
    );
    overlayRef.attach(component);
    return overlayRef;
  }

  /**
   * This method is used to show the overlay.
   * @param {ImageItem[]} images - The images.
   * @param {number} index - The index.
   * @returns {void}
   */
  public onShowOverlay(images: ImageItem[], index: number): void {
    if (!this.activeOverlayRef) {
      this.activeOverlayRef = this.showOverlay(images, index);
    }
  }

  /**
   * This method is used to hide the overlay.
   * @returns {void}
   */
  public onHideOverlay(): void {
    if (this.activeOverlayRef) {
      this.activeOverlayRef?.dispose();
      this.activeOverlayRef = undefined;
    }
  }
}
