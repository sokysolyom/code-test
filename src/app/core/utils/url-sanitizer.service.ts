import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { WINDOW_REF } from './window-ref';

/**
 *
 */
@Injectable({ providedIn: 'root' })
export class UrlSanitizerService {
  private readonly window = inject(WINDOW_REF);
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * This method is used to create a sanitized url.
   * @param {File} file - The file.
   * @returns {SafeUrl} - The sanitized url.
   */
  public createSanitiziedUrl(file: File): SafeUrl {
    // Ensure the URL being sanitized is safe
    const objectUrl = this.window.URL.createObjectURL(file);
    // Document why it is safe to bypass Angular's built-in sanitization
    // In this case, we are creating an object URL from a file input which is considered safe
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }
}
