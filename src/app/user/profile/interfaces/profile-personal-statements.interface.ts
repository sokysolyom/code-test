import { FormControl } from '@angular/forms';

export interface IPersonalStatements {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  gender: FormControl<string | null>;
  street: FormControl<string | null>;
  streetNumber: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  email: FormControl<string | null>;
  telephone: FormControl<string | null>;
}

export interface ISelectOption {
  value: string;
  viewValue: string;
}

export interface IMarketingStatements {
  inform: FormControl<boolean | null>;
  newsletter: FormControl<boolean | null>;
}

export interface IWorkplaceStatements {
  chamberId: FormControl<string | null>;
  workplaceFullName: FormControl<string | null>;
  workplaceStreet: FormControl<string | null>;
  workplaceStreetNumber: FormControl<string | null>;
  workplaceZipCode: FormControl<string | null>;
  medicTypeId: FormControl<string | null>;
  medicalExpertise: FormControl<IMedicalExpertise | null>;
  canPrescribeMedication: FormControl<boolean | null>;
}

export interface IChangePassword {
  oldPassword: FormControl<string | null>;
  newPassword: FormControl<string | null>;
  newPasswordConfirm: FormControl<string | null>;
}

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface IUserInfoResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  email: string;
  titlesBeforeName: string;
  firstName: string;
  lastName: string;
  titlesAfterName: string;
  birthDate: string;
  sex: string;
  phoneNumber: string;
  street: string;
  streetNumber: string;
  zipCode: string;
}

export interface IUserInfoPutData {
  titlesBeforeName: string;
  firstName: string;
  lastName: string;
  titlesAfterName: string;
  birthDate: Date;
  sex: string;
  phoneNumber: string;
  street: string;
  streetNumber: string;
  zipCode: string;
}

export interface IMarketingStatementsData {
  isInformedAboutEvents: boolean;
  isSubscribedToNewsletter: boolean;
}

export interface IWorkData {
  medicType: {
    id: string;
    code: string;
    abbreviation: string;
    name: string;
  };
  medicalExpertise: IMedicalExpertise;
  chamberId: string;
  canPrescribeMedications: true;
  workplaceFullName: string;
  workplaceStreet: string;
  workplaceStreetNumber: string;
  workplaceZipCode: string;
}

export interface IMedicalExpertise {
  id: string;
  code: string;
  abbreviation: string;
  name: string;
}

export interface IWorkDataPut {
  medicTypeId: string;
  medicalExpertiseId: string;
  chamberId: string;
  canPrescribeMedications: boolean;
  workplaceFullName: string;
  workplaceStreet: string;
  workplaceStreetNumber: string;
  workplaceZipCode: string;
}
