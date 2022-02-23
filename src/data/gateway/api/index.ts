import * as CONSTANTS from 'shared/constants';
import {
  API_METHOD,
  INIT_INTERVAL_RETRY_MS,
  MAX_RETRIES_API,
  STATUS_RETRY_API,
} from 'shared/constants';
import { ajax } from 'rxjs/ajax';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenType } from '../../constants';
import StorageGateway from '../storage';
import Type, { EndPointWithType } from './type';
import { IResource } from '../../../shared/interfaces/common/resource';
import ResponseModel from '../../../models/response';
import { retryBackoff } from '../../helper/retryBackOff';
import LocalStorage, {
  LOCALSTORAGE_KEY,
} from '../../../shared/helper/LocalStorage';

type apiRequestFn = (resource: IResource, body?: any) => Observable<any>;

class ApiGateway {
  _configTimeout = 30000;

  _endpoint: string;

  _gateway: string;

  _accessToken: string;

  _adminUsername: string;

  _adminPassword: string;

  _googleApiKey: string;

  _resource?: IResource;

  _localStorageService: LocalStorage;

  static createAPIConnection(settings: any): any {
    return new ApiGateway(settings);
  }

  constructor(settings: any) {
    const {
      endpoint,
      gateway,
      accessToken,
      adminUsername,
      adminPassword,
      googleApiKey,
    } = settings;
    this._endpoint = endpoint || process.env.REACT_APP_API_ENDPOINT;
    this._gateway = gateway || process.env.REACT_APP_GATEWAY_ENDPOINT;
    this._adminUsername = adminUsername;
    this._adminPassword = adminPassword;
    this._accessToken = accessToken;
    this._googleApiKey = googleApiKey;
    this._localStorageService = new LocalStorage();
  }

  getEndpoint = (resourceType: string): string => {
    if (resourceType === Type.Public) {
      return this._endpoint;
    }
    if (resourceType === Type.Nest) {
      return this._gateway;
    }
    if (resourceType === Type.Attachment) {
      return EndPointWithType.ATTACHMENT;
    }
    return this._endpoint;
  };

  getParam = (params: { [key: string]: string }): string => {
    const paramString = Object.keys(params).reduce(
      (accumulator, currentValue, currentIndex) =>
        `${accumulator}${currentIndex === 0 ? '' : '&'}${currentValue}=${
          params[currentValue]
        }`,
      ''
    );
    return paramString;
  };

  customHeaderConfig = (requestType: string) => {
    if (process.env.NODE_ENV === 'development' && requestType === Type.Nest) {
      const userId = this._localStorageService.getItemByKey(
        LOCALSTORAGE_KEY.USER_ID
      );
      return {
        ...this.headerConfig(),
        'Grpc-Metadata-Rabbit-User-Id': userId || '',
      };
    }
    return this.headerConfig();
  };

  callApiHandle = (
    resource: IResource | string | any,
    method?: API_METHOD,
    body?: any
  ) => {
    let url: string;
    if (typeof resource === 'string') {
      url = resource;
    } else {
      const { Path } = resource;
      const endpoint = this.getEndpoint(resource.Type);
      url = `${endpoint}${Path}`;
    }
    const startTime = Date.now();
    return ajax({
      method,
      url,
      headers: this.customHeaderConfig(resource.Type),
      body,
      withCredentials: true,
    }).pipe(
      map((res) => {
        return {
          ...res,
          responseTimes: Date.now() - startTime,
        };
      }),
      map(this._handleAjaxSuccess),
      catchError((error) => throwError(this.handleAjaxError(error))),
      retryBackoff({
        initialInterval: INIT_INTERVAL_RETRY_MS, // INFO: exponent (1,2,4,8)
        maxRetries: MAX_RETRIES_API, // INFO: max retry api is three time
        shouldRetry: (error) => {
          if (error.code) {
            // INFO: retry api when status code of server > 500
            return error.code >= STATUS_RETRY_API;
          }
          return false;
        },
      })
    );
  };

