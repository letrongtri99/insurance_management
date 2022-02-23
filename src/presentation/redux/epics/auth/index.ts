import { ofType, combineEpics } from 'redux-observable';
import { EMPTY, merge, of } from 'rxjs';
import {
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  authenticateFailed,
  authenticateSuccess,
  AUTHORIZE,
  authorizeFailed,
  authorizeSuccess,
  LOGIN,
  LOGIN_SUCCESS,
  loginFailed,
  loginSuccess,
  REQUEST_LOGIN_METHOD,
  updateLastLoginSuccess,
  AUTHORIZE_SUCCESS,
  RESET_SUSPEND,
  LOGIN_FAILED,
  AUTHORIZE_FAILED,
  AUTHENTICATE_FAILED,
  AUTHORIZE_SUSPEND,
} from 'presentation/redux/actions/auth';
import {
  catchError,
  concatMap,
  map,
  mapTo,
  pluck,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { epicWithStateFn, epicWithoutStateFn } from 'shared/interfaces/common';
import AuthRepository from 'data/repository/auth';
import UserCloud from 'data/repository/admin/user/cloud';
import { fromPromise } from 'rxjs/internal-compatibility';
import { RabbitResource } from 'data/gateway/api/resource';
import SessionStorage, {
  SESSION_STORAGE_KEY,
} from 'shared/helper/SessionStorage';
import { showSnackBar } from '../../actions/ui';
import { getString } from '../../../theme/localization';
import LocalStorage, {
  LOCALSTORAGE_KEY,
} from '../../../../shared/helper/LocalStorage';

const localStorage = new LocalStorage();
const sessionStorage = new SessionStorage();
const SUSPEND_STATUS = 404;

const authenticate$: epicWithoutStateFn = (action$) => {
  return action$.pipe(
    ofType(AUTHENTICATE),
    switchMap(() =>
      AuthRepository.getAuthInfo().pipe(
        pluck('_data', 'identity', 'id'),
        concatMap((userId: string) => {
          if (localStorage.getItemByKey(LOCALSTORAGE_KEY.USER_ID)) {
            return of(authenticateSuccess(userId));
          }
          return AuthRepository.updateLastLogin(userId).pipe(
            tap(() => {
              localStorage.setItemByKey(LOCALSTORAGE_KEY.USER_ID, userId);
            }),
            map(() => authenticateSuccess(userId))
          );
        }),
        takeUntil(action$.pipe(ofType(REQUEST_LOGIN_METHOD))),
        catchError((err) => of(authenticateFailed(err)))
      )
    )
  );
};

const login$: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LOGIN),
    switchMap((action) =>
      fromPromise(AuthRepository.login(action.payload)).pipe(
        pluck('data', 'identity', 'id'),
        map((res: any) => loginSuccess(res)),
        catchError((error: Error) =>
          merge(
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.loginFailed'),
                status: 'error',
              })
            ),
            of(loginFailed(error))
          )
        )
      )
    )
  );

const authorize$: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(AUTHENTICATE_SUCCESS, AUTHORIZE, LOGIN_SUCCESS),
    withLatestFrom(state$.pipe(pluck('authReducer', 'data', 'user', 'id'))),
    switchMap(([_, userId]: any) => {
      if (!userId) {
        return of(authorizeFailed(new Error('No user id provided')));
      }
      return UserCloud.getUser(userId).pipe(
        map((res) => authorizeSuccess(res)),
        catchError((err: Error) => of(authorizeFailed(err)))
      );
    })
  );

const requestLoginMethod$: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(REQUEST_LOGIN_METHOD),
    switchMap((action: any) =>
      AuthRepository.getLoginRequest(action.payload).pipe(map(() => EMPTY))
    )
  );

const updateLastLogin$: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LOGIN_SUCCESS),
    withLatestFrom(state$.pipe(pluck('authReducer', 'data', 'user', 'id'))),
    concatMap(([_, userId]: any) =>
      AuthRepository.updateLastLogin(userId).pipe(
        map(() => updateLastLoginSuccess())
      )
    )
  );

const authenticationFailed$: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LOGIN_FAILED, AUTHORIZE_FAILED, AUTHENTICATE_FAILED),
    pluck('error', '_code'),
    tap((code) => {
      if (code === SUSPEND_STATUS) {
        sessionStorage.setItemByKey(SESSION_STORAGE_KEY.SUSPEND, true);
        window.location.replace(RabbitResource.Auth.getLogoutUrl());
      }
    }),
    mapTo({ type: AUTHORIZE_SUSPEND })
  );

const authenticationSuccess$: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LOGIN_SUCCESS, AUTHENTICATE_SUCCESS, AUTHORIZE_SUCCESS),
    tap(() => sessionStorage.removeItemByKey(SESSION_STORAGE_KEY.SUSPEND)),
    mapTo({ type: RESET_SUSPEND })
  );

const authEpic = combineEpics(
  authenticate$,
  login$,
  authorize$,
  requestLoginMethod$,
  updateLastLogin$,
  authenticationSuccess$,
  authenticationFailed$
);

export default authEpic;
