import ScoringRepository from 'data/repository/scoring';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';

export default class GetListLeadScoreUseCase implements IUseCaseObservable {
  private scoringRepository: ScoringRepository;

  constructor() {
    this.scoringRepository = new ScoringRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.scoringRepository.GetListLeadScore();
  };
}
