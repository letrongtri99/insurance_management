import LeadRepository from 'data/repository/lead';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import { executeWithPayloadFn } from '../../../../shared/interfaces/common';

export default class GetLeadParticipantUseCase implements IUseCaseObservable {
  private leadRepository: LeadRepository;

  constructor() {
    this.leadRepository = new LeadRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (payload) => {
    return this.leadRepository.getLeadParticipants(payload);
  };
}
