import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class OptionsService implements HttpInterceptor {

  constructor(private apiService: ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authReq = req.clone();
    this.apiService.loading$.next(true);
    return next.handle(authReq).pipe(
      map((resp: any) => {
        if (resp instanceof HttpResponse) {
          this.apiService.loading$.next(false);
        }
        return resp;
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.apiService.loading$.next(false);
        }
        return throwError(err);
      })
    );
  }
}
