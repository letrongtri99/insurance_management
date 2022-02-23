import LeadRepository from 'data/repository/lead';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';

export default class UpdateLeadSourceScoreUseCase
  implements IUseCaseObservable
{
  private leadRepository: LeadRepository;

  constructor() {
    this.leadRepository = new LeadRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (payload) => {
    return this.leadRepository.updateLeadSourceScore(payload);
  };
}
