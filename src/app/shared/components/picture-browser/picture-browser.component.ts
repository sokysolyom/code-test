import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Gallery, GalleryItem, GalleryModule, GalleryRef } from 'ng-gallery';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PictureBrowserService } from '@app/core/services/picture-browser.service';
import { PICTURE_BROWSER_DATA_TOKEN } from '@app/core/utils/picture-browser-data.token';

/**
 * This component is used to display the picture browser.
 */
@Component({
  selector: 'summeet-picture-browser',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, GalleryModule],
  templateUrl: './picture-browser.component.html',
  styleUrls: ['./picture-browser.component.scss'],
})
export class PictureBrowserComponent implements OnInit {
  public galleryRef!: GalleryRef;

  private readonly pictureBrowserService = inject(PictureBrowserService);
  private readonly gallery = inject(Gallery);
  public data: { index: number; images: GalleryItem[] } = inject(
    PICTURE_BROWSER_DATA_TOKEN,
  );

  /**
   * This method is called when a keyboard event is triggered.
   * @param {KeyboardEvent} event - The keyboard event.
   * @returns {void}
   */
  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape': {
        this.closePictureBrowser();

        break;
      }
      case 'ArrowLeft': {
        this.galleryRef.prev();

        break;
      }
      case 'ArrowRight': {
        this.galleryRef.next();

        break;
      }
    }
  }

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.galleryRef.set(this.data.index);
    this.galleryRef = this.gallery.ref('pictureBrowserGallery');
  }

  /**
   *  This method is called when the picture browser is closed.
   */
  public closePictureBrowser(): void {
    this.pictureBrowserService.onHideOverlay();
  }
}
