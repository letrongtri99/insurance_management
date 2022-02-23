import SelectorRepository from 'data/repository/typeSelector';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';

export default class GetAllTeamsUseCase implements IUseCaseObservable {
  private selectorRepository: SelectorRepository;

  constructor() {
    this.selectorRepository = new SelectorRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (payload) => {
    return this.selectorRepository.getAllTeamsSelectors(payload);
  };
}
