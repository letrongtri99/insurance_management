import { ofType, combineEpics } from 'redux-observable';
import { merge, of, EMPTY, iif } from 'rxjs';
import {
  catchError,
  delayWhen,
  exhaustMap,
  map,
  mergeAll,
  pluck,
  switchMap,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';
import { getString } from 'presentation/theme/localization';
import {
  LeadActionTypes,
  getImportLeadSuccess,
} from 'presentation/redux/actions/leads/import';

import {
  LeadSourcesActionTypes,
  createLeadSourcesSuccess,
  createLeadSourcesFailed,
  updateLeadSourcesSuccess,
  updateLeadSourcesFailed,
  createLeadSourcesScoreFailed,
  createLeadSourcesScoreSuccess,
  createLeadSourcesScore,
  getLeadSourceSuccess,
  getLeadSourceFailed,
  getLeadSource,
  getLeadSourceScoreSuccess,
  getLeadSourceScoreFailed,
  updateLeadSourceScoreSuccess,
  updateLeadSourceScoreFailed,
  updateLeadSourceScore,
} from 'presentation/redux/actions/leads/sources';
import LeadUseCase from 'domain/usecases/lead';
import { ICreateScore } from 'shared/interfaces/common/lead/sources';
import * as CONSTANTS from 'shared/constants';
import { showSnackBar, hideModal } from 'presentation/redux/actions/ui';
import { epicWithoutStateFn, epicWithStateFn } from 'shared/interfaces/common';
import getPageState from 'shared/helper/pageState.helper';
import { initialPageState } from 'presentation/pages/admin/users/userPageHelper';
import TABLE_LEAD_TYPE from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import { IPageState } from 'shared/interfaces/common/table';
import {
  getLeadRejectParticipantsFailed,
  getLeadRejectParticipantsSuccess,
  getLeadRejectRecording,
  getLeadRejectRecordingFailed,
  getLeadRejectRecordingSuccess,
  LeadRejectRecordingActions,
} from 'presentation/redux/actions/leads/lead-reject-recording';
import {
  UploadActionTypes,
  createDocumentLeadSuccess,
  createDocumentLeadFailed,
  deleteDocumentLeadSuccess,
  deleteDocumentLeadFailed,
  getDocumentLeadSuccess,
  getDocumentLeadFailed,
} from 'presentation/redux/actions/leads/upload';
import destroyWhen, {
  delayLoading,
  delayLoadingForkJoin,
  customForkJoin,
} from '../../../../shared/helper/operator';
import { PageActionTypes } from '../../actions/page';
import {
  getLeadAssignmentFailed,
  getLeadAssignmentSuccess,
  getCommentLeadAssignmentSuccess,
  LeadAssignmentActions,
} from '../../actions/leads/lead-assignment';
import GetLeadAssignmentUseCase from '../../../../domain/usecases/lead/lead-assignment/GetLeadAssignmentUseCase';
import LookUpUserUsecase from '../../../../domain/usecases/admin/user/lookUpUserUseCase';

import { getLookUpUsersSuccess } from '../../actions/admin/user/index';
import {
  combineWithLatestFromValue,
  getAllSingleCommentData,
  getCallId,
  mapCommentToLeadData,
} from './helper';

const getLeadSourcesEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.GET_LEAD_SOURCES),
    withLatestFrom(
      state$.pipe(
        pluck('typeSelectorReducer', 'globalProductSelectorReducer', 'data')
      )
    ),
    switchMap(([action, productType]: any) => {
      const payload = {
        ...action.payload,
        filter: `${action.payload.filter} product in ("${productType}")`,
      };
      return new LeadUseCase.GetLeadSourcesUseCase().execute(payload).pipe(
        delayWhen(delayLoading),
        map((res: any) => getLeadSourceSuccess(res)),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
        catchError((error: any) => of(getLeadSourceFailed(error.toString())))
      );
    })
  );

// INFO: Get score by source name
const getLeadSourceScoreEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.GET_LEAD_SOURCES_SCORE),
    switchMap((action: any) =>
      new LeadUseCase.GetLeadSourceScoreUseCase().execute(action.payload).pipe(
        map((res: any) => getLeadSourceScoreSuccess(res)),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
        catchError((error: any) =>
          of(getLeadSourceScoreFailed(error.toString()))
        )
      )
    )
  );

const createLeadSourcesEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.CREATE_LEAD_SOURCES),
    exhaustMap((action: any) =>
      new LeadUseCase.CreateLeadSourcesUseCase().execute(action.payload).pipe(
        map((res: any) => {
          const data: ICreateScore = res._data;
          return createLeadSourcesSuccess({
            ...data,
            score: action.additionalParams.score,
          });
        }),
        catchError((error: any) =>
          of(createLeadSourcesFailed(error.toString()))
        )
      )
    )
  );

const createLeadSourcesSuccessEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.CREATE_LEAD_SOURCES_SUCCESS),
    withLatestFrom(state$.pipe(pluck('leadSourceReducer', 'listReducer'))),
    map(([action, state]: any) =>
      merge(
        of(
          showSnackBar({
            isOpen: true,
            message: getString('text.createLeadSourceSuccessfully'),
            status: CONSTANTS.snackBarConfig.type.success,
          })
        ),
        of(hideModal(CONSTANTS.ModalConfig.leadSourcesModal)),
        // INFO: Create score after create source successfully
        of(
          createLeadSourcesScore({
            name: `scores/${action.payload.name}`,
            score: action.payload.score,
          })
        ),
        // INFO: Re-call API list
        of(
          getLeadSource({
            ...initialPageState,
            pageSize: state.pageSize,
          })
        )
      )
    ),
    mergeAll()
  );

const createLeadSourcesFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.CREATE_LEAD_SOURCES_FAILED),
    map((action: any) =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.createLeadSourceFail', {
            message: action.error,
          }),
          status: CONSTANTS.snackBarConfig.type.error,
        })
      )
    ),
    mergeAll()
  );

const createLeadSourcesScoreEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.CREATE_LEAD_SOURCES_SCORE),
    exhaustMap((action: any) =>
      new LeadUseCase.CreateLeadSourcesScoreUseCase()
        .execute(action.payload)
        .pipe(
          map((res: any) => createLeadSourcesScoreSuccess(res)),
          catchError((error: any) =>
            of(createLeadSourcesScoreFailed(error.toString()))
          )
        )
    )
  );

const createLeadSourcesScoreFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.CREATE_LEAD_SOURCES_SCORE_FAILED),
    map(() =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.createLeadSourceScoreFail'),
          status: CONSTANTS.snackBarConfig.type.error,
        })
      )
    ),
    mergeAll()
  );

const updateLeadSourcesEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.UPDATE_LEAD_SOURCES),
    withLatestFrom(state$.pipe(pluck('leadSourceReducer', 'sourceReducer'))),
    exhaustMap(([action, state]: any) =>
      new LeadUseCase.UpdateLeadSourcesUseCase().execute(action.payload).pipe(
        map((res: any) => {
          const _payload: ICreateScore = {
            name: action.payload.name,
            score: action.additionalParams.score,
            sourceName: action.additionalParams.scoreName,
          };
          if (state.scoreSource.name) {
            return merge(
              of(updateLeadSourceScore(_payload)),
              of(updateLeadSourcesSuccess(res))
            );
          }
          return merge(
            of(
              createLeadSourcesScore({
                name: `scores/${_payload.name}`,
                score: _payload.score,
              })
            ),
            of(updateLeadSourcesSuccess(res))
          );
        }),
        mergeAll(),
        catchError((error: any) =>
          of(updateLeadSourcesFailed(error.toString()))
        )
      )
    )
  );

const updateLeadSourcesSuccessEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.UPDATE_LEAD_SOURCES_SUCCESS),
    withLatestFrom(state$.pipe(pluck('leadSourceReducer', 'listReducer'))),
    map(([state]: any) => {
      const pageState: IPageState = getPageState(
        state.listPageToken,
        state.pageIndex
      );
      if (state.showDeleted) {
        pageState.showDeleted = true;
      }
      pageState.orderBy = state.orderBy || [];
      pageState.filter = state.filter || '';
      return merge(
        of(
          showSnackBar({
            isOpen: true,
            message: getString('text.updateLeadSourceSuccessfully'),
            status: CONSTANTS.snackBarConfig.type.success,
          })
        ),
        of(hideModal(CONSTANTS.ModalConfig.leadSourcesModal)),
        // TODO: After integrate lead source list API
        of(
          getLeadSource({
            ...pageState,
            pageSize: state.pageSize,
          })
        )
      );
    }),
    mergeAll()
  );

const updateLeadSourcesFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.UPDATE_LEAD_SOURCES_FAILED),
    map((action: any) =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.updateLeadSourceFail', {
            message: action.error,
          }),
          status: CONSTANTS.snackBarConfig.type.error,
        })
      )
    ),
    mergeAll()
  );

const updateLeadSourceScoreEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.UPDATE_LEAD_SOURCES_SCORE),
    exhaustMap((action: any) =>
      new LeadUseCase.UpdateLeadSourceScoreUseCase()
        .execute(action.payload)
        .pipe(
          map((res: any) => {
            return updateLeadSourceScoreSuccess(res);
          }),
          catchError((error: any) =>
            of(updateLeadSourceScoreFailed(error.toString()))
          )
        )
    )
  );

const updateLeadSourcesScoreFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.UPDATE_LEAD_SOURCES_SCORE_FAILED),
    map(() =>
      of(
        showSnackBar({
          isOpen: true,
          message: getString('text.updateLeadSourceScoreFail'),
          status: CONSTANTS.snackBarConfig.type.error,
        })
      )
    ),
    mergeAll()
  );

const filterLeadSourceEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadSourcesActionTypes.FILTER_SOURCE),
    withLatestFrom(
      state$.pipe(pluck('leadSourceReducer')),
      state$.pipe(
        pluck('typeSelectorReducer', 'globalProductSelectorReducer', 'data')
      )
    ),
    map(([, state, productType]: any) => {
      const { listReducer } = state;
      return {
        type: LeadSourcesActionTypes.GET_LEAD_SOURCES,
        payload: {
          currentPage: 1,
          pageToken: '',
          pageSize: listReducer.pageSize,
          orderBy: listReducer.orderBy,
          filter: `${listReducer.filter} product in ("${productType}")`,
        },
      };
    })
  );

const getLeadAssignmentEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadAssignmentActions.GET_LEAD_ASSIGNMENT),
    withLatestFrom(
      state$.pipe(
        pluck('typeSelectorReducer', 'globalProductSelectorReducer', 'data')
      ),
      state$.pipe(pluck('leadsReducer', 'leadAssignmentReducer', 'pageState'))
    ),
    switchMap(([action, productName, pageState]) => {
      const payload = action.payload.pageSize
        ? {
            ...action.payload,
          }
        : { ...action.payload, ...pageState };

      return new GetLeadAssignmentUseCase().execute(payload, productName).pipe(
        delayWhen(delayLoading),
        map((res) => getLeadAssignmentSuccess(res, action.payload.tableType)),
        catchError((err) => of(getLeadAssignmentFailed(err, payload))),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE])
      );
    })
  );

const getLeadAssignmentSuccessEpic: epicWithStateFn = (action$, state) => {
  return action$.pipe(
    ofType(LeadAssignmentActions.GET_LEAD_ASSIGNMENT_SUCCESS),
    combineWithLatestFromValue(state),
    exhaustMap(([, leadData, totalItem, tableType]: any[]) => {
      const api = getAllSingleCommentData(leadData);
      return iif(
        () => tableType === TABLE_LEAD_TYPE.LEAD_REJECTION,
        mapCommentToLeadData(api, leadData, totalItem),
        of(getCommentLeadAssignmentSuccess(leadData, totalItem))
      ).pipe(destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]));
    })
  );
};

const getLeadAssignmentFailedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadAssignmentActions.GET_LEAD_ASSIGNMENT_FAILED),
    map((response) => {
      const { pageSize, currentPage } = response.payload;
      const from = (currentPage - 1) * pageSize;
      const recordLimit = 10000;
      const isMaxRecord = from + pageSize > recordLimit;
      let message = '';
      if (isMaxRecord) {
        message = getString('text.leadMaxRecord');
      } else if (response?.error?.message) {
        message = response.error.message;
      } else {
        message = getString('text.networkError');
      }
      return of(
        showSnackBar({
          isOpen: true,
          message,
          status: 'error',
          isNotClose: true,
        })
      );
    }),
    mergeAll()
  );

const getLeadImportListEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(LeadActionTypes.GET_IMPORT_LEADS),
    withLatestFrom(state$.pipe(pluck('userReducer', 'lookUpUserReducer'))),
    switchMap(([action, userState]) => {
      if (userState?.data?.length) {
        return new LeadUseCase.GetImportLeadsUseCase()
          .execute(action.payload)
          .pipe(
            delayWhen(delayLoading),
            map((res) => {
              const importLeadList = res?.imports;
              return getImportLeadSuccess({
                importList: importLeadList,
                pageToken: res?.nextPageToken || '',
                currentPage: action.payload.currentPage,
                userList: userState.data,
              });
            }),
            destroyWhen(action$, [PageActionTypes.DESTROY_PAGE])
          );
      }
      return customForkJoin(
        new LeadUseCase.GetImportLeadsUseCase().execute(action.payload),
        new LookUpUserUsecase().execute()
      ).pipe(
        delayWhen(delayLoadingForkJoin),
        mergeMap(([importList, userList]) => {
          const importLeadList = importList?.imports;
          const lookUpUsers = userList?.selectData;
          return merge(
            of(
              getImportLeadSuccess({
                importList: importLeadList || [],
                pageToken: importList.nextPageToken || '',
                currentPage: action.payload.currentPage,
                userList: lookUpUsers || [],
              })
            ),
            of(getLookUpUsersSuccess(userList))
          );
        }),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE])
      );
    })
  );

const getLeadRejectRecordedEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadRejectRecordingActions.GET_LEAD_REJECT_RECORDING),
    switchMap((action: any) => {
      return new LeadUseCase.GetLeadRecordingUseCase()
        .execute(action.payload)
        .pipe(
          map((res) => {
            return getLeadRejectRecordingSuccess(res);
          }),
          catchError((err) => {
            return of(
              getLeadRejectRecordingFailed({
                error: err.code,
                message: err.message,
              })
            );
          }),
          destroyWhen(action$, [PageActionTypes.DESTROY_PAGE])
        );
    })
  );

const getLeadRejectParticipantsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadRejectRecordingActions.GET_LEAD_REJECT_PARTICIPANTS),
    switchMap((action: any) => {
      return new LeadUseCase.GetLeadParticipantUseCase()
        .execute(action.payload)
        .pipe(
          mergeMap((res) => {
            const callId = getCallId(res?.data?.participants[0]?.name);

            return merge(
              of(getLeadRejectParticipantsSuccess(res)),
              iif(
                () => res?.data?.participants?.length,
                of(getLeadRejectRecording(callId)),
                EMPTY
              )
            );
          }),
          catchError((err) => of(getLeadRejectParticipantsFailed(err))),
          destroyWhen(action$, [PageActionTypes.DESTROY_PAGE])
        );
    })
  );

const createLeadDocumentEpic: epicWithStateFn = (action$) =>
  action$.pipe(
    ofType(UploadActionTypes.CREATE_DOCUMENTS_LEADS),
    switchMap((action: any) =>
      new LeadUseCase.CreateDocumentLeadUseCase().execute(action.payload).pipe(
        map((res: any) => {
          return merge(
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.createDocumentSuccessfully'),
                status: CONSTANTS.snackBarConfig.type.success,
              })
            ),
            of(createDocumentLeadSuccess(res))
          );
        }),
        mergeAll(),
        catchError((error: any) =>
          of(createDocumentLeadFailed(error.toString()))
        )
      )
    )
  );

const deleteLeadDocumentEpic: epicWithStateFn = (action$) =>
  action$.pipe(
    ofType(UploadActionTypes.DELETE_DOCUMENTS_LEADS),
    switchMap((action: any) =>
      new LeadUseCase.DeleteDocumentLeadUseCase().execute(action.payload).pipe(
        map((res: any) => {
          return merge(
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.deleteDocumentSuccessfully'),
                status: CONSTANTS.snackBarConfig.type.success,
              })
            ),
            of(deleteDocumentLeadSuccess(res))
          );
        }),
        mergeAll(),
        catchError((error: any) =>
          of(deleteDocumentLeadFailed(error.toString()))
        )
      )
    )
  );

const getUploaedLeadDocumentEpic: epicWithStateFn = (action$) =>
  action$.pipe(
    ofType(UploadActionTypes.GET_DOCUMENTS_LEADS),
    switchMap((action: any) =>
      new LeadUseCase.GetListDocumentUploadedLeadUseCase()
        .execute(action.payload)
        .pipe(
          pluck('data'),
          map((res: any) => getDocumentLeadSuccess(res)),
          catchError((error: any) =>
            of(getDocumentLeadFailed(error.toString()))
          )
        )
    )
  );

const leadEpic = combineEpics(
  createLeadSourcesEpic,
  createLeadSourcesSuccessEpic,
  createLeadSourcesFailedEpic,
  updateLeadSourcesEpic,
  updateLeadSourcesSuccessEpic,
  updateLeadSourcesFailedEpic,
  createLeadSourcesScoreEpic,
  createLeadSourcesScoreFailedEpic,
  getLeadSourcesEpic,
  getLeadSourceScoreEpic,
  updateLeadSourceScoreEpic,
  updateLeadSourcesScoreFailedEpic,
  filterLeadSourceEpic,
  getLeadAssignmentEpic,
  getLeadAssignmentFailedEpic,
  getLeadImportListEpic,
  getLeadAssignmentSuccessEpic,
  getLeadRejectParticipantsEpic,
  getLeadRejectRecordedEpic,
  createLeadDocumentEpic,
  deleteLeadDocumentEpic,
  getUploaedLeadDocumentEpic
);
export default leadEpic;
