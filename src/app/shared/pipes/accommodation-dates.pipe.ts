import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

/**
 * Type alias for date input.
 */
type DateInput = Date | string | null;

/**
 * This pipe is used to format the date of the accommodation.
 */
@Pipe({ name: 'accommodationDates' })
export class AccommodationDates implements PipeTransform {
  /**
   * This method is used to transform the date of the food.
   * @param {DateInput} date - The date of the food.
   * @returns {string} - The formatted date of the food.
   */
  public transform(date: DateInput): string {
    if (date === null) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString(), { locale: 'sk' });
    const nextDay = newDate.plus({ days: 1 });

    // Format the date using Luxon's toFormat method
    return `${newDate.toFormat('ccc dd')}. - ${nextDay.toFormat('dd')}.${newDate.toFormat('MM')}.`;
  }
}

/**
 * Pipe to calculate the day difference between two dates.
 */
@Pipe({ name: 'dayDifference', standalone: true })
export class DayDifferencePipe implements PipeTransform {
  /**
   * Transforms two dates into the day count (e.g., 1, 2, 3...).
   * @param {string | Date | undefined} startDate - The start date.
   * @param {string | Date | undefined} endDate - The end date.
   * @returns {number} The calculated day difference as a positive number.
   */
  public transform(
    startDate: string | Date | undefined,
    endDate: string | Date | undefined,
  ): number {
    if (!startDate || !endDate) {
      return 0; // Return 0 if either date is missing
    }

    const parsedStartDate = DateTime.fromISO(startDate.toString());
    const parsedEndDate = DateTime.fromISO(endDate.toString());

    if (!parsedStartDate.isValid || !parsedEndDate.isValid) {
      return 0; // Return 0 if parsing fails
    }

    // Calculate the difference in days, inclusive
    const difference = parsedEndDate.diff(parsedStartDate, 'days').days + 1;

    return Math.max(0, Math.ceil(difference)); // Ensure the result is at least 0
  }
}

/**
 * Pipe to format a date with time.
 */
@Pipe({
  name: 'dateFormatWithTime',
  standalone: true,
})
export class DateFormatWithTimePipe implements PipeTransform {
  /**
   * Transforms a date into a formatted string with time.
   * @param {string | Date} value - The date to format.
   * @returns {string} The formatted date with time.
   */
  public transform(value: string | Date): string {
    if (!value) return '';

    // Use Luxon (or native Date) to parse the date
    const date = DateTime.fromISO(value.toString());

    // Return the formatted date
    return `${date.day}.${date.toFormat('MM')}.${date.year} o ${date.toFormat('HH:mm')}`;
  }
}

/**
 * This pipe is used to format the date of the meals.
 */
@Pipe({ name: 'mealDates', standalone: true })
export class MealDatesPipe implements PipeTransform {
  /**
   * This method is used to transform the date of the food.
   * @param {DateInput} date - The date of the food.
   * @returns {string} - The formatted date of the food.
   */
  public transform(date: DateInput): string {
    if (date === null) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString(), { locale: 'sk' });

    // Format the date using Luxon's toFormat method
    return `${newDate.toFormat('dd')}.${newDate.toFormat('MM')}.`;
  }
}
