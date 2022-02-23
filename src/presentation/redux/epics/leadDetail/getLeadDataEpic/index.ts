import {
  getLeadSuccess,
  getLeadFail,
  LeadDetailGetLeadActionTypes,
} from 'presentation/redux/actions/leadDetail/getLeadByName';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';
import { getLeadIdFromPath } from '../scheduleModal/scheduleModal.helper';

const getAgentEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailGetLeadActionTypes.GET_LEAD),
    switchMap((action) => {
      const newPayload = {
        ...action.payload,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.GetAgentUseCase()
        .execute(newPayload.leadId)
        .pipe(
          map((res) => getLeadSuccess(res)),
          catchError((error) => merge(of(getLeadFail(error))))
        );
    })
  );

export default getAgentEpic;
