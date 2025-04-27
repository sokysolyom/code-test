import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const ICONS = [
  'google-calendar',
  'office-365',
  'outlook-calendar',
  'handshake-solid',
  'address-card',
  'briefcase',
  'virus-covid',
  'pen',
  'file-invoice',
  'user-tie',
  'calendar-day-solid',
  'clock-solid',
  'ticket-solid',
  'cash-register-solid',
  'user-music-solid',
  'music-solid',
  'file-pen-solid',
  'memo-circle-check-solid',
  'memo-solid',
  'user-pen-solid',
  'plate-utensils-solid',
  'people-arrows-left-right-solid',
  'award-simple-solid',
  'file-certificate-solid',
  'rectangle-history-solid',
  'screen-users-solid',
  'podium-solid',
  'user-solid',
  'dog-solid',
  'bus-simple-solid',
  'bus-solid',
  'arrow-right-from-bracket-solid',
  'pen-to-square-solid',
  'apple-calendar',
  'user-doctor-solid',
  'briefcase-medical',
  'user-doctor',
  'right-from-bracket',
  'right-to-bracket',
  'phone',
  'location-dot',
  'parking',
  'gear',
  'user',
  'calendar-day',
  'users',
  'list-check',
  'chalkboard-user',
  'list',
  'globe',
  'ticket',
  'money-bill-1-wave',
  'receipt',
  'calendar-lines-pen',
  'hand-holding-hand',
  'file-circle-xmark',
  'file-circle-info',
  'file-circle-check',
  'file-arrow-up',
  'circle-euro',
  'square',
  'credit-card',
  'money-bill-transfer',
  'award-simple-solid',
  'dollar-sign',
  'floppy-disk',
  'hotel',
  'trash-can',
  'circle-1',
  'circle-2',
  'circle-3',
  'circle-4',
  'circle-5',
  'circle-dollar-solid',
  'money-check-dollar-pen',
  'circle-star',
  'upload-solid',
  'ban-solid',
  'users-slash-solid',
  'users-solid',
  'house',
  'cake-candles',
  'envelope',
  'hospital',
  'input-numeric',
  'stethoscope',
  'house-night',
  'money-check-pen-solid',
  'file-regular',
  'paper-plane-regular',
  'check-solid',
  'users-gear-solid',
  'flag-solid',
  'sk',
  'cz',
  'instagram-brands-solid',
  'calendar-circle-user',
  'calendar-days',
  'badge-check',
  'photo-film',
  'user-gear',
  'lock-keyhole',
  'user-xmark',
  'circle-user-solid',
  'message-question',
  'id-badge',
  'rectangle-history-circle-user',
  'bell-concierge',
  'newspaper',
  'people-arrows-solid',
  'square-plus',
  'circle-info',
  'square-minus',
  'location-pin',
  'euro-sign',
];

/**
 * Icon Loader Service
 */
@Injectable({
  providedIn: 'root',
})
export class IconLoaderService {
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);

  /**
   * Load icons
   * @description Load icons
   * @returns {void}
   */
  public loadIcons(): void {
    for (const icon of ICONS) this.loadIcon(icon);
  }

  /**
   * Load icon
   * @param {string} name - Icon name
   * @param {string} path - Icon path
   * @returns {void}
   */
  public loadIcon(name: string, path: string = ''): void {
    this.matIconRegistry.addSvgIcon(
      name,
      // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/' + path + name + '.svg',
      ),
    );
  }
}
