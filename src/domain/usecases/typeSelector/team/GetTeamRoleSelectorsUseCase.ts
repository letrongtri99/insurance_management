import { IGetRoleSelector } from 'shared/interfaces/common/typeSelector/role';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import SelectorRepository from '../../../../data/repository/typeSelector';

export default class GetTeamRoleSelectorsUseCase implements IUseCaseObservable {
  private selectorRepository: SelectorRepository;

  constructor(private payload: IGetRoleSelector) {
    this.selectorRepository = new SelectorRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.selectorRepository.getTeamRoleSelectors(this.payload);
  };
}
