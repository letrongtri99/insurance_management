import { combineEpics, ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { catchError, exhaustMap, mergeMap, pluck } from 'rxjs/operators';
import {
  LeadCouponActionTypes,
  addCouponSuccess,
  addCouponFail,
  deleteCouponSuccess,
  deleteCouponFail,
} from 'presentation/redux/actions/leadDetail/coupon';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { getString } from 'presentation/theme/localization';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';
import { getLeadIdFromPath } from '../scheduleModal/scheduleModal.helper';

const addCouponEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadCouponActionTypes.ADD_COUPON),
    exhaustMap((action) => {
      const newPayload = {
        ...action.payload,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.AddCouponUseCase().execute(newPayload).pipe(
        pluck('data'),
        mergeMap((res) =>
          merge(
            of(addCouponSuccess({ ...res, voucher: action.payload })),
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.addCouponSuccess'),
                status: 'success',
              })
            )
          )
        ),
        catchError((error) =>
          merge(
            of(addCouponFail(error)),
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.invalidCoupon'),
                status: 'error',
              })
            )
          )
        )
      );
    })
  );

const deleteCouponEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadCouponActionTypes.DELETE_COUPON),
    exhaustMap((action) => {
      const newPayload = {
        ...action.payload,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.DeleteCouponUseCase()
        .execute(newPayload)
        .pipe(
          pluck('data'),
          mergeMap((res) =>
            merge(
              of(deleteCouponSuccess({ ...res, voucher: '' })),
              of(
                showSnackBar({
                  isOpen: true,
                  message: getString('text.deleteCouponSuccess'),
                  status: 'success',
                })
              )
            )
          ),
          catchError((error) =>
            merge(
              of(deleteCouponFail(error)),
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

const leadDetailCouponEpic = combineEpics(addCouponEpic, deleteCouponEpic);

export default leadDetailCouponEpic;
