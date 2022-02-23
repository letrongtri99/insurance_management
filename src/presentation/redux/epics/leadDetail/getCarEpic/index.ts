import {
  getCarBrandSuccess,
  getCarBrandFail,
  LeadCarActionTypes,
} from 'presentation/redux/actions/leadDetail/car';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';

const getCarBySubModelEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadCarActionTypes.GET_CAR_BY_SUB_MODEL_YEAR),
    switchMap((action) => {
      return new LeadDetailUseCase.GetCarBySubModelUseCase()
        .execute(action.payload)
        .pipe(
          map((res) => getCarBrandSuccess(res)),
          catchError((error) =>
            merge(
              of(getCarBrandFail(error)),
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

export default getCarBySubModelEpic;
