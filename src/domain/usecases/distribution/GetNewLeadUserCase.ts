import DistributionRepository from 'data/repository/distribution';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';

export default class GetRetainerUseCase implements IUseCaseObservable {
  private distributionRepository: DistributionRepository;

  constructor() {
    this.distributionRepository = new DistributionRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.distributionRepository.getNewLeads();
  };
}
