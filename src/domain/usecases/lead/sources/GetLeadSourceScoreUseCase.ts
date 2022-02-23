import LeadRepository from 'data/repository/lead';
import { ILeadScoreResponse } from 'shared/interfaces/common/lead/sources';
import ResponseModel from 'models/response';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';

export default class GetLeadSourceScoreUseCase implements IUseCaseObservable {
  private leadRepository: LeadRepository;

  constructor() {
    this.leadRepository = new LeadRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn<string, ResponseModel<ILeadScoreResponse>> = (
    payload
  ) => {
    return this.leadRepository.getLeadSourceScore(payload);
  };
}
