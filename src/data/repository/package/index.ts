import PackageCloud from './cloud';
import { IPackageFormValue } from '../../../shared/interfaces/common/package';

export default class PackageRepository {
  /**
   *
   * @returns {Promise<ResponseModel<any>>}
   */

  getImportedPackageHistory = (payload: any, productName: string) => {
    return PackageCloud.getImportedPackageHistory(payload, productName);
  };

  searchPackage = (payload: string) => {
    return PackageCloud.searchPackage(payload);
  };
}
