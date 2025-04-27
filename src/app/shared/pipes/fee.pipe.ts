import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

/**
 *
 */
@Pipe({ name: 'feeMoney' })
export class FeeMoney implements PipeTransform {
  /**
   * This method is used to transform the medic type to fee.
   * @returns {number} - The fee.
   */
  public transform(): number {
    const today = DateTime.now();
    const earlyRegistrationEnd = DateTime.fromISO('2024-05-01');
    const lateRegistrationEnd = DateTime.fromISO('2024-05-20');

    if (today < earlyRegistrationEnd) {
      return 50;
    } else if (today < lateRegistrationEnd) {
      return 70;
    } else {
      return 70;
    }
  }
}
