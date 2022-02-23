import { IDataList } from '../interfaces/common';

export default class DataListTransformation {
  /**
   * Transform array of data to object by index
   * @param {Array<any>} data
   * @param {string} idAttribute
   * @return {IDataList}
   */
  static transformListData = (
    data: Array<any>,
    idAttribute = '_id'
  ): IDataList<any> => {
    const result: IDataList<any> = {
      byId: {},
      ids: [],
    };

    data.forEach((item) => {
      const id = item[idAttribute];
      if (result.byId[id] === undefined) {
        result.ids.push(id);
        result.byId[id] = item;
      }
    });

    return result;
  };

  /**
   * Get array of data from object by index
   * @param {IDataList} data
   * @return {Array<any>}
   */
  static getDataArray = (data: IDataList<any>): Array<any> => {
    if (data) {
      const { ids } = data;
      const { byId } = data;

      return ids.map((id) => byId[id]);
    }
    return [];
  };
}
