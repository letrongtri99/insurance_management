import DistributionRepository from 'data/repository/distribution';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';
import { IDistributionLead } from '../../../shared/interfaces/common/admin/user';

export default class UpdateNewLeadUseCase implements IUseCaseObservable {
  private distributionRepository: DistributionRepository;

  constructor(private payload: IDistributionLead) {
    this.distributionRepository = new DistributionRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.distributionRepository.updateNewLeads(this.payload);
  };
}
