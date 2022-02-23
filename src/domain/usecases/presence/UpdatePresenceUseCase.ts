import { Observable } from 'rxjs';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';
import PresenceRepository from '../../../data/repository/presence';
import { IPresence } from '../../../shared/interfaces/common/admin/user';

export default class UpdatePresenceUseCase implements IUseCaseObservable {
  private presenceRepository: PresenceRepository;

  constructor() {
    this.presenceRepository = new PresenceRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (payload?: IPresence, userName?: string): Observable<IPresence> => {
    return this.presenceRepository.updatePresence(payload, userName);
  };
}
