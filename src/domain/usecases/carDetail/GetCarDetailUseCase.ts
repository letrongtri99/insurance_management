import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';
import CarDetailRepository from 'data/repository/carDetail';

export default class GetCarDetailUseCase implements IUseCaseObservable {
  private carDetailRepository: CarDetailRepository;

  constructor(private payload: any) {
    this.carDetailRepository = new CarDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.carDetailRepository.getCarDetail(this.payload);
  };
}
