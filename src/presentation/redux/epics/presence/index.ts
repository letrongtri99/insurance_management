import { ofType, combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeAll, tap } from 'rxjs/operators';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import {
  logoutUserFailed,
  logoutUserSuccess,
  PresenceActionTypes,
  updatePresenceFailed,
  updatePresenceSuccess,
} from '../../actions/presence';
import UpdatePresenceUseCase from '../../../../domain/usecases/presence/UpdatePresenceUseCase';
import { showSnackBar } from '../../actions/ui';
import { getString } from '../../../theme/localization';
import { RabbitResource } from '../../../../data/gateway/api/resource';
import LocalStorage, {
  LOCALSTORAGE_KEY,
} from '../../../../shared/helper/LocalStorage';

const logoutUserEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(PresenceActionTypes.LOGOUT_USER),
    exhaustMap((action) =>
      new UpdatePresenceUseCase().execute(action.payload, action.userName).pipe(
        map((res) => logoutUserSuccess(res)),
        tap(() => {
          const localStorage = new LocalStorage();
          localStorage.removeItemByKey(LOCALSTORAGE_KEY.USER_ID);
        }),
        catchError((error) => of(logoutUserFailed(error.toString())))
      )
    )
  );

const logoutUserSuccessEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(PresenceActionTypes.LOGOUT_USER_SUCCESS),
    map(() =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.logoutSuccess'),
          status: 'success',
        })
      )
    ),
    tap(() => {
      window.location.replace(RabbitResource.Auth.getLogoutUrl());
    }),
    mergeAll()
  );

const logoutUserFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(PresenceActionTypes.LOGOUT_USER_FAILED),
    map((err) =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.logoutFailed', {
            message: err.payload,
          }),
          status: 'error',
        })
      )
    ),
    mergeAll()
  );

const updatePresenceEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(PresenceActionTypes.UPDATE_PRESENCE),
    exhaustMap((action) =>
      new UpdatePresenceUseCase().execute(action.payload, action.userName).pipe(
        map((res) => updatePresenceSuccess(res)),
        catchError((error) => of(updatePresenceFailed(error.toString())))
      )
    )
  );

const presenceEpic = combineEpics(
  logoutUserEpic,
  logoutUserSuccessEpic,
  logoutUserFailedEpic,
  updatePresenceEpic
);
export default presenceEpic;
