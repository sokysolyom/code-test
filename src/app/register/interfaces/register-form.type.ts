import { FormControl } from '@angular/forms';

export interface IPersonalDataFormControl {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  telephone: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  gender: FormControl<string | null>;
  street: FormControl<string | null>;
  streetNumber: FormControl<string | null>;
  zipCode: FormControl<string | null>;
}

export interface IPasswordFormControl {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

export interface IWorkDataFormControl {
  chamberId: FormControl<string | null>;
  workplaceFullName: FormControl<string | null>;
  workplaceStreet: FormControl<string | null>;
  workplaceStreetNumber: FormControl<string | null>;
  workplaceZipCode: FormControl<string | null>;
  medicTypeId: FormControl<string | null>;
  medicalExpertise: FormControl<string | null>;
}

export interface IAgreementFormControl {
  acreditedInformationAgreement: FormControl<boolean | null>;
  realDataAgreement: FormControl<boolean | null>;
  personalDataAgreement: FormControl<boolean | null>;
  termsAgreement: FormControl<boolean | null>;
  newsletterAgreement: FormControl<boolean | null>;
}

export interface ILegalPersonFormControl {
  country: FormControl<string | null>;
  name: FormControl<string | null>;
  businessId: FormControl<string | null>;
  street: FormControl<string | null>;
  streetNumber: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  city: FormControl<string | null>;
  taxId: FormControl<string | null>;
  vat: FormControl<string | null>;
  registrationOffice: FormControl<string | null>;
  registrationNumber: FormControl<string | null>;
}