  uploadFile = (url: string, body: File) => {
    const headers: any = {
      'x-goog-content-length-range': '0,10485760',
      'Content-Type': `${body.type}`,
    };
    return ajax({
      method: 'PUT',
      url,
      headers,
      body,
    });
  };

  uploadCSVFile = (url: string, body: File, headerData: any = null) => {
    const headers: any = {
      ...(Boolean(headerData) && { ...headerData }),
    };

    return ajax({
      method: 'PUT',
      url,
      headers,
      body,
    });
  };

  doGetAjaxRequest: apiRequestFn = (resource) => {
    return this.callApiHandle(resource, API_METHOD.GET);
  };

  doPostAjaxRequest: apiRequestFn = (resource, body?) => {
    return this.callApiHandle(resource, API_METHOD.POST, body);
  };

  doPutAjaxRequest: apiRequestFn = (resource, body?) => {
    return this.callApiHandle(resource, API_METHOD.PUT, body);
  };

  doPatchAjaxRequest: apiRequestFn = (resource, body?) => {
    return this.callApiHandle(resource, API_METHOD.PATCH, body);
  };

  doDeleteAjaxRequest: apiRequestFn = (resource) => {
    return this.callApiHandle(resource, API_METHOD.DELETE);
  };

  doAjaxRequest = (
    resource: IResource | string,
    method: API_METHOD,
    body?: any
  ): Observable<any> => {
    return this.callApiHandle(resource, method, body);
  };

  headerConfig = (): any => {
    const headers: any = {};
    headers['Content-Type'] = 'application/json';
    return headers;
  };

  _handleAjaxSuccess = (
    response: any
  ): ResponseModel<any> | Observable<ResponseModel<any>> => {
    const { status } = response;
    if (status >= 200 && status < 300) {
      let newResponse = {};
      if (response?.response.length) {
        newResponse = {
          selectData: response.response,
          responseTimes: response.responseTimes,
        };
      } else {
        newResponse = {
          ...response.response,
          responseTimes: response.responseTimes,
        };
      }
      return ResponseModel.createSuccess(newResponse);
    }
    return ResponseModel.createError(status, response.response);
  };

  handleAjaxError = (error: any): any => {
    let status = 0;
    let message = '';
    let params;
    let errors;
    if (error.response) {
      // server was received message, but response smt
      status = error.status;
      message =
        error.response.message || this._createDefaultMessage(error.response);
      params = error.response.parameters;
      if (error.response.errors) {
        errors = error.response.errors;
      }

      if (status >= 200 && status < 300) {
        return this._handleAjaxSuccess(error.response);
      }

      const rawDataText = error.response;
      if (rawDataText && typeof rawDataText === 'string') {
        try {
          const errorObj = JSON.parse(rawDataText);
          if (errorObj) {
            message = errorObj.MESSAGE;
          }
        } catch (err) {
          message = err.toString();
        }
      }
    } else {
      // smt went wrong
      status = error.status;
      message = CONSTANTS.netWorkErrorMessage;
    }
    return ResponseModel.createError(status, message, params, errors);
  };

  _getTokenFromType = (type: string): any => {
    switch (type) {
      case Type.Customer:
        return this._getCustomerToken();
      case Type.Admin:
        return this._getAdminToken();
      default:
        return this._getCustomerToken();
    }
  };

  _getCustomerToken = (): any => {
    return StorageGateway.doGetString(TokenType.Customer);
  };

  _getAdminToken = (): any => {
    return StorageGateway.doGetString(TokenType.Admin);
    // return this._accessToken;
  };

  _createDefaultMessage = (errorList: any): string => {
    if (errorList) {
      return Object.entries(errorList)
        .map(([key, value]) => `${key} : ${value}`)
        .join(',');
    }
    return '';
  };
}

export default ApiGateway;
