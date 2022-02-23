import PackageRepository from 'data/repository/package';
import { IUseCaseObservable } from '../../../../shared/interfaces/common/usecase';
import { executeWithPayloadFn } from '../../../../shared/interfaces/common';

export default class GetImportedPackageHistoryUseCase
  implements IUseCaseObservable
{
  private packageRepository: PackageRepository;

  constructor() {
    this.packageRepository = new PackageRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (payload, productName) => {
    return this.packageRepository.getImportedPackageHistory(
      payload,
      productName
    );
  };
}
