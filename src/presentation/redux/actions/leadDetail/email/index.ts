import { IAction } from '../../../../../shared/interfaces/common';

// INFO: Set Leads File Information
export enum LeadActionTypes {
  GET_LIST_EMAIL = '[LeadsDetail] GET_LIST_EMAIL',
  GET_LIST_EMAIL_SUCCESS = '[LeadsDetail] GET_LIST_EMAIL_SUCCESS',
  GET_LIST_EMAIL_FAIL = '[LeadsDetail] GET_LIST_EMAIL_FAIL',

  GET_ATTACHMENT = '[LeadsDetail] GET_ATTACHMENT',
  GET_ATTACHMENT_SUCCESS = '[LeadsDetail] GET_ATTACHMENT_SUCCESS',
  GET_ATTACHMENT_FAIL = '[LeadsDetail] GET_ATTACHMENT_FAIL',

  ADD_ATTACHMENT = '[LeadsDetail] ADD_ATTACHMENT',
  ADD_ATTACHMENT_SUCCESS = '[LeadsDetail] ADD_ATTACHMENT_SUCCESS',
  ADD_ATTACHMENT_FAIL = '[LeadsDetail] ADD_ATTACHMENT_FAIL',

  UPLOAD_ATTACHMENT = '[LeadsDetail] UPLOAD_ATTACHMENT',
  UPLOAD_ATTACHMENT_SUCCESS = '[LeadsDetail] UPLOAD_ATTACHMENT_SUCCESS',
  UPLOAD_ATTACHMENT_FAIL = '[LeadsDetail] UPLOAD_ATTACHMENT_FAIL',

  SEND_EMAIL = '[LeadsDetail] SEND_EMAIL',
  SEND_EMAIL_SUCCESS = '[LeadsDetail] SEND_EMAIL_SUCCESS',
  SEND_EMAIL_FAIL = '[LeadsDetail] SEND_EMAIL_FAIL',
}

export const getListEmail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_LIST_EMAIL,
    payload,
  };
};

export const getListEmailSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_LIST_EMAIL_SUCCESS,
    payload,
  };
};

export const getListEmailFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_LIST_EMAIL_FAIL,
    payload,
  };
};

export const getAttachment = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ATTACHMENT,
    payload,
  };
};

export const getAttachmentSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ATTACHMENT_SUCCESS,
    payload,
  };
};

export const getAttachmentFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ATTACHMENT_FAIL,
    payload,
  };
};

export const addAttachment = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.ADD_ATTACHMENT,
    payload,
  };
};

export const addAttachmentSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.ADD_ATTACHMENT_SUCCESS,
    payload,
  };
};

export const uploadAttachment = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.UPLOAD_ATTACHMENT,
    payload,
  };
};

export const uploadAttachmentSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.UPLOAD_ATTACHMENT_SUCCESS,
    payload,
  };
};

export const uploadAttachmentFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.UPLOAD_ATTACHMENT_FAIL,
    payload,
  };
};

export const addAttachmentFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.ADD_ATTACHMENT_FAIL,
    payload,
  };
};

export const sendEmail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.SEND_EMAIL,
    payload,
  };
};

export const sendEmailSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.SEND_EMAIL_SUCCESS,
    payload,
  };
};

export const sendEmailFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.SEND_EMAIL_FAIL,
    payload,
  };
};
