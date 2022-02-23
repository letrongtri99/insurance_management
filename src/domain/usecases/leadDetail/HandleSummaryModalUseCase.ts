import LeadDetailRepository from 'data/repository/leadDetail';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';

export default class HandleSummaryModalUseCase implements IUseCaseObservable {
  private leadDetailRepository: LeadDetailRepository;

  constructor() {
    this.leadDetailRepository = new LeadDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = ({ leadId, comment: text }: any) => {
    return this.leadDetailRepository.postComment({ leadId, text });
  };
}
