import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';
import ProvinceDetailRepository from 'data/repository/provinceDetail';

export default class GetProvinceUseCase implements IUseCaseObservable {
  private provinceDetailRepository: ProvinceDetailRepository;

  constructor(private payload: any) {
    this.provinceDetailRepository = new ProvinceDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.provinceDetailRepository.getProvince(this.payload);
  };
}
