import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IGetUserList } from 'shared/interfaces/common/typeSelector/user';
import { IAction, epicWithoutStateFn } from 'shared/interfaces/common';
import { combineEpics, ofType } from 'redux-observable';
import {
  UserSelectorActionTypes,
  getManagerUserSelectorTypesSuccess,
  getManagerUserSelectorTypesFail,
  getSupervisorUserSelectorTypesSuccess,
  getSupervisorUserSelectorTypesFail,
} from '../../../actions/typeSelector/user';
import SelectorUseCase from '../../../../../domain/usecases/typeSelector';
import destroyWhen from '../../../../../shared/helper/operator';
import { PageActionTypes } from '../../../actions/page';

const getManagerUserSelectorTypesEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(UserSelectorActionTypes.GET_MANAGER_USER_TYPES),
    switchMap((action: IAction<IGetUserList>) => {
      return new SelectorUseCase.GetUserSelectorsUseCase(
        action.payload as IGetUserList
      )
        .execute()
        .pipe(
          map((res) => getManagerUserSelectorTypesSuccess(res)),
          destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
          catchError((error) =>
            of(getManagerUserSelectorTypesFail(error.toString()))
          )
        );
    })
  );

const getSupervisorUserSelectorTypesEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(UserSelectorActionTypes.GET_SUPERVISOR_USER_TYPES),
    switchMap((action: IAction<IGetUserList>) => {
      return new SelectorUseCase.GetUserSelectorsUseCase(
        action.payload as IGetUserList
      )
        .execute()
        .pipe(
          map((res) => getSupervisorUserSelectorTypesSuccess(res)),
          destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
          catchError((error) =>
            of(getSupervisorUserSelectorTypesFail(error.toString()))
          )
        );
    })
  );

const getUserSelectorTypesEpic = combineEpics(
  getManagerUserSelectorTypesEpic,
  getSupervisorUserSelectorTypesEpic
);

export default getUserSelectorTypesEpic;
