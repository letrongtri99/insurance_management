import { combineEpics, ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import {
  LeadActionTypes,
  getAllNewLeadSuccess,
  getAllNewLeadFail,
  getAllRetainerLeadSuccess,
  getAllRetainerLeadFail,
  editOverflowNewLeadSuccess,
  editOverflowNewLeadFail,
  editOverflowRetainerLeadFail,
  editOverflowRetainerLeadSuccess,
} from 'presentation/redux/actions/leadSetting/overflowSetting';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { getString } from 'presentation/theme/localization';
import LeadSettingUseCase from '../../../../../domain/usecases/leadSetting';
import LeadSettingHelper, { ILeadData, ILeadRank } from '../LeadSettingHelper';
import destroyWhen from '../../../../../shared/helper/operator';
import { PageActionTypes } from '../../../actions/page';

const getAllNewLeadEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActionTypes.GET_ALL_NEW_LEAD),
    switchMap(() => {
      return new LeadSettingUseCase.LeadOverFlowUseCase().getAllNewLead().pipe(
        map((res: any) => {
          const data: ILeadData = res;
          const newLeadData = LeadSettingHelper.handelDataNewLead(data);
          return getAllNewLeadSuccess(newLeadData);
        }),
        destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
        catchError((error) => of(getAllNewLeadFail(error.toString())))
      );
    })
  );

const getAllRetainerLeadEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActionTypes.GET_ALL_RETAINER_LEAD),
    switchMap(() => {
      return new LeadSettingUseCase.LeadOverFlowUseCase()
        .getAllRetainerLead()
        .pipe(
          map((res: any) => {
            const data: ILeadData = res;
            const newLeadData = LeadSettingHelper.handelDataRetainerLead(data);
            return getAllRetainerLeadSuccess(newLeadData);
          }),
          destroyWhen(action$, [PageActionTypes.DESTROY_PAGE]),
          catchError((error) => of(getAllRetainerLeadFail(error.toString())))
        );
    })
  );

const editNewLead: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActionTypes.EDIT_OVERFLOW_NEWLEAD),
    exhaustMap((action: any) => {
      return new LeadSettingUseCase.EditNewLeadUseCase()
        .execute(action.payload)
        .pipe(
          mergeMap((res: any) => {
            const data: ILeadRank = res;
            const newLeadData = LeadSettingHelper.handelEditSuccess(data);
            return merge(
              of(editOverflowNewLeadSuccess(newLeadData)),
              of(
                showSnackBar({
                  isOpen: true,
                  message: getString('text.editNewLeadSuccess'),
                  status: 'success',
                })
              )
            );
          }),
          catchError((error) =>
            of(
              editOverflowNewLeadFail(action.payload),
              showSnackBar({
                isOpen: true,
                message: getString('text.editNewLeadFail', {
                  message: error.toString(),
                }),
                status: 'error',
              })
            )
          )
        );
    })
  );

const editRetainerLead: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActionTypes.EDIT_OVERFLOW_RETAINER),
    exhaustMap((action: any) => {
      return new LeadSettingUseCase.EditRetainerLeadUseCase()
        .execute(action.payload)
        .pipe(
          mergeMap((res: any) => {
            const data: ILeadRank = res;
            const newLeadData = LeadSettingHelper.handelEditSuccess(data);
            return merge(
              of(editOverflowRetainerLeadSuccess(newLeadData)),
              of(
                showSnackBar({
                  isOpen: true,
                  message: getString('text.editNewLeadSuccess'),
                  status: 'success',
                })
              )
            );
          }),
          catchError((error) =>
            of(
              editOverflowRetainerLeadFail(action.payload),
              showSnackBar({
                isOpen: true,
                message: getString('text.editRetainerLeadFail', {
                  message: error.toString(),
                }),
                status: 'error',
              })
            )
          )
        );
    })
  );

const leadSettingOverFlowEpic = combineEpics(
  getAllNewLeadEpic,
  getAllRetainerLeadEpic,
  editNewLead,
  editRetainerLead
);

export default leadSettingOverFlowEpic;
