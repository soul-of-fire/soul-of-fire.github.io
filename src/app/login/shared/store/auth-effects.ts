import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonAction } from './common-action';
import { SIGN, LogIn } from './auth-store';
import { AuthService } from 'src/app/login/shared/auth.service';

@Injectable()
export class AuthEffects {

  @Effect() logIn$: Observable<Action> = this.actions$.pipe(
    ofType(SIGN),
    switchMap((user: CommonAction<any>) => this.authService.logIn(user).pipe(
      map((data: any) => {
        this.setExpirationTime(data);
        localStorage.setItem('token', JSON.stringify(data));
        return new LogIn(data);
      })
    ))
  );

  private setExpirationTime(data): void {
    data['exprationTime'] = new Date().getTime() + (data.expiresIn * 1000) - 5000;
  }

  constructor(private actions$: Actions, private authService: AuthService) { }
}
