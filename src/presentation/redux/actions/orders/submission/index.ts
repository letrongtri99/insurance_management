import { IAction } from 'shared/interfaces/common';

export enum OrderSubmissionActions {
  GET_ORDER_SUBMISSION = '[Order] GET_ORDER_SUBMISSION',
  GET_ORDER_SUBMISSION_SUCCESS = '[Order] GET_ORDER_SUBMISSION_SUCCESS ',
  GET_ORDER_SUBMISSION_FAILED = '[Order] GET_ORDER_SUBMISSION_FAILED',
}

export const getOrderSubmission = (payload?: any): IAction<any> => {
  return {
    type: OrderSubmissionActions.GET_ORDER_SUBMISSION,
    payload,
  };
};
