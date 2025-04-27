export interface IEventUpdateRepresentativeManagementData {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  numberOfRepresentatives: number;
  numberOfHealthcareProfessionals: number;
  isRegistrationUnderPartnerAllowed: boolean;
  isBulkRegistrationAllowed: boolean;
  shouldGenerateInvoice: boolean;
  legalPerson: ILegalPerson;
  externalSubjectLegalPerson: ILegalPerson;
  partnerMeals: IPartnerMeal[];
  partnerRoomGroups: IPartnerRoomGroup[];
  representatives: IRepresentative[];
  healthcareProfessionals: IHealthcareProfessional[];
}

export interface ILegalPerson {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  businessId: string;
}

export interface IPartnerMeal {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  numberAssigned: number;
  numberBooked: number;
  meal: IMeal;
}

export interface IMeal {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  date: string;
  numberOfPortions: number;
  numberBooked: number;
  categories: ICategory[];
  hotelName: string;
}

export interface ICategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  participantType: string; // e.g., "Zdravotnícky pracovník"
}

export interface IPartnerRoomGroup {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  numberAssigned: number;
  numberBooked: number;
  roomGroup: IRoomGroup;
}

export interface IRoomGroup {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  date: string;
  numberOfBeds: number;
  numberOfRooms: number;
  numberBooked: number;
  categories: ICategory[];
  hotelName: string;
}

export interface IRepresentative {
  id: string;
  email: string;
  titlesBeforeName: string;
  firstName: string;
  lastName: string;
  titlesAfterName: string;
  birthDate: string;
}

export interface IHealthcareProfessional {
  id: string;
  email: string;
  titlesBeforeName: string;
  firstName: string;
  lastName: string;
  titlesAfterName: string;
  birthDate: string;
}
