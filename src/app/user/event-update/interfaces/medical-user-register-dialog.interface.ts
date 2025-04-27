export interface IHealthcareProfessionalDialogData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  titlesBeforeName: string;
  titlesAfterName: string;
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
