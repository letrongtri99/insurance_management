import { IAction } from 'shared/interfaces/common';

export enum OrderActionTypes {
  GET_DETAIL = '[Order] GET_DETAIL',
  GET_DETAIL_SUCCESS = '[Order] GET_DETAIL_SUCCESS',
  GET_DETAIL_FAILED = '[Order] GET_DETAIL_FAIL',

  UPDATE_ORDER = '[Order] UPDATE_ORDER',
  UPDATE_ORDER_SUCCESS = '[Order] UPDATE_ORDER_SUCCESS',
  UPDATE_ORDER_FAILED = '[Order] UPDATE_ORDER_FAIL',

  UPDATE_CUSTOMER = '[Order] UPDATE_CUSTOMER',
  UPDATE_CUSTOMER_SUCCESS = '[Order] UPDATE_CUSTOMER_SUCCESS',
  UPDATE_CUSTOMER_FAILED = '[Order] UPDATE_CUSTOMER_FAIL',
}

export const getDetail = (payload: { orderName: string }): IAction<any> => {
  return {
    type: OrderActionTypes.GET_DETAIL,
    payload,
  };
};

export const getDetailSuccess = (payload: any): IAction<any> => {
  return {
    type: OrderActionTypes.GET_DETAIL_SUCCESS,
    payload,
  };
};

export const getDetailFailed = (payload: string): IAction<any> => {
  return {
    type: OrderActionTypes.GET_DETAIL_FAILED,
    payload,
  };
};

export const updateOrder = (payload: any): IAction<any> => {
  return {
    type: OrderActionTypes.UPDATE_ORDER,
    payload,
  };
};

export const updateOrderSuccess = (payload: any): IAction<any> => {
  return {
    type: OrderActionTypes.UPDATE_ORDER_SUCCESS,
    payload,
  };
};

export const updateOrderFailed = (): IAction<any> => {
  return {
    type: OrderActionTypes.UPDATE_ORDER_FAILED,
  };
};

export const updateCustomer = (payload: {
  customerName: string;
}): IAction<any> => {
  return {
    type: OrderActionTypes.UPDATE_CUSTOMER,
    payload,
  };
};

export const updateCustomerSuccess = (payload: any): IAction<any> => {
  return {
    type: OrderActionTypes.UPDATE_CUSTOMER_SUCCESS,
    payload,
  };
};

export const updateCustomerFailed = (payload: string): IAction<any> => {
  return {
    type: OrderActionTypes.UPDATE_CUSTOMER_FAILED,
    payload,
  };
};
