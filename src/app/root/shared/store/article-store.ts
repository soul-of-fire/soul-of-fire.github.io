import { cloneDeep } from 'lodash';
import { CommonAction } from './common-action';
import { Article } from '../models/article';

export const LOAD = 'LOAD';
export const LOADED = 'LOADED';
export const EDIT = 'EDIT';
export const EDITED = 'EDITED';
export const CLEAR = 'CLEAR';

export class Load extends CommonAction<void> {
  type = LOAD;
}

export class Loaded extends CommonAction<any> {
  type = LOADED;
}

export class Edit extends CommonAction<any> {
  type = EDIT;
}

export class Edited extends CommonAction<any> {
  type = EDITED;
}

export class Clear extends CommonAction<any> {
  type = CLEAR;
}

export function articleReducer(payload: any = null, action: CommonAction<any>) {
  switch (action.type) {
    case LOADED:
      return action.payload;
    case EDITED:
      const edited = action.payload;
      return cloneDeep(payload);
    case CLEAR:
      localStorage.removeItem('articles');
      return null;
    default:
      return payload;
  }
}
