import { createReducer, on } from '@ngrx/store';
import {
  postEventDetails,
  removeEventDetails,
  updateActiveDropDown,
  updateEventHashtag,
  updateEventId,
  updateEventName,
  updateIsAuthed,
  updateIsDataChanged,
  updateNavbarVisibility,
  updateSidenavVisibility,
} from './event.action';

export interface IEventState {
  navbarVisible: boolean;
  sidenavOpen: boolean;
  name: string;
  hashtag: string;
  eventId: string;
  activeDropDown: boolean;
  isAuthed: boolean;
  isDataChanged: boolean;
}

export const initialState: IEventState = {
  navbarVisible: window.innerWidth > 959,
  sidenavOpen: false,
  name: '',
  hashtag: '',
  eventId: '',
  activeDropDown: false,
  isAuthed: false,
  isDataChanged: false,
};

export const eventReducers = createReducer(
  initialState,
  on(postEventDetails, (state, { content }) => ({
    ...state,
    navbarVisible: content.navbarVisible,
    sidenavOpen: content.sidenavOpen,
    name: content.name,
    hashtag: content.hashtag,
    eventId: content.eventId,
    activeDropDown: content.activeDropDown,
    isAuthed: content.isAuthed,
    isDataChanged: content.isDataChanged,
  })),
  on(updateNavbarVisibility, (state, { content }) => ({
    ...state,
    navbarVisible: content,
  })),
  on(updateSidenavVisibility, (state, { content }) => ({
    ...state,
    sidenavOpen: content,
  })),
  on(updateEventName, (state, { content }) => ({
    ...state,
    name: content,
  })),
  on(updateEventHashtag, (state, { content }) => ({
    ...state,
    hashtag: content,
  })),
  on(updateEventId, (state, { content }) => ({
    ...state,
    eventId: content,
  })),
  on(updateActiveDropDown, (state, { content }) => ({
    ...state,
    activeDropDown: content,
  })),
  on(updateIsAuthed, (state, { content }) => ({
    ...state,
    isAuthed: content,
  })),
  on(updateIsDataChanged, (state, { content }) => ({
    ...state,
    isDataChanged: content,
  })),
  on(removeEventDetails, state => ({
    ...state,
    navbarVisible: window.innerWidth > 959,
    sidenavOpen: false,
    name: '',
    hashtag: '',
    eventId: '',
  })),
);
