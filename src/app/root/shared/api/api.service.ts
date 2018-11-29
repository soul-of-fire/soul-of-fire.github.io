import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class ApiService {
  private host = 'https://note-e73cf.firebaseio.com/';
  public loading$ = new BehaviorSubject<Boolean>(false);

  constructor(private http: HttpClient, private toasterService: ToasterService) {
  }

  get(...args): Observable<any> {
    return this.http.get<any[]>(this.setAuth(this.host + args[0]), args[1]).pipe(
      catchError(this.handleError())
    );
  }

  post(...args): Observable<any> {
    return this.http.post<any>(this.setAuth(this.host + args[0]), args[1], args[2]).pipe(
      catchError(this.handleError())
    );
  }

  put(...args): Observable<any> {
    return this.http.put<any>(this.setAuth(this.host + args[0]), args[1], args[2]).pipe(
      catchError(this.handleError())
    );
  }

  patch(...args): Observable<any> {
    return this.http.patch<any>(this.setAuth(this.host + args[0]), args[1], args[2]).pipe(
      catchError(this.handleError())
    );
  }

  remove(...args): Observable<any> {
    return this.http.delete<any>(this.setAuth(this.host + args[0])).pipe(
      catchError(this.handleError())
    );
  }

  private setAuth(url: string) {
    const token = localStorage.getItem('token');
    return token ? `${url}?auth=${JSON.parse(token).idToken}` : url;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.error instanceof ErrorEvent) {
        this.toasterService.pop('error', 'Message', error.error.message);
      } else {
        this.toasterService.pop('error', 'Message', error.statusText);
      }
      return of(null);
    };
  }
}
