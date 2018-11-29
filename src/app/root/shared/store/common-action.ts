import { Action } from '@ngrx/store';

export class CommonAction<T> implements Action {
  public type: string;
  constructor(public payload?: T) {
  }
}
