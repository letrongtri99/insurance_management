import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, delayWhen, map, switchMap } from 'rxjs/operators';

import PresentationTeamModel from 'presentation/models/typeSelector/team';
import {
  TeamSelectorActionTypes,
  getTeamSelectorTypesSuccess,
  getTeamSelectorTypesFail,
  getAllTeamsSuccess,
  getAllTeamsFailed,
  TeamRoleSelectorActionTypes,
  getTeamRoleSelectorFail,
  getTeamRoleSelectorSuccess,
} from 'presentation/redux/actions/typeSelector/team';
import {
  InsurersSelectorActionTypes,
  getAllInsurersSelectorSuccess,
  getAllInsurersSelectorFail,
} from 'presentation/redux/actions/typeSelector/insurer';
import { PageActionTypes } from 'presentation/redux/actions/page';
import SelectorUseCase from 'domain/usecases/typeSelector';

import destroyWhen, { delayLoading } from 'shared/helper/operator';
import { IGetTeamList } from 'shared/interfaces/common/typeSelector/team';
import { epicWithoutStateFn, IAction } from 'shared/interfaces/common';
import { IGetRoleSelector } from 'shared/interfaces/common/typeSelector/role';

const getTeamSelectorTypesEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(TeamSelectorActionTypes.GET_TEAM_TYPES),
    switchMap((action) =>
      new SelectorUseCase.GetTeamSelectorsUseCase(
        action.payload as IGetTeamList
      )
        .execute()
        .pipe(
          map((res: PresentationTeamModel) => getTeamSelectorTypesSuccess(res)),
          catchError((error) => of(getTeamSelectorTypesFail(error.toString())))
        )
    )
  );

const getAllTeamsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(TeamSelectorActionTypes.GET_ALL_TEAMS),
    switchMap((action) => {
      return new SelectorUseCase.GetAllTeamsUseCase()
        .execute(action.payload)
        .pipe(
          delayWhen(delayLoading),
          map((res: any) => {
            return getAllTeamsSuccess({
              teams: res,
            });
          }),
          destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
          catchError((error) =>
            of(getAllTeamsFailed(error.toString() || 'Get team failed'))
          )
        );
    })
  );

const getTeamRoleSelectorEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(TeamRoleSelectorActionTypes.GET_TEAM_ROLE_TYPES),
    switchMap((action: IAction<IGetRoleSelector>) =>
      new SelectorUseCase.GetTeamRoleSelectorsUseCase(
        action.payload as IGetRoleSelector
      )
        .execute()
        .pipe(
          map((res) => getTeamRoleSelectorSuccess(res)),
          catchError((error) => of(getTeamRoleSelectorFail(error.toString())))
        )
    )
  );

const getAllInsurersSelectorEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(InsurersSelectorActionTypes.GET_ALL_INSURERS_TYPES),
    switchMap((action: IAction<any>) =>
      new SelectorUseCase.GetAllInsurersSelectorsUseCase(action.payload as any)
        .execute()
        .pipe(
          map((res) => getAllInsurersSelectorSuccess(res)),
          catchError((error) =>
            of(getAllInsurersSelectorFail(error.toString()))
          )
        )
    )
  );

const teamSelectorTypesEpic = combineEpics(
  getTeamSelectorTypesEpic,
  getAllTeamsEpic,
  getTeamRoleSelectorEpic,
  getAllInsurersSelectorEpic
);

export default teamSelectorTypesEpic;
