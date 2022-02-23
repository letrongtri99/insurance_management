import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { switchMap, mergeMap, catchError, pluck } from 'rxjs/operators';
import {
  addAddressFail,
  addAddressSuccess,
  LeadAddressActionTypes,
} from 'presentation/redux/actions/leadDetail/addressModal';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { showSnackBar } from 'presentation/redux/actions/ui';
import LeadDetailUseCase from 'domain/usecases/leadDetail';
import { getString } from 'presentation/theme/localization';

const addAddressToLeadsEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadAddressActionTypes.ADD_ADDRESS),
    switchMap((action: any) => {
      return new LeadDetailUseCase.AddAddressToLeadsUseCase()
        .execute(action.payload)
        .pipe(
          pluck('data'),
          mergeMap((res) => {
            return of(
              addAddressSuccess(res),
              showSnackBar({
                isOpen: true,
                message: getString('text.addAddressSuccessful'),
                status: 'success',
              })
            );
          }),
          catchError((error) =>
            of(
              addAddressFail(error),
              showSnackBar({
                isOpen: true,
                message: error._message.toString(),
                status: 'error',
              })
            )
          )
        );
    })
  );

export default addAddressToLeadsEpic;
