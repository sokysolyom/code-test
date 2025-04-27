export interface IRegisterOutput {
  userType: number;
  direction: boolean;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  id: string;
  role: string;
}

export interface IResetPassword {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IAuthQueryParams {
  email: string;
  token: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IPostResponse {
  statusCode: number;
  message: string;
}

export interface IResetPasswordData {
  email: string;
  passwordResetToken: string;
  newPassword: string;
}

export interface IUserStateModel {
  accessToken: string;
  refreshToken: string;
  role: string;
  email: string;
  id: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}
