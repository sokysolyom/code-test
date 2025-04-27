import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { IPostResponse } from '@auth/interfaces/auth.type';
import {
  IChangePasswordData,
  IMarketingStatementsData,
  IUserInfoPutData,
  IUserInfoResponse,
  IWorkData,
  IWorkDataPut,
} from '../interfaces/profile-personal-statements.interface';
import { IProfileRepresentativeWorkForm } from '../interfaces/profile-representative-work-form.interface';

/**
 * This service is used to handle the event register.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);

  /**
   * This method is used to register the user to the event.
   * @param {IChangePasswordData} data - The login data.
   * @returns {Observable<IPostResponse>} - The response.
   */
  public changePassword(data: IChangePasswordData): Observable<IPostResponse> {
    return this.httpClient.post<IPostResponse>(
      environment.baseUrl + '/auth/change-password',
      data,
    );
  }

  /**
   * This method is used to get the user info.
   * @returns {Observable<IUserInfoResponse>} - The response.
   */
  public info(): Observable<IUserInfoResponse> {
    return this.httpClient.get<IUserInfoResponse>(
      environment.baseUrl + '/users-infos/personal',
    );
  }

  /**
   * This method is used to put the user info.
   * @param {IUserInfoPutData} data - The user info data.
   * @returns {Observable<IUserInfoResponse>} - The response.
   */
  public putInfo(data: IUserInfoPutData): Observable<IUserInfoResponse> {
    return this.httpClient.put<IUserInfoResponse>(
      environment.baseUrl + '/users-infos/personal',
      data,
    );
  }

  /**
   * This method is used to get the marketing statements.
   * @returns {Observable<IMarketingStatementsData>} - The response.
   */
  public marketingStatements(): Observable<IMarketingStatementsData> {
    return this.httpClient.get<IMarketingStatementsData>(
      environment.baseUrl + '/users-infos/marketing',
    );
  }

  /**
   * This method is used to put the marketing statements.
   * @param {IMarketingStatementsData} data - The marketing data.
   * @returns {Observable<IMarketingStatementsData>} - The response.
   */
  public putMarketingStatements(
    data: IMarketingStatementsData,
  ): Observable<IMarketingStatementsData> {
    return this.httpClient.put<IMarketingStatementsData>(
      environment.baseUrl + '/users-infos/marketing',
      data,
    );
  }

  /**
   * This method is used to get the work data.
   * @returns {Observable<IWorkData>} - The response.
   */
  public workData(): Observable<IWorkData> {
    return this.httpClient.get<IWorkData>(
      environment.baseUrl + '/healthcare-professionals/work-data',
    );
  }

  /**
   * This method is used to put the work data.
   * @param {IWorkDataPut} data - The work data.
   * @returns {Observable<IWorkData>} - The response.
   */
  public putWorkData(data: IWorkDataPut): Observable<IWorkData> {
    return this.httpClient.put<IWorkData>(
      environment.baseUrl + '/healthcare-professionals/work-data',
      data,
    );
  }

  /**
   * This method is used to get the work data for representative.
   * @returns {Observable<IProfileRepresentativeWorkForm>} - The response.
   */
  public workDataRepresentative(): Observable<IProfileRepresentativeWorkForm> {
    return this.httpClient.get<IProfileRepresentativeWorkForm>(
      environment.baseUrl + '/representatives/work-data',
    );
  }

  /**
   * This method is used to get the work data.
   * @param {string} userId - The user id.
   * @returns {Observable<IWorkData>} - The response.
   */
  public workDataByPartner(userId: string): Observable<IWorkData> {
    return this.httpClient.get<IWorkData>(
      environment.baseUrl +
        `/healthcare-professionals/work-data/by-partner/${userId}`,
    );
  }

  /**
   * This method is used to get the work data for representative.
   * @param {string} userId - The user id.
   * @returns {Observable<IProfileRepresentativeWorkForm>} - The response.
   */
  public workDataRepresentativeByPartner(
    userId: string,
  ): Observable<IProfileRepresentativeWorkForm> {
    return this.httpClient.get<IProfileRepresentativeWorkForm>(
      environment.baseUrl + `/representatives/work-data/by-partner/${userId}`,
    );
  }
}
