import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { LogOut, LogIn } from './store/auth-store';
import { map, takeUntil } from 'rxjs/operators';
import { Base } from '../../root/shared/base';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Base {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCohF1Jz0_7csanwW2XRHZD1imjVUsmos4';
  public auth$: any;
  public isActive$: Observable<number>;

  constructor(private http: HttpClient, private store: Store<any>) {
    super();
    this.auth$ = this.store.select('auth');
    const token = localStorage.getItem('token');
    token && this.store.dispatch(new LogIn(JSON.parse(token)));
    this.auth$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      data && this.count(data);
    })
  }

  public logIn(userData: any): any {
    return this.http.post(this.url, userData.payload);
  }

  public logout(): void {
    this.store.dispatch(new LogOut());
  }

  private count(data: any) {
    let seconds = (data.exprationTime - new Date().getTime()) / 1000;
    this.isActive$ = timer(0, 1000).pipe(
      takeUntil(this.destroy$),
      map((spended) => seconds - spended > 0 ? seconds - spended : 0)
    );
  }
}
