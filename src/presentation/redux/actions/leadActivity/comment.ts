import { IAction } from 'shared/interfaces/common';

// INFO: Set Leads File Information
export enum LeadActivityTypes {
  CLEAR_ALL_COMMENT = '[LeadActivity] CLEAR_ALL_COMMENT',

  GET_COMMENT = '[LeadActivity] GET_COMMENT',
  GET_COMMENT_FAIL = '[LeadActivity] GET_COMMENT_FAIL',
  GET_COMMENT_SUCCESS = '[LeadActivity] GET_COMMENT_SUCCESS',

  GET_COMMENT_AFTER_CREATE = '[LeadActivity] GET_COMMENT_AFTER_CREATE',
  GET_COMMENT_AFTER_CREATE_FAIL = '[LeadActivity] GET_COMMENT_AFTER_CREATE_FAIL',
  GET_COMMENT_AFTER_CREATE_SUCCESS = '[LeadActivity] GET_COMMENT_AFTER_CREATE_SUCCESS',

  CREATE_COMMENT = '[LeadActivity] CREATE_COMMENT',
  CREATE_COMMENT_SUCCESS = '[LeadActivity] CREATE_COMMENT_SUCCESS',
  CREATE_COMMENT_FAIL = '[LeadActivity] CREATE_COMMENT_FAIL',
}

const clearComment = (payload?: any): IAction<any> => {
  return {
    type: LeadActivityTypes.CLEAR_ALL_COMMENT,
    payload,
  };
};

const getComment = (payload?: any): IAction<any> => {
  return {
    type: LeadActivityTypes.GET_COMMENT,
    payload,
  };
};

const getCommentFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActivityTypes.GET_COMMENT_FAIL,
    payload,
  };
};

const getCommentSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActivityTypes.GET_COMMENT_SUCCESS,
    payload,
  };
};

const getCommentAfterCreate = (payload?: any): IAction<any> => {
  return {
    type: LeadActivityTypes.GET_COMMENT_AFTER_CREATE,
    payload,
  };
};

const getCommentAfterCreateFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActivityTypes.GET_COMMENT_AFTER_CREATE_FAIL,
    payload,
  };
};

const getCommentAfterCreateSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActivityTypes.GET_COMMENT_AFTER_CREATE_SUCCESS,
    payload,
  };
};

export {
  clearComment,
  getComment,
  getCommentSuccess,
  getCommentFail,
  getCommentAfterCreate,
  getCommentAfterCreateFail,
  getCommentAfterCreateSuccess,
};
