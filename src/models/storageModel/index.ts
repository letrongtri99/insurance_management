import moment from 'moment';

export default class StorageModel<T> {
  /**
   *
   * Timestamp
   * @type {number}
   * @memberof StorageModel
   */
  createdAt: number;

  /**
   * In seconds
   * @property validationTime
   * @type {number}
   * @memberof StorageModel
   */
  validationTime: number;

  data?: T;

  constructor(data?: T) {
    this.createdAt = moment().unix();
    this.validationTime = 30 * 24 * 60 * 60;
    this.data = data;
  }
}
