import { IAction } from 'shared/interfaces/common';

// Authentication
export const AUTHENTICATE = '[Auth] AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILED = '[Auth] AUTHENTICATE_FAILED';

// Authorization
export const AUTHORIZE = '[Auth] AUTHORIZE';
export const AUTHORIZE_SUCCESS = '[Auth] AUTHORIZE_SUCCESS';
export const AUTHORIZE_FAILED = '[Auth] AUTHORIZE_FAILED';

// Login
export const LOGIN = '[Auth] LOGIN';
export const LOGIN_SUCCESS = '[Auth] LOGIN SUCCESS';
export const LOGIN_FAILED = '[Auth] LOGIN FAILED';

// Request login method
export const REQUEST_LOGIN_METHOD = '[Auth] REQUEST LOGIN METHOD';

export const UPDATE_LAST_LOGIN = '[Auth] UPDATE LAST LOGIN';

export const AUTHORIZE_SUSPEND = '[Auth] AUTHORIZE_SUSPEND';

export const RESET_SUSPEND = '[Auth] RESET_SUSPEND';
export const authenticate = (payload?: any): IAction<any> => ({
  type: AUTHENTICATE,
  payload,
});

export const authenticateSuccess = (payload?: any): IAction<any> => ({
  type: AUTHENTICATE_SUCCESS,
  payload,
});

export const authenticateFailed = (error: Error): IAction<any> => ({
  type: AUTHENTICATE_FAILED,
  error,
});

export const authorize = (): IAction<any> => ({
  type: AUTHORIZE,
});

export const authorizeSuccess = (payload?: any): IAction<any> => ({
  type: AUTHORIZE_SUCCESS,
  payload,
});

export const authorizeFailed = (error: any): IAction<any> => ({
  type: AUTHORIZE_FAILED,
  error,
});

export const login = (payload: any): IAction<any> => ({
  type: LOGIN,
  payload,
});

export const loginSuccess = (userId: string): IAction<any> => ({
  type: LOGIN_SUCCESS,
  payload: userId,
});

export const loginFailed = (payload: Error): IAction<any> => ({
  type: LOGIN_FAILED,
  payload,
});

export const requestLoginMethod = (payload: string): IAction<any> => ({
  type: REQUEST_LOGIN_METHOD,
  payload,
});

export const updateLastLoginSuccess = (): IAction<any> => ({
  type: UPDATE_LAST_LOGIN,
});

export const authorizeSuspend = (): IAction<any> => ({
  type: AUTHORIZE_SUSPEND,
});

export const resetSuspend = (): IAction<any> => ({
  type: RESET_SUSPEND,
});
