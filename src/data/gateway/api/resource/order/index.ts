import * as CONSTANTS from 'shared/constants';
import { IResource } from 'shared/interfaces/common/resource';
import Type from '../../type';
import { getQueryParts } from '../leadSearch';

const getOrdersList = (body: any, productName: string): IResource => {
  const name = productName?.replace('products/', '') || 'car-insurance';

  const queryParts = getQueryParts(
    name,
    body.filters,
    body.pageSize,
    body.currentPage,
    body.orderBy
  );
  const path = `/${CONSTANTS.apiEndpoint.getOrdersList}?${queryParts.join(
    '&'
  )}`;

  return {
    Type: Type.Public,
    Path: path,
  };
};

export default { getOrdersList };
