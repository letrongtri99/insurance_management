import { IAction } from '../../../../../shared/interfaces/common';

// INFO: Set Leads File Information
export enum LeadSmsActionTypes {
  SEND_SMS = '[LeadsDetail] SEND_SMS',
  SEND_SMS_SUCCESS = '[LeadsDetail] SEND_SMS_SUCCESS',
  SEND_SMS_FAIL = '[LeadsDetail] SEND_SMS_FAIL',
}

export const sendSms = (payload?: any): IAction<any> => {
  return {
    type: LeadSmsActionTypes.SEND_SMS,
    payload,
  };
};

export const sendSmsSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadSmsActionTypes.SEND_SMS_SUCCESS,
    payload,
  };
};

export const sendSmsFail = (payload?: any): IAction<any> => {
  return {
    type: LeadSmsActionTypes.SEND_SMS_FAIL,
    payload,
  };
};
