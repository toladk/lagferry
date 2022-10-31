import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CookiesStorageService } from '../../shared/services/cookies-storage.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/auth/authentication.service';
import { User } from '../../shared/models';
const TOKEN_HEADER_KEY = 'Authorization';

const CODEMESSAGE: { [key: number]: string } = {
  0: 'Service temporarily unavailable, please try again!',
  403: 'Forbidden!',
  500: 'Internal Server Error',
  502: 'Gateway Error',
  503: 'The resource is unavailable',
  504: 'The resource is timed out',
};
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private cookiesStorageService: CookiesStorageService,
    private authService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = this.addAuthenticationToken(request);
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let err: any;
        if (
          request.url.includes('auth/refresh') ||
          request.url.includes('auth/signin')
        ) {
          // We do another check to see if refresh token failed
          // In this case we want to logout user and to redirect it to login page
          // console.log('inside auth');
          if (request.url.includes('auth/refresh')) {
            this.authService.logout();
          }
          err = this.formatError(error);

          return throwError(() => err);
        }

        // If error status is different than 401 we want to skip refresh token
        // So we check that and throw the error if it's the case
        if (error.status !== 401) {
          err = this.formatError(error);
          return throwError(() => err);
        }

        if (this.isRefreshing) {
          // If isRefreshing is true, we will wait until refreshTokenSubject has a non-null value
          // – which means the new token is ready and we can retry the request again
          return this.refreshTokenSubject.pipe(
            filter((result: null) => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request)))
          );
        } else {
          this.isRefreshing = true;

          // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
          this.refreshTokenSubject.next(null);

          // Call auth.refreshAccessToken
          return this.authService.refreshToken().pipe(
            switchMap((user: User) => {
              //When the call to refreshToken completes we reset the isRefreshing to false
              // for the next time the token needs to be refreshed and save to local storage
              this.isRefreshing = false;
              this.refreshTokenSubject.next(user.token);
              this.cookiesStorageService.saveToken(user.token);
              // console.log('refresh token fetched');

              return next.handle(this.addAuthenticationToken(request));
            }),
            catchError((error: HttpErrorResponse) => {
              this.isRefreshing = false;
              // console.log('Error in the refresh token', error);
              let err = this.formatError(error);

              this.authService.logout();
              return throwError(() => err);
            })
          );
        }
      })
    );
  }

  addAuthenticationToken(request: HttpRequest<unknown>) {
    // Get access token from Local Storage
    const accessToken = this.cookiesStorageService.getToken();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
      return request;
    }

    // We clone the request
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + accessToken),
    });
  }
  formatError(error: HttpErrorResponse) {
    let error_message = error.error.errors
      ? error.error.errors
          .map((err: string) => err.split(',')[1].trim())
          .join()
          .replace(',', '. ')
      : null;
    const errortext = error_message || CODEMESSAGE[error.status];
    return { ...error, msg: errortext };
  }
}
