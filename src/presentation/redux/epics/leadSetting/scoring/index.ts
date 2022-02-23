import { ofType, combineEpics } from 'redux-observable';
import { merge, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeAll,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { showSnackBar } from 'presentation/redux/actions/ui';
import {
  ScoringActionTypes,
  getListLeadScoreSuccess,
  getListLeadScoreFailed,
  updateLeadScoreByNameSuccess,
  updateLeadScoreByNameFailed,
} from 'presentation/redux/actions/leadSetting/scoringSetting';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { getString } from 'presentation/theme/localization';
import GetListLeadScoreUseCase from 'domain/usecases/scoring/GetListLeadScoreUseCase';
import UpdateRenewalLeadScoreUseCase from 'domain/usecases/scoring/EditRenewalLeadScoreUseCase';
import destroyWhen from '../../../../../shared/helper/operator';
import { PageActionTypes } from '../../../actions/page';

const getListLeadScoreEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(ScoringActionTypes.GET_LIST_LEAD_SCORE),
    switchMap(() =>
      new GetListLeadScoreUseCase().execute().pipe(
        pluck('data', 'weightSets'),
        map((res) => getListLeadScoreSuccess(res)),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
        catchError((error) => of(getListLeadScoreFailed(error.toString())))
      )
    )
  );

const updateLeadScoreByNameEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME),
    exhaustMap((action) =>
      new UpdateRenewalLeadScoreUseCase().execute(action.payload).pipe(
        map(() => updateLeadScoreByNameSuccess(action.payload)),
        catchError((error) =>
          merge(
            of(updateLeadScoreByNameFailed(action.leadType, error.toString()))
          )
        )
      )
    )
  );

const updateLeadScoreByNameSuccessEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME_SUCCESS),
    map((action) =>
      merge(
        of(
          showSnackBar({
            isOpen: true,
            message: getString('text.updateLeadScoreSuccess', {
              leadType: action.payload.leadType,
            }),
            status: 'success',
          })
        )
      )
    ),
    mergeAll()
  );

const updateLeadScoreByNameFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME_FAILED),
    map((action) =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.updateLeadScoreFailed', {
            leadType: action.payload.leadType,
            message: action.error,
          }),
          status: 'error',
        })
      )
    ),
    mergeAll()
  );

const scoringEpic = combineEpics(
  getListLeadScoreEpic,
  updateLeadScoreByNameEpic,
  updateLeadScoreByNameFailedEpic,
  updateLeadScoreByNameSuccessEpic
);

export default scoringEpic;
