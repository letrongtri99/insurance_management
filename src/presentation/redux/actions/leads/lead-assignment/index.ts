import { IAction } from '../../../../../shared/interfaces/common';

export enum LeadAssignmentActions {
  GET_LEAD_ASSIGNMENT = '[Leads] GET_LEAD_ASSIGNMENT',
  GET_LEAD_ASSIGNMENT_SUCCESS = '[Leads] GET_LEAD_ASSIGNMENT_SUCCESS ',
  GET_LEAD_ASSIGNMENT_FAILED = '[Leads] GET_LEAD_ASSIGNMENT_FAILED',

  GET_COMMENT_LEAD_ASSIGNMENT = '[Leads] GET_COMMENT_LEAD_ASSIGNMENT',
  GET_COMMENT_LEAD_ASSIGNMENT_SUCCESS = '[Leads] GET_COMMENT_LEAD_ASSIGNMENT_SUCCESS',

  CLEAR_LEAD_ASSIGNMENT_PAGE_STATE = '[Leads] CLEAR_LEAD_ASSIGNMENT_PAGE_STATE',
}

export const getLeadAssignment = (payload?: any): IAction<any> => {
  return {
    type: LeadAssignmentActions.GET_LEAD_ASSIGNMENT,
    payload,
  };
};

export const getLeadAssignmentSuccess = (
  payload: any,
  tableType: string
): IAction<any> => {
  return {
    type: LeadAssignmentActions.GET_LEAD_ASSIGNMENT_SUCCESS,
    payload,
    tableType,
  };
};

export const getLeadAssignmentFailed = <T = any>(
  error: T,
  payload: T
): IAction<T> => {
  return {
    type: LeadAssignmentActions.GET_LEAD_ASSIGNMENT_FAILED,
    error,
    payload,
  };
};

export const getCommentLeadAssignment = (payload: any): IAction<any> => {
  return {
    type: LeadAssignmentActions.GET_COMMENT_LEAD_ASSIGNMENT,
    payload,
  };
};

export const getCommentLeadAssignmentSuccess = (
  payload: any,
  totalItem: number
): IAction<any> => {
  return {
    type: LeadAssignmentActions.GET_COMMENT_LEAD_ASSIGNMENT_SUCCESS,
    payload,
    totalItem,
  };
};

export const clearLeadAssignmentPageState = (payload?: any): IAction<any> => {
  return {
    type: LeadAssignmentActions.CLEAR_LEAD_ASSIGNMENT_PAGE_STATE,
    payload,
  };
};
