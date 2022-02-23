import { IAction } from 'shared/interfaces/common';

export enum AssignAgentActions {
  UPDATE_SELECTED_ORDERS = '[Order] UPDATE_SELECTED_ORDERS',
  CLEAR_SELECTED_ORDERS = '[Order] CLEAR_SELECTED_ORDERS',
}

export const updateSelectedOrders = (payload?: any): IAction<any> => {
  return {
    type: AssignAgentActions.UPDATE_SELECTED_ORDERS,
    payload,
  };
};

export const clearSelectedOrders = (payload?: any): IAction<any> => {
  return {
    type: AssignAgentActions.CLEAR_SELECTED_ORDERS,
    payload,
  };
};
