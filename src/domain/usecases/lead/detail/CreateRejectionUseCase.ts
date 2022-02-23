import LeadRepository from 'data/repository/lead';
import { Observable } from 'rxjs';
import { ISummaryCall } from 'shared/interfaces/common/lead/detail';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';

export default class CreateRejectionUseCase implements IUseCaseObservable {
  private leadRepository: LeadRepository;

  constructor() {
    this.leadRepository = new LeadRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (payload: ISummaryCall): Observable<string> => {
    return this.leadRepository.createRejection(payload);
  };
}
