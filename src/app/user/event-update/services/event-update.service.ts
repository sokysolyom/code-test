import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@env';
import { IPostResponse } from '@auth/interfaces/auth.type';
import {
  IAbstractDialogData,
  IAbstractResponse,
  IAccommodationResponse,
  IMealsResponse,
  IParticipationData,
  IParticipationResponse,
  ISubmissionResponse,
} from '../interfaces/event-update.interface';
import { IValidateUserData } from '../interfaces/verify-email-dialog.interface';
import { IHealthcareProfessionalDialogData } from '../interfaces/medical-user-register-dialog.interface';
import { IRepresentativeRegisterDialogData } from '../interfaces/representative-register-dialog.interface';
import { IMedicalUserRegisterEventDialogData } from '../interfaces/medical-user-register-event-dialog.interface';
import { IEventUpdateRepresentativeManagementData } from '../interfaces/event-update-representative-management.interface';

/**
 * This service is used to handle the event register.
 */
@Injectable({
  providedIn: 'root',
})
export class EventUpdateService {
  private readonly httpClient = inject(HttpClient);

  /**
   * This method is used to post the poster.
   * @param {string} eventId - The event id.
   * @param {string} abstractId - The form data.
   * @returns {Observable<IAbstractResponse>} - The response.
   */
  public getAbstractById(
    eventId: string,
    abstractId: string,
  ): Observable<IAbstractResponse> {
    return this.httpClient.get<IAbstractResponse>(
      environment.baseUrl +
        `/events/${eventId}/registrations/submissions-registrations/abstracts/${abstractId}`,
    );
  }

  /**
   * This method is used to put the abstract.
   * @param {string} eventId - The event id.
   * @param {string} abstractId - The form data.
   * @param {IAbstractDialogData} data - The data.
   * @returns {Observable<IPostResponse>} - The response.
   */
  public putAbstractById(
    eventId: string,
    abstractId: string,
    data: IAbstractDialogData,
  ): Observable<IPostResponse> {
    return this.httpClient.put<IPostResponse>(
      environment.baseUrl +
        `/events/${eventId}/registrations/submissions-registrations/abstracts/${abstractId}`,
      data,
    );
  }

  /**
   * This method is used to delete the abstract.
   * @param {string} eventId - The event id.
   * @param {string} abstractId - The form data.
   * @returns {Observable<IPostResponse>} - The response.
   */
  public deleteAbstractById(
    eventId: string,
    abstractId: string,
  ): Observable<IPostResponse> {
    return this.httpClient.delete<IPostResponse>(
      environment.baseUrl +
        `/events/${eventId}/registrations/submissions-registrations/abstracts/${abstractId}`,
    );
  }

  /**
   * This method is used to get the submissions.
   * @param {string} eventId - The event id.
   * @returns {Observable<ISubmissionResponse[]>} - The response.
   */
  public getSubmissions(eventId: string): Observable<ISubmissionResponse[]> {
    return this.httpClient.get<ISubmissionResponse[]>(
      environment.baseUrl +
        `/events/${eventId}/registrations/submissions-registrations/submissions`,
    );
  }

  /**
   * This method is used to delete the file.
   * @param {string} fileId - The file id.
   * @returns {Observable<IPostResponse>} - The response.
   */
  public deleteFile(fileId: string): Observable<IPostResponse> {
    return this.httpClient.delete<IPostResponse>(
      environment.baseUrl + `/files/${fileId}`,
    );
  }

  /**
   * This method is used to download the file.
   * @param {string} fileId - The file id.
   * @returns {Observable<Blob>} - The response.
   */
  public downloadFile(fileId: string): Observable<Blob> {
    return this.httpClient.get(
      environment.baseUrl + `/files/${fileId}/download`,
      {
        responseType: 'blob',
      },
    );
  }

  /**
   * This method is used to get the participation.
   * @param {string} eventId - The event id.
   * @returns {Observable<IParticipationResponse>} - The response.
   */
  public getParticipation(eventId: string): Observable<IParticipationResponse> {
    return this.httpClient.get<IParticipationResponse>(
      environment.baseUrl +
        `/events/${eventId}/registrations/submissions-registrations`,
    );
  }

  /**
   * This method is used to put the participation.
   * @param {IParticipationData} data - The data.
   * @param {string} eventId - The event id.
   * @returns {Observable<IPostResponse>} - The response.
   */
  public putParticipation(
    data: IParticipationData,
    eventId: string,
  ): Observable<IPostResponse> {
    return this.httpClient.put<IPostResponse>(
      environment.baseUrl +
        `/events/${eventId}/registrations/submissions-registrations`,
      data,
    );
  }

  /**
   * This method is used to get the user accommodation.
   * @param {string} eventId - The event id.
   * @returns {Observable<IAccommodationResponse[]>} - The response.
   */
  public getUserAccommodation(
    eventId: string,
  ): Observable<IAccommodationResponse[]> {
    return this.httpClient.get<IAccommodationResponse[]>(
      environment.baseUrl +
        `/events/${eventId}/registrations/accommodations-registrations`,
    );
  }

  /**
   * This method is used to get the user meals.
   * @param {string} eventId - The event id.
   * @returns {Observable<IMealsResponse[]>} - The response.
   */
  public getUserMeals(eventId: string): Observable<IMealsResponse[]> {
    return this.httpClient.get<IMealsResponse[]>(
      environment.baseUrl +
        `/events/${eventId}/registrations/meals-registrations`,
    );
  }

