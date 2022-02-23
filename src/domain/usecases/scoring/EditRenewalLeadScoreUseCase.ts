import LeadScoreRepository from 'data/repository/scoring';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';

export default class EditRenewalLeadScoreUseCase implements IUseCaseObservable {
  private leadScoreRepository: LeadScoreRepository;

  constructor() {
    this.leadScoreRepository = new LeadScoreRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (payload) => {
    return this.leadScoreRepository.editRenewalLeadScore(payload, payload.name);
  };
}
