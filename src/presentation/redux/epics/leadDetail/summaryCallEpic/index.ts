import { ofType, combineEpics } from 'redux-observable';
import { merge, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeAll } from 'rxjs/operators';
import { getString } from 'presentation/theme/localization';
import {
  LeadDetailActionTypes,
  createRejectionSuccess,
  createRejectionFailed,
} from 'presentation/redux/actions/leads/detail';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import LeadUseCase from 'domain/usecases/lead';
import * as CONSTANTS from 'shared/constants';
import { showSnackBar, hideModal } from 'presentation/redux/actions/ui';

const createRejectionEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.CREATE_REJECTION),
    exhaustMap((action: any) =>
      new LeadUseCase.CreateRejectionUseCase().execute(action.payload).pipe(
        map((res: any) => {
          return createRejectionSuccess(res);
        }),
        catchError((error: any) => of(createRejectionFailed(error.toString())))
      )
    )
  );

const createRejectionSuccessEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.CREATE_REJECTION_SUCCESS),
    map(() =>
      merge(
        of(
          showSnackBar({
            isOpen: true,
            message: getString('text.createRejectionSuccessfully'),
            status: CONSTANTS.snackBarConfig.type.success,
          })
        ),
        of(hideModal(CONSTANTS.ModalConfig.leadSummaryCallModal))
      )
    ),
    mergeAll()
  );

const createRejectionFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.CREATE_REJECTION_FAILED),
    map((action: any) =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.createRejectionFail', {
            message: action.error,
          }),
          status: CONSTANTS.snackBarConfig.type.error,
        })
      )
    ),
    mergeAll()
  );

const summaryCallEpic = combineEpics(
  createRejectionEpic,
  createRejectionSuccessEpic,
  createRejectionFailedEpic
);
export default summaryCallEpic;
