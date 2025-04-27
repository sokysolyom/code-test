import { createReducer, on } from '@ngrx/store';
import { postPartnersData, removePartnersData } from './partners.action';

export interface IPartnersState {
  partners: IPartnerObject[];
}

export interface IPartnerObject {
  id: string;
  name: string;
  businessId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  partnerId: string;
}

export const initialState: IPartnersState = {
  partners: [],
};

export const partnersReducers = createReducer(
  initialState,
  on(postPartnersData, (state, { content }) => ({
    ...state,
    partners: content.partners,
  })),
  on(removePartnersData, state => ({
    ...state,
    partners: [],
  })),
);
