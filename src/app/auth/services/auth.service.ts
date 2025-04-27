import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAuthResponse,
  ILoginFormData,
  IPostResponse,
  IRefreshTokenResponse,
  IResetPasswordData,
} from '@auth/interfaces/auth.type';
import { BYPASS_REFRESH_STRATEGY } from '@app/core/interceptors/http-request.interceptor';
import { environment } from '@env';

/**
 * This service is used to handle the authentication.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  //IN AUTH

  /**
   * This method is used to login the user.
   * @param {ILoginFormData} data - The login data.
   * @returns {Observable<IAuthResponse>} - The response.
   */
  public loginUser(data: ILoginFormData): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(
      environment.baseUrl + '/auth/login',
      data,
      {
        context: new HttpContext().set(BYPASS_REFRESH_STRATEGY, true),
      },
    );
  }

  /**
   * This method is used to register the user.
   * @param {string} email - The email.
   * @returns {Observable<IPostResponse>} - The response.
   */
  public newPassword(email: string): Observable<IPostResponse> {
    return this.httpClient.post<IPostResponse>(
      environment.baseUrl + '/auth/reset-password/request',
      { email: email },
    );
  }

  /**
   * This method is used to reset the password.
   * @param {IResetPasswordData} data - The reset password data.
   * @returns {Observable<IPostResponse>} - The response.
   */
  public resetPassword(data: IResetPasswordData): Observable<IPostResponse> {
    return this.httpClient.post<IPostResponse>(
      environment.baseUrl + '/auth/reset-password/new-password',
      data,
    );
  }

  /**
   * This method is used to logout the user.
   * @param {string} refreshToken - The refresh token.
   * @returns {Observable<IAuthResponse>} - The response.
   */
  public logout(refreshToken: string): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(
      environment.baseUrl + '/auth/logout',
      { refreshToken: refreshToken },
      {
        context: new HttpContext().set(BYPASS_REFRESH_STRATEGY, true),
      },
    );
  }

  /**
   * This method is used to refresh the token.
   * @param {string} refreshToken - The refresh token.
   * @returns {Observable<IRefreshTokenResponse>} - The response.
   */
  public performTokenRefresh(
    refreshToken: string,
  ): Observable<IRefreshTokenResponse> {
    return this.httpClient.post<IRefreshTokenResponse>(
      environment.baseUrl + '/auth/refresh-token',
      {
        refreshToken: refreshToken,
      },
    );
  }
}
