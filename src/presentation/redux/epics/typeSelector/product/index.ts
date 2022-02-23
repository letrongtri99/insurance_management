import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import {
  ProductSelectorActionTypes,
  getProductSelectorTypesFail,
  getProductSelectorTypesSuccess,
} from '../../../actions/typeSelector/product';
import SelectorUseCase from '../../../../../domain/usecases/typeSelector';

const getProductSelectorTypesEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(ProductSelectorActionTypes.GET_PRODUCT_TYPES),
    exhaustMap(() => {
      return new Observable((obs) => {
        const usecase = new SelectorUseCase.GetProductSelectorsUseCase();
        usecase
          .execute()
          .then((res) => {
            obs.next(getProductSelectorTypesSuccess(res));
            obs.complete();
          })
          .catch((error) => {
            obs.next(getProductSelectorTypesFail(error.toString()));
            obs.complete();
          });
      });
    })
  );

export default getProductSelectorTypesEpic;
