import {
  IAccommodationResponse,
  IMealsResponse,
} from './event-update.interface';

export interface IRegisteredUsersCustomTable {
  role: string;
  users: IPersonData[];
}

interface IPersonData {
  id: string;
  titlesBeforeName: string;
  firstName: string;
  lastName: string;
  titlesAfterName: string;
  birthDate: string;
  accommodation: IAccommodationResponse[];
  meals: IMealsResponse[];
}
