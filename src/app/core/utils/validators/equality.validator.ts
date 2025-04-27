/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * This function validates equality of two form controls
 * @author Michal Pidanic
 * @param {string} controlName Name of the first form control
 * @param {string} matchingControlName Name of the second form control
 * @returns {ValidatorFn} Validator function
 */
export const equalityValidator = (
  controlName: string,
  matchingControlName: string,
): ValidatorFn => {
  return (abstractControl: AbstractControl) => {
    const control = abstractControl.get(controlName);
    const matchingControl = abstractControl.get(matchingControlName);

    if (matchingControl!.errors && !matchingControl!.errors?.['notEqual']) {
      return null;
    }

    if (control!.value === matchingControl!.value) {
      matchingControl!.setErrors(null);
      return null;
    } else {
      const error = { notEqual: true };
      matchingControl!.setErrors(error);
      return error;
    }
  };
};
