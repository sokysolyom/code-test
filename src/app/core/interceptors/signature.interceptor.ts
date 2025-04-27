/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable sonarjs/new-cap */
import {
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Context token to explicitly enable request signing.
 */
export const SIGN_REQUEST = new HttpContextToken(() => false);

/**
 * Generates an HMAC SHA-256 signature using `crypto-js`.
 * @param {string} path - The API request path.
 * @returns {string} The generated signature as a base64 string.
 */
const generateSignature = (path: string): string => {
  const sharedSecret = environment.sharedSecret;
  const hmac = CryptoJS.HmacSHA256(path, CryptoJS.enc.Utf8.parse(sharedSecret));
  return CryptoJS.enc.Base64.stringify(hmac);
};

/**
 * Interceptor function to add a signature header **only** when SIGN_REQUEST is enabled.
 * @param {HttpRequest<unknown>} request - The HTTP request object.
 * @param {HttpHandlerFn} next - The HTTP handler function.
 * @returns {Observable<HttpEvent<unknown>>} The modified HTTP request with the signature header (if applicable).
 */
export const signatureInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (!request.context.get(SIGN_REQUEST)) {
    return next(request);
  }

  const requestPath = new URL(request.url).pathname;
  const signedRequest = request.clone({
    setHeaders: { 'x-request-signature-256': generateSignature(requestPath) },
  });

  return next(signedRequest);
};
