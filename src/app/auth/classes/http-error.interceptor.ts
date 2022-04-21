// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
//   HttpErrorResponse,
//   HttpResponse,
//   HttpHeaders
// } from '@angular/common/http';
// import { Observable, EMPTY, finalize, catchError, timeout, map, throwError } from 'rxjs';
//
// import { HttpErrorHandlerService } from '@core/services';
//
// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//   private readonly APP_XHR_TIMEOUT = 6000;
//
//   constructor(private errorHandlerService: HttpErrorHandlerService) {}
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(this.performRequest(request)).pipe(
//       timeout(this.APP_XHR_TIMEOUT),
//       map((event: HttpEvent<any>) => this.handleSuccessfulResponse(event)),
//       catchError((error: HttpErrorResponse) => this.processRequestError(error, request, next)),
//       finalize(this.handleRequestCompleted.bind(this))
//     );
//   }
//
//   private performRequest(request: HttpRequest<any>): HttpRequest<any> {
//     let headers: HttpHeaders = request.headers;
//     //headers = headers.set('MyCustomHeaderKey', `MyCustomHeaderValue`);
//     return request.clone({ headers });
//   }
//
//   private handleSuccessfulResponse(event: HttpEvent<any>): HttpEvent<any> {
//     if (event instanceof HttpResponse) {
//       event = event.clone({ body: event.body.response });
//     }
//     return event;
//   }
//
//   private processRequestError(
//     error: HttpErrorResponse,
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('http error response');
//
//     if ([401].includes(error.status)) {
//       return throwError(error);
//     }
//
//     this.errorHandlerService.handle(error);
//
//     return throwError(error);
//   }
//
//   private handleRequestCompleted(): void {
//     // console.log(`Request finished`);
//   }
// }
//
// import { Injectable } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
//
// import { MessageService } from 'primeng/api';
// import { TimeoutError } from 'rxjs';
//
// /**
//  * Shows a user-friendly error message when a HTTP request fails.
//  */
// @Injectable({
//   providedIn: 'root'
// })
// export class HttpErrorHandlerService {
//   constructor(private messageService: MessageService) {}
//
//   handle(error: Error | HttpErrorResponse) {
//     if (error instanceof TimeoutError) {
//       return this.openDialog('error', `Няма връзка до сървъра.`);
//     }
//
//     if (error instanceof HttpErrorResponse && error.error && error.error.message) {
//       return this.openDialog('error', error.error.message);
//     }
//
//     if (error instanceof Error) {
//       switch (error.message) {
//         default:
//           return this.openDialog('error', `An unknown error occurred`);
//       }
//     }
//
//     // Generic HTTP errors
//     switch (error.status) {
//       case 400:
//         switch (error.error) {
//           case 'invalid_username_or_password':
//             return this.openDialog('error', 'Невалидно потребителско име или парола');
//           default:
//             return this.openDialog('error', 'Bad request');
//         }
//
//       case 401:
//         return this.openDialog('error', 'Ще трябва да се логнете отново');
//
//       case 403:
//         return this.openDialog('error', `You don't have the required permissions`);
//
//       case 404:
//         return this.openDialog('error', 'Resource not found');
//
//       case 422:
//         return this.openDialog('error', 'Invalid data provided');
//
//       case 500:
//       case 501:
//       case 502:
//       case 503:
//         return this.openDialog('error', 'An internal server error occurred');
//
//       case -1:
//         return this.openDialog(
//           'error',
//           'You appear to be offline. Please check your internet connection and try again.'
//         );
//
//       case 0:
//         return this.openDialog('error', `CORS issue?`);
//
//       default:
//         return this.openDialog('error', `An unknown error occurred`);
//     }
//   }
//
//   private openDialog(severity: string, message: string) {
//     if (message?.trim()) {
//       this.messageService.add({
//         key: 'interceptor',
//         severity: severity,
//         summary: 'Информация',
//         detail: message,
//         life: 3000
//       });
//     }
//   }
// }
