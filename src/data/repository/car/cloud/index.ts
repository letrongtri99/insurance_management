import { pluck } from 'rxjs/operators';
import ApiGateway from '../../../gateway/api';
import getConfig from '../../../setting';
import Type from '../../../gateway/api/type';
import * as CONSTANTS from '../../../../shared/constants';

const apiGateway = ApiGateway.createAPIConnection(getConfig());

const getCarBrandLookup = () => {
  const getCarBrandResource = {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiUrl.leadDetail.getCarGeneral}/brands?pageSize=200`,
  };
  return apiGateway
    .doGetAjaxRequest(getCarBrandResource)
    .pipe(pluck('data', 'brands'));
};

export default {
  getCarBrandLookup,
};
