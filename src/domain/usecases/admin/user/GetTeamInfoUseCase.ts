import UsersRepository from 'data/repository/admin/user';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';

export default class GetTeamByUserUsecase implements IUseCaseObservable {
  private userRepository: UsersRepository;

  constructor(private payload: string) {
    this.userRepository = new UsersRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.userRepository.getTeamInfo(this.payload);
  };
}
