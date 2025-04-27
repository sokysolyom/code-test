import { createReducer, on } from '@ngrx/store';
import { IAbstractDialogData } from '@app/user/event-update/interfaces/event-update.interface';
import {
  postEventRegisterAccommodationData,
  postEventregisterAccommodationIsChecked,
  postEventRegisterAccommodationSettings,
  postEventRegisterEvent,
  postEventRegisterParticipantData,
  postEventRegisterParticipationData,
  postEventRegisterPayerData,
  postEventRegisterPaymentData,
  postEventRegisterRegistrationSettings,
  postEventRegisterSubmissionSettings,
  postEventRegisterWorkplaceData,
  postEvetnRegisterEventLegalPersonId,
  postEvetnRegisterPaymentRegistrationFee,
  resetEventRegister,
} from './event-register.actions';

export interface IEventRegisterState {
  event: IEventRegisterEventState;
  payer: IEventRegisterPayerState;
  participation: IEventRegisterParticipationState;
  accommodation: IEventRegisterAccommodationState;
  payment: IEventRegisterPaymentState;
  participant: IParticipantState;
  workplace: IWorkplaceState;
  registrationSettings: IRegistrationSettings;
  submissionSettings: ISubmissionSettings;
  accommodationSettings: IAccommodationSettings;
}

export interface IEventRegisterEventState {
  id: string;
  name: string;
  legalPersonId?: string;
}

export interface IEventRegisterPayerState {
  vipCode: string | null;
  subjectId: string | null;
  isChecked: boolean;
}

export interface IEventRegisterParticipationState {
  isParticipation: boolean;
  files?: IEventRegisterFiles[];
  abstracts?: IAbstractDialogData[];
  isChecked: boolean;
}

export interface IEventRegisterAccommodationState {
  accommodation?: {
    nights: {
      id: string;
      date: string;
      day: number;
      retailPrice: number;
    }[];
    hotel: {
      id: string;
      name: string;
    };
    preferedRoommate: string;
  };
  meal?: {
    id: string;
    name: string;
    date: string;
    day: number;
    retailPrice: number;
    isIncludedInRegistrationFee: boolean;
  }[];
  isChecked: boolean;
  accommodationPrice: number;
  mealsPrice: number;
}

export interface IEventRegisterPaymentState {
  paymentMethod: string;
  registrationFee?: number | null;
  isChecked: boolean;
}

export interface IEventRegisterFiles {
  fileName: string;
  fileType: string;
  file: File;
}

export interface IParticipantState {
  email: string;
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

export interface IWorkplaceState {
  chamberId: string;
  workplaceFullName: string;
  workplaceStreet: string;
  workplaceStreetNumber: string;
  workplaceZipCode: string;
  medicType: {
    id: string;
    name: string;
    abbreviation: string;
  };
  medicalExpertise: {
    id: string;
    name: string;
    abbreviation: string;
  };
  canPrescribeMedications: boolean;
  isInformedAboutEvents: boolean;
  isSubscribedToNewsletter: boolean;
  hasAffidavit: boolean;
  hasConsentedToDataProcessing: boolean;
  hasAcceptedTerms: boolean;
}

export interface IRegistrationSettings {
  isPaid: boolean;
}

export interface ISubmissionSettings {
  isActiveParticipationEnabled: boolean;
  isAbstractUploadEnabled: boolean;
  isPresentationUploadEnabled: boolean;
  isPosterUploadEnabled: boolean;
  isOtherFilesUploadEnabled: boolean;
}

export interface IAccommodationSettings {
  hasAccommodation: boolean;
}

export const initialState: IEventRegisterState = {
  event: {
    id: '',
    name: '',
    legalPersonId: '',
  },
  payer: {
    vipCode: null,
    subjectId: null,
    isChecked: false,
  },
  participation: {
    isParticipation: false,
    isChecked: false,
  },
  accommodation: {
    accommodation: {
      nights: [],
      hotel: {
        id: '',
        name: '',
      },
      preferedRoommate: '',
    },
    meal: [],
    isChecked: false,
    accommodationPrice: 0,
    mealsPrice: 0,
  },
  payment: {
    paymentMethod: '',
    registrationFee: 0,
    isChecked: false,
  },
  participant: {
    email: '',
    titlesBeforeName: '',
    firstName: '',
    lastName: '',
    titlesAfterName: '',
    birthDate: new Date(),
    sex: '',
    phoneNumber: '',
    street: '',
    streetNumber: '',
    zipCode: '',
  },
  workplace: {
    chamberId: '',
    workplaceFullName: '',
    workplaceStreet: '',
    workplaceStreetNumber: '',
    workplaceZipCode: '',
    medicType: {
      id: '',
      name: '',
      abbreviation: '',
    },
    medicalExpertise: {
      id: '',
      name: '',
      abbreviation: '',
    },
    canPrescribeMedications: false,
    isInformedAboutEvents: false,
    isSubscribedToNewsletter: false,
    hasAffidavit: false,
    hasConsentedToDataProcessing: false,
    hasAcceptedTerms: false,
  },
  registrationSettings: {
    isPaid: false,
  },
  submissionSettings: {
    isActiveParticipationEnabled: false,
    isAbstractUploadEnabled: false,
    isPresentationUploadEnabled: false,
    isPosterUploadEnabled: false,
    isOtherFilesUploadEnabled: false,
  },
  accommodationSettings: {
    hasAccommodation: false,
  },
};

export const eventRegisterReducers = createReducer(
  initialState,
  on(postEventRegisterPayerData, (state, { content }) => ({
    ...state,
    payer: content,
  })),
  on(postEventRegisterParticipationData, (state, { content }) => ({
    ...state,
    participation: content,
  })),
  on(postEventRegisterAccommodationData, (state, { content }) => ({
    ...state,
    accommodation: content,
  })),
  on(postEventRegisterPaymentData, (state, { content }) => ({
    ...state,
    payment: content,
  })),
  on(postEventRegisterEvent, (state, { content }) => ({
    ...state,
    event: content,
  })),
  on(postEventRegisterParticipantData, (state, { content }) => ({
    ...state,
    participant: content,
  })),
  on(postEventRegisterWorkplaceData, (state, { content }) => ({
    ...state,
    workplace: content,
  })),
  on(postEventRegisterSubmissionSettings, (state, { content }) => ({
    ...state,
    submissionSettings: content,
  })),
  on(postEventRegisterRegistrationSettings, (state, { content }) => ({
    ...state,
    registrationSettings: content,
  })),
  on(postEventRegisterAccommodationSettings, (state, { content }) => ({
    ...state,
    accommodationSettings: content,
  })),
  on(postEvetnRegisterEventLegalPersonId, (state, { legalPersonId }) => ({
    ...state,
    event: {
      ...state.event,
      legalPersonId,
    },
  })),
  on(postEventregisterAccommodationIsChecked, (state, { isChecked }) => ({
    ...state,
    accommodation: {
      ...state.accommodation,
      isChecked: isChecked,
    },
  })),
  on(postEvetnRegisterPaymentRegistrationFee, (state, { registrationFee }) => ({
    ...state,
    payment: {
      ...state.payment,
      registrationFee,
    },
  })),
  on(resetEventRegister, () => initialState),
);
