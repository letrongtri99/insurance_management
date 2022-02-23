import { IUseCase } from '../../../shared/interfaces/common/usecase';
import LanguageRepository from '../../../data/repository/language';

export default class ImportLeadUseCase implements IUseCase {
  private languageRepository: LanguageRepository;

  constructor() {
    this.languageRepository = new LanguageRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (): Promise<string> => {
    return new Promise((resolve) => {
      resolve('no data');
    });
  };
}
