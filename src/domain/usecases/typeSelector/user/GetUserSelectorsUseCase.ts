import { IGetUserList } from 'shared/interfaces/common/typeSelector/user';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import SelectorRepository from '../../../../data/repository/typeSelector';

export default class GetUserSelectorsUseCase implements IUseCaseObservable {
  private selectorRepository: SelectorRepository;

  constructor(private payload: IGetUserList) {
    this.selectorRepository = new SelectorRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.selectorRepository.getUserSelectors(this.payload);
  };
}
