import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import {
  BYPASS_LOADING,
  BYPASS_REFRESH_STRATEGY,
} from '@app/core/interceptors/http-request.interceptor';
import { UtilitiesService } from '@app/core/services/utilities.service';
import { SIGN_REQUEST } from '@app/core/interceptors/signature.interceptor';
import {
  IAuthResponse,
  ICountries,
  IFinishRegistrationData,
  IMedicType,
  IParticipantRegisterData,
  IPostResponse,
  IRepresentativeRegisterData,
  ISubjectResponse,
  ITitleName,
  IZipCodeDto,
} from '../interfaces/register.type';

/**
 * This service is used to provide the registration functionality.
 */
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly httpClient = inject(HttpClient);
  private readonly utilitiesService = inject(UtilitiesService);

  //GET

  /**
   * This method is used to get the titles before the name.
   * @returns {Observable<ITitleName[]>} - The titles before the name.
   */
  public getTitlesBeforeName(): Observable<ITitleName[]> {
    return this.httpClient.get<ITitleName[]>(
      environment.baseUrl + '/codetables/titles-before-name',
      {
        context: new HttpContext().set(SIGN_REQUEST, true),
      },
    );
  }

  /**
   * This method is used to get the titles after the name.
   * @returns {Observable<ITitleName[]>} - The titles after the name.
   */
  public getTitlesAfterName(): Observable<ITitleName[]> {
    return this.httpClient.get<ITitleName[]>(
      environment.baseUrl + '/codetables/titles-after-name',
      {
        context: new HttpContext().set(SIGN_REQUEST, true),
      },
    );
  }

  /**
   * This method is used to get the medic types.
   * @returns {Observable<IMedicType[]>} - The medic types.
   */
  public getNCZI(): Observable<IMedicType[]> {
    return this.httpClient.get<IMedicType[]>(
      environment.baseUrl + '/codetables/medic-types',
      {
        context: new HttpContext().set(SIGN_REQUEST, true),
      },
    );
  }

  /**
   * This method is used to get the medical expertise.
   * @returns {Observable<IMedicType[]>} - The medical expertise.
   */
  public getMedicalExpertise(): Observable<IMedicType[]> {
    return this.httpClient.get<IMedicType[]>(
      environment.baseUrl + '/codetables/medical-expertises',
      {
        context: new HttpContext().set(SIGN_REQUEST, true),
      },
    );
  }

  /**
   * This method is used to get the zip codes.
   * @param {string} search - The search string.
   * @returns {Observable<IZipCodeDto[]>} - The zip codes.
   */
  public getZipCodes(search: string): Observable<IZipCodeDto[]> {
    return this.httpClient.get<IZipCodeDto[]>(
      environment.baseUrl + `/codetables/zip-codes?search=${search}`,
      {
        context: new HttpContext()
          .set(BYPASS_LOADING, true)
          .set(SIGN_REQUEST, true),
      },
    );
  }

  /**
   * This method is used to get the medical expertise.
   * @param {string} search - The search string.
   * @returns {Observable<ICountries[]>} - The medical expertise.
   */
  public getCountries(search: string): Observable<ICountries[]> {
    return this.httpClient.get<ICountries[]>(
      environment.baseUrl + `/codetables/countries?search=${search}`,
      {
        context: new HttpContext()
          .set(BYPASS_LOADING, true)
          .set(SIGN_REQUEST, true),
      },
    );
  }

  /**
   * This method is used to search for a subject from the API.
   * @param {string} businessId - The business ID.
   * @param {string} name - The name.
   * @returns {Observable<ISubjectResponse[]>} - The subject response.
   */
  public searchSubjectFromApi(
    businessId: string,
    name: string,
  ): Observable<ISubjectResponse[]> {
    return this.httpClient.get<ISubjectResponse[]>(
      environment.baseUrl + '/subject/api',
      {
        context: new HttpContext()
          .set(BYPASS_LOADING, true)
          .set(SIGN_REQUEST, true),
        params: { business_id: businessId, name: name },
      },
    );
  }

  /**
   * This method is used to get the legal persons form SK.
   * @param {string} state - The state.
   * @param {object} options - The options.
   * @param {string} [options.name] - The name.
   * @param {string} [options.businessId] - The business ID.
   * @returns {Observable<ISubjectResponse[]>} - The subject response.
   */
  public getLegalPersonsForm(
    state: string,
    options?: {
      name?: string;
      businessId?: string;
    },
  ): Observable<ISubjectResponse[]> {
    const params = this.utilitiesService.buildHttpParams(options || {});

    return this.httpClient.get<ISubjectResponse[]>(
      environment.baseUrl + `/legal-persons/search/${state}`,
      {
        context: new HttpContext()
          .set(BYPASS_LOADING, true)
          .set(SIGN_REQUEST, true),
        params,
      },
    );
  }

  //POST

  /**
   * This method is used to check the email.
   * @param {string} email - The email.
   * @returns {Observable<IPostResponse>} - The post response.
   */
  public checkEmail(email: string): Observable<IPostResponse> {
    return this.httpClient.post<IPostResponse>(
      environment.baseUrl + '/auth/email/verify',
      { email: email },
    );
  }

  /**
   * This method is used to check the phone number.
   * @param {IParticipantRegisterData} data - The phone number.
   * @returns {Observable<IPostResponse>} - The post response.
   */
  public registerParticipant(
    data: IParticipantRegisterData,
  ): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(
      environment.baseUrl + '/healthcare-professionals/register',
      data,
    );
  }

  /**
   * This method is used to register a subject.
   * @param {IRepresentativeRegisterData} data - The data.
   * @returns {Observable<IAuthResponse>} - The auth response.
   */
  public registerSubject(
    data: IRepresentativeRegisterData,
  ): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(
      environment.baseUrl + '/representatives/register',
      data,
    );
  }

  /**
   * This method is used to finish the registration.
   * @param {IFinishRegistrationData} data - The data.
   * @returns {Observable<IAuthResponse>} - The auth response.
   */
  public finishRegistration(
    data: IFinishRegistrationData,
  ): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(
      environment.baseUrl + '/auth/finish-registration',
      data,
      {
        context: new HttpContext().set(BYPASS_REFRESH_STRATEGY, true),
      },
    );
  }
}
