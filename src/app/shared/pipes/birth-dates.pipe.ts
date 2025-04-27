import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { EventForm } from '../enums/event-form.enum';

/**
 * Type alias for date input.
 */
type DateInput = Date | string | null;

/**
 * This pipe is used to format the date of the food.
 */
@Pipe({ name: 'birthDates', standalone: true })
export class BirthDates implements PipeTransform {
  /**
   * This method is used to transform the date of the food.
   * @param {DateInput} date - The date of the food.
   * @returns {string} - The formatted date of the food.
   */
  public transform(date: string | undefined): string {
    if (date === undefined || date == null) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString(), { locale: 'sk' });
    return `${newDate.toFormat('dd')}. ${newDate.toFormat('MM')}. ${newDate.year}`;
  }
}

/**
 * This pipe is used to format a birth date from a Date object or a date string.
 */
@Pipe({ name: 'birthDatesJs', standalone: true })
export class BirthDatesJs implements PipeTransform {
  /**
   * This method is used to transform the birth date from a Date object or a date string.
   * @param {Date | string | null | undefined} date - The birth date as a Date object or string.
   * @returns {string} - The formatted birth date.
   */
  public transform(date: Date | string | undefined | null): string {
    if (!date) {
      return '';
    }
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    const newDate = DateTime.fromJSDate(parsedDate).setLocale('sk');
    return `${newDate.toFormat('dd')}. ${newDate.toFormat('MM')}. ${newDate.year}`;
  }
}

/**
 * Pipe to extract the day from a date.
 */
@Pipe({ name: 'dayFromDate', standalone: true })
export class DayFromDate implements PipeTransform {
  /**
   * Transforms a date into a day string.
   * @param {DateInput} date - The date to format.
   * @returns {string} The formatted day string.
   */
  public transform(date: DateInput): string {
    if (!date) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString());
    return newDate.toFormat('dd');
  }
}

/**
 * Pipe to extract the days between two dates.
 */
@Pipe({ name: 'daysBetweenDates', standalone: true })
export class DaysBetweenDatesPipe implements PipeTransform {
  /**
   * Transforms two dates into the number of days between them.
   * @param {DateInput} startDate - The start date.
   * @param {DateInput} endDate - The end date.
   * @returns {string} The difference in days as a string.
   */
  public transform(startDate: DateInput, endDate: DateInput): string {
    if (!startDate || !endDate) {
      return '';
    }
    const start = DateTime.fromISO(startDate.toString());
    const end = DateTime.fromISO(endDate.toString());

    const diff = end.diff(start, 'days').days + 1;
    return diff === 1
      ? `(${Math.floor(diff).toString()} deň)`
      : `(${Math.floor(diff).toString()} dni)`;
  }
}

/**
 * Pipe to extract the month from a date.
 */
@Pipe({ name: 'monthFromDate', standalone: true })
export class MonthFromDate implements PipeTransform {
  /**
   * Transforms a date into a month string.
   * @param {DateInput} date - The date to format.
   * @returns {string} The formatted month string.
   */
  public transform(date: DateInput): string {
    if (!date) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString()).setLocale('sk'); // Set Slovak locale
    return newDate.toFormat('LLL').toUpperCase();
  }
}

/**
 * Pipe to extract the day range (day - day+1) from a date.
 */
@Pipe({ name: 'dayRangeFromDate', standalone: true })
export class DayRangeFromDatePipe implements PipeTransform {
  /**
   * Transforms a date into a day range string (day - day+1).
   * @param {string | Date | undefined} date - The input date.
   * @returns {string} The formatted day range string (e.g., "09-10").
   */
  public transform(date: DateInput): string {
    if (!date) {
      return '';
    }

    const parsedDate = DateTime.fromISO(date.toString());
    if (!parsedDate.isValid) {
      return '';
    }

    const currentDay = parsedDate.toFormat('dd');
    const nextDay = parsedDate.plus({ days: 1 }).toFormat('dd');

    return `${currentDay}-${nextDay}`;
  }
}

/**
 * Pipe to extract the month range (startMonth - endMonth) between two dates.
 */
