import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

/**
 * Type alias for date input.
 */
type DateInput = Date | string | null;

/**
 * This pipe is used to format the date of the food.
 */
@Pipe({ name: 'foodDates' })
export class FoodDates implements PipeTransform {
  /**
   * This method is used to transform the date of the food.
   * @param {DateInput} date - The date of the food.
   * @returns {string} - The formatted date of the food.
   */
  public transform(date: DateInput): string {
    if (!date) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString());
    return `${newDate.toFormat('dd')} ${newDate.toFormat('DD')}.${newDate.toFormat('MM')}.`;
  }
}
