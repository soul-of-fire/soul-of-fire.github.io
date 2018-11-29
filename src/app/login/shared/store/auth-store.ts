import { cloneDeep } from 'lodash';
import { CommonAction } from 'src/app/root/shared/store/common-action';

export const SIGN = 'SIGN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Sign extends CommonAction<any> {
  type = SIGN;
}

export class LogIn extends CommonAction<any> {
  type = LOGIN;
}

export class LogOut extends CommonAction<void> {
  type = LOGOUT;
}

export function authReducer(note: any = null, action: CommonAction<any>) {
  switch (action.type) {
    case LOGIN:
      const payload = action.payload;
      return cloneDeep(payload);
    case LOGOUT:
      localStorage.removeItem('token');
      return null;
    default:
      return note;
  }
}