@Pipe({ name: 'monthRangeBetweenDates', standalone: true })
export class MonthRangeBetweenDatesPipe implements PipeTransform {
  /**
   * Transforms two dates into a month range string (startMonth - endMonth).
   * @param {string | undefined} startDate - The start date.
   * @param {string | undefined} endDate - The end date.
   * @returns {string} The formatted month range string (e.g., "JAN-FEB").
   */
  public transform(
    startDate: string | undefined,
    endDate: string | undefined,
  ): string {
    if (!startDate || !endDate) {
      return '';
    }

    const parsedStartDate = DateTime.fromISO(startDate.toString());
    const parsedEndDate = DateTime.fromISO(endDate.toString());

    if (!parsedStartDate.isValid || !parsedEndDate.isValid) {
      return '';
    }

    const startMonth = parsedStartDate.toFormat('MMM').toUpperCase();
    const endMonth = parsedEndDate.toFormat('MMM').toUpperCase();

    // If the months are the same, return only one month
    if (startMonth === endMonth) {
      return startMonth;
    }

    // Otherwise, return the range
    return `${startMonth}-${endMonth}`;
  }
}

/**
 * Pipe to extract the day range (startDay - endDay) between two dates.
 */
@Pipe({ name: 'dayRangeBetweenDates', standalone: true })
export class DayRangeBetweenDatesPipe implements PipeTransform {
  /**
   * Transforms two dates into a day range string (startDay - endDay).
   * @param {string | Date | undefined} startDate - The start date.
   * @param {string | Date | undefined} endDate - The end date.
   * @returns {string} The formatted day range string (e.g., "09-12").
   */
  public transform(
    startDate: string | Date | undefined,
    endDate: string | Date | undefined,
  ): string {
    if (!startDate || !endDate) {
      return '';
    }

    const parsedStartDate = DateTime.fromISO(startDate.toString());
    const parsedEndDate = DateTime.fromISO(endDate.toString());

    if (!parsedStartDate.isValid || !parsedEndDate.isValid) {
      return '';
    }

    const startDay = parsedStartDate.toFormat('dd');
    const endDay = parsedEndDate.toFormat('dd');

    return `${startDay}-${endDay}`;
  }
}

/**
 * Pipe to extract the year from a date.
 */
@Pipe({ name: 'yearFromDate', standalone: true })
export class YearFromDate implements PipeTransform {
  /**
   * Transforms a date into a year string.
   * @param {DateInput} date - The date to format.
   * @returns {string} The formatted year string.
   */
  public transform(date: DateInput): string {
    if (!date) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString());
    return newDate.toFormat('yyyy');
  }
}

/**
 *
 */
@Pipe({ name: 'normalDate', standalone: true })
export class NormalDate implements PipeTransform {
  /**
   * This method is used to transform the date of the food.
   * @param {DateInput} date - The date of the food.
   * @returns {string} - The formatted date of the food.
   */
  public transform(date: DateInput): string {
    if (date === null) {
      return '';
    }
    const newDate = DateTime.fromISO(date.toString());
    return newDate.toFormat('dd.MM.yyyy');
  }
}

/**
 * Pipe to extract the day from
 * a date.
 */
@Pipe({ name: 'participationStatus', standalone: true })
export class ParticipationStatusPipe implements PipeTransform {
  /**
   * Transforms a date into a status string.
   * @param {string | Date} endDate - The end date to compare with the current date.
   * @returns {string} The status as "Absolvované" or "Registrovaný/á".
   */
  public transform(endDate: string | Date): string {
    if (!endDate) {
      return '';
    }

    const endDateTime = DateTime.fromISO(new Date(endDate).toISOString());
    const now = DateTime.now();

    return endDateTime < now ? 'Absolvované' : 'Registrovaný/á';
  }
}

/**
 * Enum for the event form types.
 */
@Pipe({ name: 'eventFormLabel', standalone: true })
export class EventFormLabelPipe implements PipeTransform {
  /**
   * Transforms the form key into a readable format.
   * @param {string} form - The form type as a string.
   * @returns {string} A formatted label based on the form type.
   */
  public transform(form: EventForm): string {
    switch (form) {
      case EventForm.ONLINE: {
        return 'Online';
      }
      case EventForm.PRESENT: {
        return 'Prezenčne';
      }
      case EventForm.HYBRID: {
        return 'Hybridne';
      }
      default: {
        return 'Neznáme';
      }
    }
  }
}
