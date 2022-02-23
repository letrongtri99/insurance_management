import { IAction } from 'shared/interfaces/common';

export enum OrdersAllActions {
  GET_ORDERS_ALL = '[Order] GET_ORDERS_ALL',
  GET_ORDERS_ALL_SUCCESS = '[Order] GET_ORDERS_ALL_SUCCESS ',
  GET_ORDERS_ALL_FAILED = '[Order] GET_ORDERS_ALL_FAILED',
}

export const getOrdersAll = (payload?: any): IAction<any> => {
  return {
    type: OrdersAllActions.GET_ORDERS_ALL,
    payload,
  };
};

export const getOrdersAllSuccess = (payload?: any): IAction<any> => {
  return {
    type: OrdersAllActions.GET_ORDERS_ALL_SUCCESS,
    payload,
  };
};

export const getOrdersAllFailed = (payload?: any): IAction<any> => {
  return {
    type: OrdersAllActions.GET_ORDERS_ALL_FAILED,
    payload,
  };
};
