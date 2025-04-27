import {
  IAccommodationResponse,
  IMealsResponse,
} from './event-update.interface';

export interface IOrderedServicesTable {
  role: string;
  orderedNumber: number;
  registeredNumber: number;
  isBulkRegistrationAllowed?: boolean;
  accommodation: IAccommodationNumbers[];
  meals: IMealsNumbers[];
}

interface IAccommodationNumbers extends IAccommodationResponse {
  orderedNumber: number;
  registeredNumber: number;
}

interface IMealsNumbers extends IMealsResponse {
  orderedNumber: number;
  registeredNumber: number;
}