  /**
   * This method is used to get if user is the administrator
   * @param {string} eventId - The event id
   * @returns {Observable<boolean>} - The response
   */
  public iAmRegistered(eventId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      environment.baseUrl + `/events/${eventId}/registrations/am-registered`,
    );
  }

  /**
   * This method is used to get if user is the administrator
   * @param {string} eventId - The event id
   * @param {string} userId - The user id
   * @returns {Observable<boolean>} - The response
   */
  public isUserRegistered(
    eventId: string,
    userId: string,
  ): Observable<boolean> {
    return this.httpClient.get<boolean>(
      environment.baseUrl +
        `/events/${eventId}/registrations/is-registered/${userId}`,
    );
  }

  /**
   * This method is used to validate user
   * @param {IValidateUserData} data - The user data
   * @returns {Observable<string>} - The user id
   */
  public validateUser(data: IValidateUserData): Observable<string> {
    return this.httpClient
      .post(environment.baseUrl + '/users-infos/validate', data, {
        responseType: 'text',
      })
      .pipe(
        catchError(err => {
          const errorResponse = err as HttpErrorResponse;
          let parsedError: unknown;

          if (typeof errorResponse.error === 'string') {
            try {
              // Attempt to parse the error string as JSON
              parsedError = JSON.parse(errorResponse.error);
            } catch {
              // If parsing fails, use the raw string
              parsedError = { message: errorResponse.error };
            }
          }

          // Create a normalized error response
          const normalizedError = new HttpErrorResponse({
            error: parsedError,
            headers: errorResponse.headers,
            status: errorResponse.status,
            statusText: errorResponse.statusText,
            url: errorResponse.url ?? undefined,
          });

          // Re-throw the normalized error
          return throwError(() => normalizedError);
        }),
      );
  }

  /**
   * This method is used to register healthcare professional by partner
   * @param {IHealthcareProfessionalDialogData} data - The user data
   * @returns {Observable<string>} - The user id
   */
  public registerHealthcareProfessionalByPartner(
    data: IHealthcareProfessionalDialogData,
  ): Observable<string> {
    return this.httpClient.post(
      environment.baseUrl + '/healthcare-professionals/register/by-partner',
      data,
      {
        responseType: 'text',
      },
    );
  }

  /**
   * This method is used to register representative by partner
   * @param {IRepresentativeRegisterDialogData} data - The user data
   * @returns {Observable<string>} - The user id
   */
  public registerRepresentativeByPartner(
    data: IRepresentativeRegisterDialogData,
  ): Observable<string> {
    return this.httpClient.post(
      environment.baseUrl + '/representatives/register/by-partner',
      data,
      {
        responseType: 'text',
      },
    );
  }

  /**
   * This method is used to get user info by partner
   * @param {string} userId - The user id
   * @returns {Observable<IMedicalUserRegisterEventDialogData>} - The user data
   */
  public userInfoByPartner(
    userId: string,
  ): Observable<IMedicalUserRegisterEventDialogData> {
    return this.httpClient.get<IMedicalUserRegisterEventDialogData>(
      environment.baseUrl + `/users-infos/personal/by-partner/${userId}`,
    );
  }

  /**
   * This method is used to get partner settings
   * @param {string} eventId - The event id
   * @param {string} partnerId - The partner id
   * @returns {Observable<IEventUpdateRepresentativeManagementData>} - The partner settings
   */
  public partnersSettings(
    eventId: string,
    partnerId: string,
  ): Observable<IEventUpdateRepresentativeManagementData> {
    return this.httpClient.get<IEventUpdateRepresentativeManagementData>(
      environment.baseUrl + `/events/${eventId}/settings/partners/${partnerId}`,
    );
  }

  /**
   * This method is used to get accommodation settings by partner
   * @param {string} eventId - The event id
   * @param {string} userId - The user id
   * @returns {Observable<IAccommodationResponse[]>} - The accommodation settings
   */
  public accommodationSettingsByPartner(
    eventId: string,
    userId: string,
  ): Observable<IAccommodationResponse[]> {
    return this.httpClient.get<IAccommodationResponse[]>(
      environment.baseUrl +
        `/events/${eventId}/registrations/accommodations-registrations/by-partner/${userId}`,
    );
  }

  /**
   * This method is used to get the user meals.
   * @param {string} eventId - The event id.
   * @param {string} userId - The user id.
   * @returns {Observable<IMealsResponse[]>} - The response.
   */
  public mealSettingsByPartner(
    eventId: string,
    userId: string,
  ): Observable<IMealsResponse[]> {
    return this.httpClient.get<IMealsResponse[]>(
      environment.baseUrl +
        `/events/${eventId}/registrations/meals-registrations/by-partner/${userId}`,
    );
  }

  /**
   * This method is used to get the user participation.
   * @param {string} eventId - The event id.
   * @param {string} userId - The user id.
   * @returns {Observable<IParticipationResponse>} - The response.
   */
  public deleteUserFromEventByPartner(
    eventId: string,
    userId: string,
  ): Observable<IPostResponse> {
    return this.httpClient.delete<IPostResponse>(
      environment.baseUrl +
        `/events/${eventId}/registrations/by-partner/${userId}`,
    );
  }
}
