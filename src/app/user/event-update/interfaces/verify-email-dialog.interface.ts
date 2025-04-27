export interface IValidateUserData {
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
}

export interface IVerifyEmailDialogResponse {
  email: string;
  isRegistered: boolean;
  authId: string;
}
