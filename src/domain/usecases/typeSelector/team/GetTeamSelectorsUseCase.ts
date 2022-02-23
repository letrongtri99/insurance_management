import { IGetTeamList } from 'shared/interfaces/common/typeSelector/team';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import SelectorRepository from '../../../../data/repository/typeSelector';

export default class GetTeamSelectorsUseCase implements IUseCaseObservable {
  private selectorRepository: SelectorRepository;

  constructor(private payload: IGetTeamList) {
    this.selectorRepository = new SelectorRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.selectorRepository.getTeamSelectors(this.payload);
  };
}
