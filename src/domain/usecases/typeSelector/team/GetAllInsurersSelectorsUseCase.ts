import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import SelectorRepository from '../../../../data/repository/typeSelector';

export default class GetAllInsurersSelectorsUseCase
  implements IUseCaseObservable
{
  private selectorRepository: SelectorRepository;

  constructor(private payload: any) {
    this.selectorRepository = new SelectorRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.selectorRepository.getAllInsurersSelectors(this.payload);
  };
}
