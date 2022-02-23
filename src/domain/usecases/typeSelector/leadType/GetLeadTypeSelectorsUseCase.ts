import { IUseCase } from '../../../../shared/interfaces/common/usecase';
import SelectorRepository from '../../../../data/repository/typeSelector';

export default class GetLeadTypeSelectorsUseCase implements IUseCase {
  private selectorRepository: SelectorRepository;

  constructor() {
    this.selectorRepository = new SelectorRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.selectorRepository.getLeadTypeSelectors().then((res) => {
        resolve(res);
      });
    });
  };
}
