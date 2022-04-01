// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import {
//   BehaviorSubject,
//   catchError,
//   EMPTY,
//   filter,
//   finalize,
//   Observable,
//   switchMap,
//   take,
//   throwError
// } from 'rxjs';
//
// import { AuthService } from '@core/services';
// import { AuthResponse } from '@core/types';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private refreshTokenInProgress: boolean;
//   private refreshToken$ = new BehaviorSubject<AuthResponse | null>(null);
//
//   constructor(private authService: AuthService) {}
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next
//       .handle(this.performRequest(request))
//       .pipe(
//         catchError((error: HttpErrorResponse) => this.processRequestError(error, request, next))
//       );
//   }
//
//   private performRequest(request: HttpRequest<any>): HttpRequest<any> {
//     const accessToken = this.authService.getAccessToken();
//
//     let headers = request.headers;
//     if (accessToken) {
//       headers = headers.set('Authorization', `Bearer ${accessToken}`);
//     }
//
//     return request.clone({ headers });
//   }
//
//   private processRequestError(
//     error: HttpErrorResponse,
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('auth interceptor called');
//
//     if (
//       error instanceof HttpErrorResponse &&
//       error.status === 401 &&
//       this.authService.isSignedIn()
//     ) {
//       return this.refreshToken(request, next);
//     }
//
//     return throwError(error);
//   }
//
//   private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('refresh token in auth.interceptor called');
//
//     // in case the page consists of more than one requests
//     if (!this.refreshTokenInProgress) {
//       this.refreshToken$.next(null);
//       this.refreshTokenInProgress = true;
//
//       return this.authService.refreshToken().pipe(
//         switchMap((response) => {
//           if (response) {
//             this.refreshToken$.next(response);
//             return next.handle(this.performRequest(request));
//           }
//
//           this.authService.signOut();
//           return throwError(() => new Error("RefreshTokenFailed"));
//         }),
//         catchError((error) => {
//           this.authService.signOut();
//           return throwError(error);
//         }),
//         finalize(() => (this.refreshTokenInProgress = false))
//       );
//     } else {
//       // wait while getting new token
//       return this.refreshToken$.pipe(
//         filter((result) => result !== null),
//         take(1),
//         switchMap(() => next.handle(this.performRequest(request)))
//       );
//     }
//   }
// }
