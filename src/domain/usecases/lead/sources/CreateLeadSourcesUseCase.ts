import LeadRepository from 'data/repository/lead';
import { ILeadSources } from 'shared/interfaces/common/lead/sources';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';

export default class CreateLeadSourcesUseCase implements IUseCaseObservable {
  private leadRepository: LeadRepository;

  constructor() {
    this.leadRepository = new LeadRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn<ILeadSources, string> = (payload) => {
    return this.leadRepository.createLeadSources(payload);
  };
}
