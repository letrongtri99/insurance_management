import {
  updateCustomerDetailSuccess,
  updateCustomerDetailFail,
  LeadCustomerDetailActionTypes,
} from 'presentation/redux/actions/leadDetail/updateCustomerDetail';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { getString } from 'presentation/theme/localization';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';
import { getLeadIdFromPath } from '../scheduleModal/scheduleModal.helper';

const updateCustomerDetailEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadCustomerDetailActionTypes.UPDATE_CUSTOMER_DETAIL),
    switchMap((action) => {
      const newPayload = {
        body: action.payload,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.UpdateLicensePlateUseCase()
        .execute(newPayload)
        .pipe(
          mergeMap((res) =>
            merge(
              of(updateCustomerDetailSuccess(res)),
              of(
                showSnackBar({
                  isOpen: true,
                  message: getString('text.updateLeadSuccess'),
                  status: 'success',
                })
              )
            )
          ),
          catchError((error) =>
            merge(
              of(updateCustomerDetailFail(error)),
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

export default updateCustomerDetailEpic;
