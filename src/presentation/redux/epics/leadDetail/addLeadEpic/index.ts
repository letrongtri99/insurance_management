import {
  addLeadSuccess,
  addLeadFail,
  LeadDetailAddLeadActionTypes,
} from 'presentation/redux/actions/leadDetail/addLead';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { mergeMap, catchError, pluck, exhaustMap } from 'rxjs/operators';
import { getString } from 'presentation/theme/localization';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';
import { getLeadIdFromPath } from '../scheduleModal/scheduleModal.helper';

const addLeadEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadDetailAddLeadActionTypes.ADD_LEAD),
    exhaustMap((action) => {
      const newPayload = {
        ...action.payload,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.AddLeadUseCase().execute(newPayload).pipe(
        pluck('data'),
        mergeMap((res) =>
          merge(
            of(addLeadSuccess(res)),
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.addLeadSuccess'),
                status: 'success',
              })
            )
          )
        ),
        catchError((error) =>
          merge(
            of(addLeadFail(error)),
            of(
              showSnackBar({
                isOpen: true,
                message: error._message,
                status: 'error',
              })
            )
          )
        )
      );
    })
  );

export default addLeadEpic;
