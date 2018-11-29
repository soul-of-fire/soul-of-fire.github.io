import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonAction } from 'src/app/root/shared/store/common-action';
import { ApiService } from 'src/app/root/shared/api/api.service';
import { Router } from '@angular/router';
import { LOAD, Loaded, EDIT, Edited } from 'src/app/root/shared/store/article-store';

@Injectable()
export class ArticleEffects {

  @Effect() load$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD),
    switchMap((action: CommonAction<any>) => this.api.get('note.json').pipe(
      map((response: any) => {
        localStorage.setItem('articles', JSON.stringify(response.data));
        return new Loaded(response.data);
      })
    )
    )
  );

  @Effect() edit$: Observable<Action> = this.actions$.pipe(
    ofType(EDIT),
    switchMap((action: CommonAction<any>) => this.api.patch('note.json', action.payload.data).pipe(
        map((response: any) => {
          localStorage.setItem('articles', JSON.stringify(response.data));
          return new Edited(response.data)
        }),
        tap(() => this.router.navigate([action.payload.redirect]))
      )
    )
  );

  constructor(private router: Router,
    private actions$: Actions,
    private api: ApiService) { }
}
