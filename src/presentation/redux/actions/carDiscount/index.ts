import { IAction } from 'shared/interfaces/common';

export enum CarDiscountImportAction {
  GET_CAR_DISCOUNT_IMPORT = '[CarDiscount] GET_CAR_DISCOUNT_IMPORT',
  GET_CAR_DISCOUNT_IMPORT_SUCCESS = '[CarDiscount] GET_CAR_DISCOUNT_IMPORT_SUCCESS',
  GET_CAR_DISCOUNT_IMPORT_FAILED = '[CarDiscount] GET_CAR_DISCOUNT_IMPORT_FAILED',
}

export const getCarDiscountImport = (payload?: any): IAction<any> => {
  return {
    type: CarDiscountImportAction.GET_CAR_DISCOUNT_IMPORT,
    payload,
  };
};

export const getCarDiscountImportSuccess = (payload?: any): IAction<any> => {
  return {
    type: CarDiscountImportAction.GET_CAR_DISCOUNT_IMPORT_SUCCESS,
    payload,
  };
};

export const getCarDiscountImportFail = (payload?: any): IAction<any> => {
  return {
    type: CarDiscountImportAction.GET_CAR_DISCOUNT_IMPORT_FAILED,
    payload,
  };
};
