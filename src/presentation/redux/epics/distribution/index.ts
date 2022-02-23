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
import { epicWithoutStateFn } from 'shared/interfaces/common';
import GetNewLeadUserCase from '../../../../domain/usecases/distribution/GetNewLeadUserCase';
import {
  DistributionActionTypes,
  getNewLeadsFailed,
  getNewLeadsSuccess,
  getRetainerLeadsFailed,
  getRetainerLeadsSuccess,
  updateNewLeadsFailed,
  updateNewLeadsSuccess,
  updateNewLeadsValue,
  updateRetainerLeadsFailed,
  updateRetainerLeadsSuccess,
  updateRetainerLeadsValue,
} from '../../actions/distribution';
import GetRetainerUseCase from '../../../../domain/usecases/distribution/GetRetainerUseCase';
import UpdateNewLeadUseCase from '../../../../domain/usecases/distribution/UpdateNewLeadUseCase';
import UpdateRetainerLeadUseCase from '../../../../domain/usecases/distribution/UpdateRetainerLeadUseCase';
import { showSnackBar } from '../../actions/ui';
import { getString } from '../../../theme/localization';
import destroyWhen from '../../../../shared/helper/operator';
import { PageActionTypes } from '../../actions/page';

const getNewLeadsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.GET_NEW_LEADS),
    switchMap(() =>
      new GetNewLeadUserCase().execute().pipe(
        pluck('data'),
        map((res) => getNewLeadsSuccess(res)),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
        catchError((error) => of(getNewLeadsFailed(error.toString())))
      )
    )
  );

const getRetainerLeadsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.GET_RETAINER_LEADS),
    switchMap(() =>
      new GetRetainerUseCase().execute().pipe(
        pluck('data'),
        map((res) => getRetainerLeadsSuccess(res)),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
        catchError((error) => of(getRetainerLeadsFailed(error.toString())))
      )
    )
  );

const updateNewLeadsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.UPDATE_NEW_LEADS),
    exhaustMap((action) =>
      new UpdateNewLeadUseCase(action.payload).execute().pipe(
        map((res) => updateNewLeadsSuccess(res)),
        catchError((error) => of(updateNewLeadsFailed(error.toString())))
      )
    )
  );

const updateRetainerLeadsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.UPDATE_RETAINER_LEADS),
    exhaustMap((action) =>
      new UpdateRetainerLeadUseCase(action.payload).execute().pipe(
        map((res) => updateRetainerLeadsSuccess(res)),
        catchError((error) => of(updateRetainerLeadsFailed(error.toString())))
      )
    )
  );

const updateNewLeadSuccessEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.UPDATE_NEW_LEADS_SUCCESS),
    pluck('payload', 'data'),
    map((res) =>
      merge(
        of(
          showSnackBar({
            isOpen: true,
            message: getString('text.updateNewLeadSuccess'),
            status: 'success',
          })
        ),
        of(updateNewLeadsValue(res))
      )
    ),
    mergeAll()
  );

const updateNewLeadFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.UPDATE_NEW_LEADS_FAILED),
    map((err) =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.updateNewLeadFailed', {
            message: err.error,
          }),
          status: 'error',
        })
      )
    ),
    mergeAll()
  );

const updateRetainerLeadSuccessEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.UPDATE_RETAINER_LEADS_SUCCESS),
    pluck('payload', 'data'),
    map((res) =>
      merge(
        of(
          showSnackBar({
            isOpen: true,
            message: getString('text.updateRetainerLeadSuccess'),
            status: 'success',
          })
        ),
        of(updateRetainerLeadsValue(res))
      )
    ),
    mergeAll()
  );

const updateRetainerLeadFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(DistributionActionTypes.UPDATE_RETAINER_LEADS_FAILED),
    map((err) =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.updateRetainerLeadFailed', {
            message: err.error,
          }),
          status: 'error',
        })
      )
    ),
    mergeAll()
  );

const distributionEpic = combineEpics(
  getNewLeadsEpic,
  getRetainerLeadsEpic,
  updateNewLeadsEpic,
  updateNewLeadSuccessEpic,
  updateNewLeadFailedEpic,
  updateRetainerLeadsEpic,
  updateRetainerLeadSuccessEpic,
  updateRetainerLeadFailedEpic
);

export default distributionEpic;
