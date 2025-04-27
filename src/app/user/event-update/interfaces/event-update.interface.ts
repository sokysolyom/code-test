import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface IFilesTableData {
  id: string;
  name: string;
  type: string;
}

export interface IFeesTableData {
  name: string;
  fee: number;
}

export interface IAbstractTextFormControl {
  introduction: FormControl<string | null>;
  target: FormControl<string | null>;
  methodology: FormControl<string | null>;
  results: FormControl<string | null>;
  conclusion: FormControl<string | null>;
}

export interface IAbstractFormControl {
  conflicts: FormControl<string | null>;
  keyword1: FormControl<string | null>;
  keyword2: FormControl<string | null>;
  keyword3: FormControl<string | null>;
  keyword4: FormControl<string | null>;
  keyword5: FormControl<string | null>;
  coauthors: FormArray<FormGroup<ICoauthorsFormControl>>;
}

export interface ICoauthorsFormControl {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  workplaceFullName: FormControl<string | null>;
}

export interface IVerifyEmailFormControl {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
}

export interface IAbstractDialogData {
  title: string;
  introduction: string;
  target: string;
  methodology: string;
  results: string;
  conclusion: string;
  conflicts: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  keyword4: string;
  keyword5: string;
  coauthors: ICoauthors[];
}

interface ICoauthors {
  firstName: string;
  lastName: string;
  workplaceFullName: string;
}

export interface IConfirmationNDocsTableData {
  id: string;
  name: string;
  state: string;
  type: string;
}

export interface ISelectOption {
  value: string;
  viewValue: string;
}

export interface IAbstractResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  title: string;
  introduction: string;
  target: string;
  methodology: string;
  results: string;
  conclusion: string;
  conflicts: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  keyword4: string;
  keyword5: string;
  coauthors: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      firstName: string;
      lastName: string;
      workplaceFullName: string;
    },
  ];
}

export interface ISubmissionResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  type: string;
}

export interface IParticipationResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isParticipationActive: boolean;
}

export interface IParticipationData {
  isParticipationActive: boolean;
}

export interface IAccommodationResponse {
  id: string;
  preferredRoommate: string | null;
  roomGroup: {
    id: string;
    name: string;
    date: string; // ISO string for the date
    retailPrice: string;
    isIncludedInRegistrationFee: boolean;
    hotel: {
      id: string;
      name: string;
      accommodationStartDate: string; // ISO string for the start date
      accommodationEndDate: string;
    };
  };
}

export interface IMealsResponse {
  id: string;
  meal: {
    id: string;
    name: string;
    date: string; // ISO string for the date
    retailPrice: string;
    isIncludedInRegistrationFee: boolean;
    isIncludedInAccommodationPrice: boolean;
    hotel: {
      id: string;
      name: string;
      accommodationStartDate: string;
      accommodationEndDate: string;
    };
  };
}

export interface IAccommodaitionVIewData {
  hotel: string;
  preferredRoommate: string | null;
  allDays: boolean;
  startDate: string;
  endDate: string;
  roomGroups: {
    date: string;
    retailPrice: string;
    isIncludedInRegistrationFee: boolean;
    day: number;
  }[];
}

export interface IMealsViewData {
  date: string;
  name: string;
  retailPrice: string;
  isIncludedInAccommodationPrice: boolean;
  isIncludedInRegistrationFee: boolean;
  day: number;
}
