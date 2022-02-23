import { ICreateUser } from 'shared/interfaces/common/admin/user';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import AdminRepository from '../../../../data/repository/admin';

export default class EditUserUseCase implements IUseCaseObservable {
  private adminRepository: AdminRepository;

  constructor(private payload: ICreateUser, private name: string) {
    this.adminRepository = new AdminRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.adminRepository.editUser(this.payload, this.name);
  };
}
