import { IAction } from 'shared/interfaces/common';

export enum QCModuleActions {
  GET_QC_MODULE = '[Order] GET_QC_MODULE',
  GET_QC_MODULE_SUCCESS = '[Order] GET_QC_MODULE_SUCCESS ',
  GET_QC_MODULE_FAILED = '[Order] GET_QC_MODULE_FAILED',
}

export const getQCModule = (payload?: any): IAction<any> => {
  return {
    type: QCModuleActions.GET_QC_MODULE,
    payload,
  };
};

export const getQCModuleSuccess = (payload?: any): IAction<any> => {
  return {
    type: QCModuleActions.GET_QC_MODULE_SUCCESS,
    payload,
  };
};

export const getQCModuleFailed = (payload?: any): IAction<any> => {
  return {
    type: QCModuleActions.GET_QC_MODULE_FAILED,
    payload,
  };
};
