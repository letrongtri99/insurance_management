import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import AdminRepository from '../../../../data/repository/admin';

export default class DeleteUserUseCase implements IUseCaseObservable {
  private adminRepository: AdminRepository;

  constructor(private payload: string) {
    this.adminRepository = new AdminRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.adminRepository.deleteUser(this.payload);
  };
}
