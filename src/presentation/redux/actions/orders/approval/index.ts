import { IAction } from 'shared/interfaces/common';

export enum OrdersApprovalActions {
  GET_ORDERS_APPROVAL = '[Order] GET_ORDERS_APPROVAL',
  GET_ORDERS_APPROVAL_SUCCESS = '[Order] GET_ORDERS_APPROVAL_SUCCESS ',
  GET_ORDERS_APPROVAL_FAILED = '[Order] GET_ORDERS_APPROVAL_FAILED',
}

export const getOrdersApproval = (payload?: any): IAction<any> => {
  return {
    type: OrdersApprovalActions.GET_ORDERS_APPROVAL,
    payload,
  };
};
