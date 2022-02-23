import AdminRepository from 'data/repository/admin';
import { ICreateTeam } from 'shared/interfaces/common/admin/team';
import { Observable } from 'rxjs';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import ResponseModel from '../../../../models/response';

export default class CreateAdminTeamUseCase implements IUseCaseObservable {
  private adminRepository: AdminRepository;

  constructor(private body: ICreateTeam) {
    this.adminRepository = new AdminRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (): Observable<ResponseModel<string>> => {
    return this.adminRepository.createAdminTeam(this.body);
  };
}
