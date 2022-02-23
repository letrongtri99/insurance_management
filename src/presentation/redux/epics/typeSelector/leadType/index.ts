import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import {
  LeadTypeSelectorActionTypes,
  getLeadTypeSelectorTypesFail,
  getLeadTypeSelectorTypesSuccess,
} from '../../../actions/typeSelector/leadType';
import SelectorUseCase from '../../../../../domain/usecases/typeSelector';

const getLeadTypeSelectorTypesEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadTypeSelectorActionTypes.GET_LEAD_TYPES),
    exhaustMap(() => {
      return new Observable((obs) => {
        const usecase = new SelectorUseCase.GetLeadTypeSelectorsUseCase();
        usecase
          .execute()
          .then((res) => {
            obs.next(getLeadTypeSelectorTypesSuccess(res));
            obs.complete();
          })
          .catch((error) => {
            obs.next(getLeadTypeSelectorTypesFail(error.toString()));
            obs.complete();
          });
      });
    })
  );

export default getLeadTypeSelectorTypesEpic;
