import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format a telephone number.
 */
@Pipe({ name: 'telephonenumber', standalone: true })
export class Telephonenumber implements PipeTransform {
  /**
   * Transforms a phone number string into a formatted string.
   * @param {string | null} phoneNumber - The phone number to format.
   * @returns {string} The formatted phone number as a string.
   */
  public transform(phoneNumber: string | undefined): string {
    if (!phoneNumber) {
      return '';
    }

    // If the phone number starts with a plus sign (+), format it accordingly
    if (phoneNumber.startsWith('+')) {
      return phoneNumber.replace(
        /^(\+\d{3})(\d{3})(\d{3})(\d{3})$/,
        '$1 $2 $3 $4',
      );
    }

    // For phone numbers without a plus sign, apply normal formatting
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }
}
