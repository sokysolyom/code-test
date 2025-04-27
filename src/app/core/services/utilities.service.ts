import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IZipCodeDto } from '@app/register/interfaces/register.type';

/**
 * Utility Service
 */
@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  /**
   * Format ZIP code
   * @param {IZipCodeDto} zip - The ZIP code DTO
   * @returns {string} - Formatted ZIP code
   */
  public zipCodeFormatter(zip: IZipCodeDto | null): string {
    return zip ? `${zip?.zipCode}, ${zip?.name}` : '';
  }

  /**
   * Build Http Params
   * @description Build Http Params
   * @param {object} options - The options object
   * @param {string} [options.name] - The sortBy
   * @param {string} [options.businessId] - The search
   * @returns {HttpParams} - Http Params
   */
  public buildHttpParams(options: {
    name?: string;
    businessId?: string;
  }): HttpParams {
    let params = new HttpParams();

    if (options?.name) {
      params = params.set('name', options.name);
    }
    if (options?.businessId) {
      params = params.set('businessId', options.businessId);
    }

    return params;
  }

  /**
   * Converts a locale date string from Angular Material DatePicker into a UTC Date object
   * representing the same day.
   * @param {string | null} localeDateString - The date string in the user's locale (e.g., "01/15/2025").
   * @returns {Date} - A UTC Date object representing the same day.
   * @throws Error if the input date string is invalid.
   */
  public toUtcSameDay(localeDateString?: string | null): Date {
    if (!localeDateString) {
      const now = new Date();
      return new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
      );
    }

    const parsedDate = new Date(localeDateString);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new TypeError('Invalid date string format');
    }

    // Extract year, month, and day from the parsed date
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth(); // Zero-based
    const day = parsedDate.getDate();

    // Create a new Date object in UTC for the same day
    return new Date(Date.UTC(year, month, day));
  }
}
