import ImportFileRepository from 'data/repository/importFile';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';

export default class ImportLeadCSVUseCase implements IUseCaseObservable {
  private importFileRepository: ImportFileRepository;

  constructor() {
    this.importFileRepository = new ImportFileRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (payload) => {
    return this.importFileRepository.importCSV(payload);
  };
}
