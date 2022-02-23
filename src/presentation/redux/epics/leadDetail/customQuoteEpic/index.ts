import {
  createCustomQuoteFail,
  createCustomQuoteSuccess,
  CustomQuoteActionTypes,
} from 'presentation/redux/actions/leadDetail/customQuote';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { getString } from 'presentation/theme/localization';
import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeAll } from 'rxjs/operators';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import * as CONSTANTS from 'shared/constants';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';

export const createCustomQuoteEpic: epicWithoutStateFn = (action$) => {
  return action$.pipe(
    ofType(CustomQuoteActionTypes.CREATE_CUSTOM_QUOTE),
    exhaustMap((action) => {
      return new LeadDetailUseCase.CreateCustomQuoteUseCase()
        .execute(action)
        .pipe(
          map((res) => createCustomQuoteSuccess(res)),
          catchError((error) => {
            let errorMsg = '';
            if (error.data) {
              errorMsg = Object.entries(error.data)
                .map(([key, value]: any) => `${key} : ${value.join(', ')}`)
                .join('\n');
            }

            return merge(
              of(createCustomQuoteFail(error)),
              of(
                showSnackBar({
                  isOpen: true,
                  message: errorMsg || error.message,
                  status: 'error',
                })
              )
            );
          })
        );
    })
  );
};

export const createCustomQuoteSuccessEpic: epicWithoutStateFn = (action$) => {
  return action$.pipe(
    ofType(CustomQuoteActionTypes.CREATE_CUSTOM_QUOTE_SUCCESS),
    map(() => {
      return merge(
        of(
          showSnackBar({
            isOpen: true,
            message: getString('package.createPackageSuccessfully'),
            status: CONSTANTS.snackBarConfig.type.success,
          })
        )
      );
    }),
    mergeAll()
  );
};
