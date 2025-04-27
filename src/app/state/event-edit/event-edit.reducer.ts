import { createReducer, on } from '@ngrx/store';
import {
  IAccommodationSettings,
  IRegistrationSettings,
  ISubmissionSettings,
} from '../event-register/event-register.reducer';
import {
  postAccommodationSettings,
  postEventEditData,
  postEventIdData,
  postRegistrationSettings,
  postSubmissionSettings,
  removeEventEditData,
} from './event-edit.actions';

export interface IEventEdiState {
  id: string;
  name: string;
  partnerId?: string | null;
  registrationSettings?: IRegistrationSettings | null;
  submissionSettings?: ISubmissionSettings | null;
  accommodationSettings?: IAccommodationSettings | null;
}

export const initialState: IEventEdiState = {
  id: '',
  name: '',
  partnerId: null,
  registrationSettings: null,
  submissionSettings: null,
  accommodationSettings: null,
};

export const eventEditReducers = createReducer(
  initialState,
  on(postEventEditData, (state, { content }) => ({
    ...state,
    id: content.id,
    name: content.name,
    partnerId: content.partnerId,
  })),
  on(postEventIdData, (state, { id }) => ({
    ...state,
    id,
  })),
  on(postRegistrationSettings, (state, { registrationSettings }) => ({
    ...state,
    registrationSettings,
  })),
  on(postSubmissionSettings, (state, { submissionSettings }) => ({
    ...state,
    submissionSettings,
  })),
  on(postAccommodationSettings, (state, { accommodationSettings }) => ({
    ...state,
    accommodationSettings,
  })),
  on(removeEventEditData, state => ({
    ...state,
    id: '',
    name: '',
    partnerId: null,
  })),
);
