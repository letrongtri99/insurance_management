import { IAction } from 'shared/interfaces/common';

export enum OrdersDocumentsActions {
  GET_ORDERS_DOCUMENTS = '[Order] GET_ORDERS_DOCUMENTS',
  GET_ORDERS_DOCUMENTS_SUCCESS = '[Order] GET_ORDERS_DOCUMENTS_SUCCESS ',
  GET_ORDERS_DOCUMENTS_FAILED = '[Order] GET_ORDERS_DOCUMENTS_FAILED',
}

export const getOrdersDocuments = (payload?: any): IAction<any> => {
  return {
    type: OrdersDocumentsActions.GET_ORDERS_DOCUMENTS,
    payload,
  };
};

export const getOrdersDocumentsSuccess = (payload?: any): IAction<any> => {
  return {
    type: OrdersDocumentsActions.GET_ORDERS_DOCUMENTS_SUCCESS,
    payload,
  };
};

export const getOrdersDocumentsFailed = (payload?: any): IAction<any> => {
  return {
    type: OrdersDocumentsActions.GET_ORDERS_DOCUMENTS_FAILED,
    payload,
  };
};
