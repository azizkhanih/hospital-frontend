import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from './../../../../../utilities/src/lib/toast/toast.service';
import { AccountService } from './../../account/services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
  constructor(private accountService: AccountService, private toastService: ToastService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) =>
      {
        debugger;
        if ([401, 403].indexOf(err.status) !== -1)
        {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.accountService.logout();
        }
        else if ([400].indexOf(err.status) !== -1)
        {
          this.toastService.showError(err.error[0]);
        }
        else if (err.error instanceof Error)
        {
          // A client-side or network error occurred. Handle it accordingly.
          // console.error('An error occurred:', err.error.message);
        }
        else
        {
          this.toastService.showError(err.error);
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          const errorResponse = err;
          console.log(errorResponse);
        }

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        //return throwError(error);

        // or just return nothing:
        // return EMPTY;

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
