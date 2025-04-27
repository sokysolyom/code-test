export interface IZipCodeDto {
  id: string;
  zipCode: string;
  name: string;
  district: string;
}

export interface ITitleName {
  id: string;
  officialTitle: string;
  shortTitle: string;
  note: string;
  validFrom: string;
}

export interface IMedicType {
  id: string;
  code: string;
  abbreviation: string;
  name: string;
}

export interface IPartnerRegister {
  email: string;
  password: string;
  uniqueCode: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  id: string;
  role: string;
}

export interface IAuthQueryParams {
  email: string;
  token: string;
}

export interface IParticipantRegisterData {
  email: string;
  password: string;
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
  isInformedAboutEvents: boolean;
  isSubscribedToNewsletter: boolean;
  hasAffidavit: boolean;
  hasConsentedToDataProcessing: boolean;
  hasAcceptedTerms: boolean;
  medicTypeId: string;
  medicalExpertiseId: string;
  chamberId: string;
  canPrescribeMedications: boolean;
  workplaceFullName: string;
  workplaceStreet: string;
  workplaceStreetNumber: string;
  workplaceZipCode: string;
}

export interface IRepresentativeRegisterData {
  email: string;
  password: string;
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
  isInformedAboutEvents: boolean;
  isSubscribedToNewsletter: boolean;
  hasAffidavit: boolean;
  hasConsentedToDataProcessing: boolean;
  hasAcceptedTerms: boolean;
  role: string;
  legalPerson: {
    name: string;
    businessId: string;
    taxId: string;
    vat: string;
    street: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    registrationOffice: string;
    registrationNumber: string;
  };
}

export interface IFinishRegistrationData {
  email: string;
  registrationToken: string;
  newPassword: string;
}

export interface ILegalPersonFromApiDto {
  id: number;
  cin: string;
  tin: number;
  vatin: string;
  name: string;
  formatted_address: string;
  street: string;
  reg_number: number;
  building_number: string;
  street_number: string;
  formatted_street: string;
  postal_code: string;
  municipality: string;
  country: string;
  established_on: string;
  terminated_on: string;
  vatin_paragraph: string;
  registration_office: string;
  registration_number: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  main_corporate_body: any;
  updated_at: string;
  legal_form: string;
  main_economic_activity: {
    code: string;
    name: string;
  };
  statutory_bodies: IStatutory[];
  statutory: IStatutory[];
  datahub_corporate_body: {
    id: number;
    url: string;
  };
}

export interface IStatutory {
  type: string;
  first_name: string;
  last_name: string;
  prefixes: string;
  postfixes: string;
  formatted_name: string;
  street: string;
  reg_number: string;
  building_number: string;
  postal_code: string;
  municipality: string;
  country: string;
}

export interface IPostResponse {
  statusCode: number;
  message: string;
}

export interface ISubjectResponse {
  name: string;
  businessId: string;
  street?: string;
  streetNumber?: string;
  orientationNumber?: string;
  zipCode?: string;
  city?: string;
  taxId?: string;
  vat?: string;
  registrationOffice?: string;
  registrationNumber?: string;
}

export interface ICountries {
  id: string;
  fifa: string;
  dial: string;
  ISO3166_1_Alpha_2: string;
  currencyName: string;
  currencyCode: string;
  officialName: string;
  officialNameSk: string;
  regionName: string;
  capital: string;
  continent: string;
  tld: string;
  languages: string;
  displayName: string;
  flag: string;
}
