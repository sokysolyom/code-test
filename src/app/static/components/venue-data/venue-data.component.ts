import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NguCarousel,
  NguTileComponent,
  NguCarouselDefDirective,
  NguCarouselNextDirective,
  NguCarouselPrevDirective,
  NguCarouselConfig,
} from '@ngu/carousel';
import { ImageItem } from 'ng-gallery';
import { SafePipe } from 'safe-pipe';
import { PictureBrowserService } from '@app/core/services/picture-browser.service';
import { TitleOverlayComponent } from '@app/shared/components/title-overlay/title-overlay.component';
import { IVenueData } from '@app/static/types/general.type';

/**
 * This component is used to display the venue data.
 */
@Component({
  selector: 'summeet-venue-data',
  standalone: true,
  imports: [
    TitleOverlayComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NguCarousel,
    NguTileComponent,
    NguCarouselDefDirective,
    NguCarouselNextDirective,
    NguCarouselPrevDirective,
    SafePipe,
  ],
  templateUrl: './venue-data.component.html',
  styleUrl: './venue-data.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class VenueDataComponent implements OnInit {
  @Input() public venueData!: IVenueData;
  @Input() public isHotel: boolean = false;
  public itemsPerSlide!: number;
  /**
   * This method is called when the window is resized.
   * @param {object} event - The inner width of the window.
   * @param {object} event.target - The inner width of the window.
   * @param {number} event.target.innerWidth - The inner width of the window.
   * @returns {void}
   */
  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    const screenWidth = event.target.innerWidth;

    if (screenWidth <= 599) {
      this.itemsPerSlide = 2;
    } else if (screenWidth <= 959) {
      this.itemsPerSlide = 2;
    } else if (screenWidth <= 1279) {
      this.itemsPerSlide = 2;
    } else {
      this.itemsPerSlide = 3;
    }
  }

  // Radlinského 1739, 026 01 Dolný Kubín
  // Vyhne č. 103, 966 02 Vyhne
  public mapsURL = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${this.venueData?.positionMap?.street} ${this.venueData?.positionMap?.num}, ${this.venueData?.positionMap?.city}`,
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  private readonly pictureBrowserService = inject(PictureBrowserService);

  /**
   * This method is used to navigate to the image redirect.
   * @returns {void}
   */
  public navigate(): void {
    window.open(this.venueData.buttonLink, '_blank');
  }

  /**
   * This method is called when the component is initialized.
   * @param {number }index - The index of the picture.
   * @returns {void}
   */
  public openPictureBrowser(index: number): void {
    const imageItems =
      this.venueData.photos?.map(
        url =>
          new ImageItem({
            src: url,
            thumb: url,
          }),
      ) || [];

    this.pictureBrowserService.onShowOverlay(imageItems, index);
  }

  private readonly cdr = inject(ChangeDetectorRef);
  public carouselTileItems: Array<string> = [];
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 3, lg: 3, all: 0 },
    slide: 1,
    speed: 250,
    point: {
      visible: true,
    },
    load: 2,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  };

  /**
   * This method is called when the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.carouselTileLoad();
  }

  /**
   * This method is called when the carousel tile is loaded.
   * @returns {void}
   */
  public carouselTileLoad(): void {
    const maxItems = 6; // Set the maximum number of items
    const currentLen = this.carouselTileItems.length;

    // Check if there are fewer than 6 items, and fill up to 6
    if (currentLen < maxItems) {
      for (let i = currentLen; i < maxItems; i++) {
        this.carouselTileItems.push(
          this.venueData.photos
            ? this.venueData.photos[i % this.venueData.photos.length]
            : '', // Loop through photos to fill exactly 6
        );
      }
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }
}
