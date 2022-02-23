import moment from 'moment';
import StorargeModel from '../../models/storageModel/index';

export default class StorageHelper {
  /**
   * @description Check stored data is valid or not
   * @param timeUnit Default is seconds
   * @static
   * @memberof StorageHelper
   */
  static isStoredDataValid = (
    storageModel: StorargeModel<any>,
    timeUnit?: 'seconds' | 'minutes' | 'hours' | 'days'
  ): any => {
    const _timeUnit = timeUnit || 'seconds';
    const createdAt = moment.unix(storageModel.createdAt);
    const { validationTime } = storageModel;
    const now = moment();
    const isValid = createdAt.add(validationTime, _timeUnit).isAfter(now);

    return isValid;
  };
}
