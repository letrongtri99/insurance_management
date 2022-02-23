import { ICreateTeam } from 'shared/interfaces/common/admin/team';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import AdminRepository from '../../../../data/repository/admin';

export default class EditTeamUseCase implements IUseCaseObservable {
  private adminRepository: AdminRepository;

  constructor(private payload: ICreateTeam, private name: string) {
    this.adminRepository = new AdminRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.adminRepository.editTeam(this.payload, this.name);
  };
}
