import { expand, mapTo, pluck, reduce } from 'rxjs/operators';
import ApiGateway from 'data/gateway/api';
import { RabbitResource } from 'data/gateway/api/resource';
import { defer, EMPTY, race, timer } from 'rxjs';
import getConfig from '../../../setting';
import { LIMIT_TIME_SEARCH_PACKAGE } from '../../../../shared/constants/packageStaticData';

const apiGateway = ApiGateway.createAPIConnection(getConfig());

const getAllInsurer = (payload?: any) => {
  const newListInsurer = RabbitResource.Package.getAllInsurer(payload);
  return apiGateway.doGetAjaxRequest(newListInsurer).pipe(pluck('data'));
};

const getAllCarSubModel = (payload?: any) => {
  const getCarSubModelResource =
    RabbitResource.Package.getAllCarSubModel(payload);
  return apiGateway
    .doGetAjaxRequest(getCarSubModelResource)
    .pipe(pluck('data', 'submodels'));
};

const getAllCarModel = (payload?: any) => {
  const getCarModelResource = RabbitResource.Package.getAllCarModel(payload);
  return apiGateway.doGetAjaxRequest(getCarModelResource).pipe(pluck('data'));
};
const getAllInsurerIncursive = () => {
  const pageState = {
    pageSize: 100,
  };
  return getAllInsurer(pageState).pipe(
    expand((response: any) => {
      return defer(() =>
        response.nextPageToken
          ? getAllInsurer({ ...pageState, pageToken: response.nextPageToken })
          : EMPTY
      );
    }),
    pluck('insurers'),
    reduce((acc, cur: any) => {
      return acc.concat(cur);
    }, [])
  );
};

const getAllCarModelIncursive = () => {
  const pageState = {
    pageSize: 500,
  };
  return getAllCarModel(pageState).pipe(
    expand((response: any) => {
      return defer(() =>
        response.nextPageToken
          ? getAllCarModel({ ...pageState, pageToken: response.nextPageToken })
          : EMPTY
      );
    }),
    pluck('models'),
    reduce((acc, cur: any) => {
      return acc.concat(cur);
    }, [])
  );
};

const getImportedPackageHistory = (payload: any, productName: string) => {
  const getImportedPackageResource =
    RabbitResource.Package.getImportedPackageHistory(payload, productName);
  return apiGateway
    .doGetAjaxRequest(getImportedPackageResource)
    .pipe(pluck('data'));
};

const getAllCarSubModelIncursive = () => {
  const pageState = {
    pageSize: 100,
  };
  return getAllCarSubModel(pageState).pipe(
    expand((response: any) => {
      return defer(() =>
        response.nextPageToken
          ? getAllCarSubModel({
              ...pageState,
              pageToken: response.nextPageToken,
            })
          : EMPTY
      );
    }),
    pluck('submodels'),
    reduce((acc, cur: any) => {
      return acc.concat(cur);
    }, [])
  );
};

const searchPackage = (payload: string) => {
  const packagesLimit = 1000;
  const requestLimitTime = 3 * 60 * 1000; // INFO : limit time of request is 3 mins

  const searchPackageResource = (token?: string) =>
    RabbitResource.Package.searchPackage(payload, token);

  const request = (token?: string) =>
    apiGateway
      .doGetAjaxRequest(searchPackageResource(token))
      .pipe(pluck('_data'));

  let packages: any[] = [];

  const searchRequest = request().pipe(
    expand((response: any) => {
      packages = [...packages, ...response.packages];
      if (response.nextPageToken && packages.length < packagesLimit) {
        return request(response.nextPageToken);
      }
      return EMPTY;
    }),
    pluck('packages'),
    reduce((acc, cur: any) => {
      const data = acc.concat(cur);
      if (data.length > packagesLimit) {
        return data.slice(0, packagesLimit);
      }
      return data;
    }, [])
  );
  return race(
    timer(requestLimitTime).pipe(mapTo(LIMIT_TIME_SEARCH_PACKAGE)),
    searchRequest
  );
};

export default {
  getAllInsurer,
  getAllCarSubModel,
  getAllCarModel,
  getAllInsurerIncursive,
  getAllCarSubModelIncursive,
  getAllCarModelIncursive,
  getImportedPackageHistory,
  searchPackage,
};
