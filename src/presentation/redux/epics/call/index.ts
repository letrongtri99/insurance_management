import {
  LeadDetailActionTypes,
  connectedCall,
  failedCall,
  getCallParticipantsFailure,
  getCallParticipantsSuccess,
} from 'presentation/redux/actions/leads/detail';
import { epicWithStateFn, epicWithoutStateFn } from 'shared/interfaces/common';
import { showModal, showSnackBar } from 'presentation/redux/actions/ui';
import { combineEpics, ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import {
  mergeMap,
  pluck,
  exhaustMap,
  map,
  catchError,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import CallUseCase from 'domain/usecases/call';
import * as CONSTANTS from 'shared/constants';
import LeadUseCase from 'domain/usecases/lead';

const startCallEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.CALLING),
    map(() =>
      showSnackBar({
        isOpen: true,
        message: 'Calling.. Lead',
        status: CONSTANTS.snackBarConfig.type.info,
        isNotClose: true,
      })
    )
  );

const createCallEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.CALLING),
    withLatestFrom(
      state$.pipe(pluck('authReducer', 'data', 'user', 'name')),
      state$.pipe(
        pluck('leadsDetailReducer', 'getAgentReducer', 'data', 'agent', 'name')
      )
    ),
    exhaustMap(([action, userName, leadName]) =>
      new CallUseCase.CreateCallUseCase()
        .execute({ ...action.payload, userName, leadName })
        .pipe(
          pluck('data'),
          mergeMap((res) => {
            return merge(
              of(connectedCall(res)),
              of(
                showSnackBar({
                  isOpen: true,
                  message: 'Connected, Start Call',
                  status: CONSTANTS.snackBarConfig.type.success,
                  isNotClose: true,
                })
              ),
              of(showModal(CONSTANTS.ModalConfig.leadCallModal))
            );
          }),
          catchError((error) =>
            of(
              failedCall(error.toString()),
              showSnackBar({
                isOpen: true,
                message: 'Cannot connect call, please try again.',
                status: CONSTANTS.snackBarConfig.type.error,
              })
            )
          )
        )
    )
  );

const endCallEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.END_CALL),
    exhaustMap((action) => {
      return new CallUseCase.EndCallUseCase().execute(action.payload).pipe(
        map(() =>
          showSnackBar({
            isOpen: true,
            message: 'End Call',
            status: CONSTANTS.snackBarConfig.type.success,
          })
        )
      );
    })
  );

const getCallParticipantsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailActionTypes.GET_CALL_PARTICIPANTS),
    switchMap((action: any) => {
      return new LeadUseCase.GetLeadParticipantUseCase()
        .execute(action.payload)
        .pipe(
          pluck('data'),
          map((res) => getCallParticipantsSuccess(res)),
          catchError((err) => of(getCallParticipantsFailure(err)))
        );
    })
  );

const callEpic = combineEpics(
  startCallEpic,
  createCallEpic,
  endCallEpic,
  getCallParticipantsEpic
);

export default callEpic;
