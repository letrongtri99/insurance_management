import LeadDetailRepository from 'data/repository/leadDetail';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';

export default class AddAddressToLeadsUseCase implements IUseCaseObservable {
  private leadDetailRepository: LeadDetailRepository;

  constructor() {
    this.leadDetailRepository = new LeadDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (data) => {
    return this.leadDetailRepository.addAddressToLeads(data);
  };
}
