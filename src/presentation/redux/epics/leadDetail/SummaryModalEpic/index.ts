import { ofType, combineEpics } from 'redux-observable';
import { iif, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  mergeAll,
  pluck,
} from 'rxjs/operators';
import { getString } from 'presentation/theme/localization';
import {
  LeadDetailActionTypes,
  handleSummaryModalSuccess,
  handleSummaryModalFailure,
} from 'presentation/redux/actions/leads/detail';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import LeadDetailUseCase from 'domain/usecases/leadDetail';
import * as CONSTANTS from 'shared/constants';
import { showSnackBar } from 'presentation/redux/actions/ui';
import {
  showSnackBarUpdateCommentOnly,
  updateLeadRejectReasonAPI,
  updateLeadStatusAPI,
  updateReasonAndStatus,
} from './helper';

const handleSummaryModalEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.HANDLE_SUMMARY_MODAL),
    exhaustMap((action: any) =>
      new LeadDetailUseCase.HandleSummaryModalUseCase()
        .execute(action.payload)
        .pipe(
          pluck('data', 'name'),
          map((res: any) => {
            return handleSummaryModalSuccess({
              ...action.payload,
              comment: res,
            });
          }),
          catchError((error: any) =>
            of(handleSummaryModalFailure(error.toString()))
          )
        )
    )
  );

const handleSummaryModalSuccessEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.HANDLE_SUMMARY_MODAL_SUCCESS),
    mergeMap((action: any) => {
      const sources: any[] = [];
      let hasLeadData = false;
      let isCreateRejection = false;

      if (action.payload.status) {
        sources.push(updateLeadStatusAPI(action.payload));
        hasLeadData = true;
      }
      if (action.payload.reason) {
        sources.push(updateLeadRejectReasonAPI(action.payload));
        isCreateRejection = true;
      }

      return iif(
        () => !!sources.length,
        updateReasonAndStatus(sources, hasLeadData, isCreateRejection),
        showSnackBarUpdateCommentOnly()
      );
    })
  );

const handleSummaryModalFailureEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.HANDLE_SUMMARY_MODAL_FAILURE),
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

const SummaryModalEpic = combineEpics(
  handleSummaryModalEpic,
  handleSummaryModalSuccessEpic,
  handleSummaryModalFailureEpic
);
export default SummaryModalEpic;
