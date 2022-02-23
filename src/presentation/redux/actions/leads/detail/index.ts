import {
  ISummaryCall,
  ISummaryCallModal,
} from 'shared/interfaces/common/lead/detail';
import { IAction } from 'shared/interfaces/common';

export enum LeadDetailActionTypes {
  CREATE_REJECTION = '[Leads] CREATE_REJECTION',
  CREATE_REJECTION_SUCCESS = '[Leads] CREATE_REJECTION_SUCCESS',
  CREATE_REJECTION_FAILED = '[Leads] CREATE_REJECTION_FAILED',

  CALLING = '[Leads] CALLING',
  CONNECTED_CALL = '[Leads] CONNECTED_CALL',
  FAILED_CALL = '[Leads] FAILED_CALL',
  END_CALL = '[Leads] END_CALL',

  GET_CALL_PARTICIPANTS = '[Leads] GET_CALL_PARTICIPANTS',
  GET_CALL_PARTICIPANTS_SUCCESS = '[Leads] GET_CALL_PARTICIPANTS_SUCCESS',
  GET_CALL_PARTICIPANTS_FAILURE = '[Leads] GET_CALL_PARTICIPANTS_FAILURE',

  HANDLE_SUMMARY_MODAL = '[Leads] HANDLE_SUMMARY_MODAL',
  HANDLE_SUMMARY_MODAL_SUCCESS = '[Leads] HANDLE_SUMMARY_MODAL_SUCCESS',
  HANDLE_SUMMARY_MODAL_FAILURE = '[Leads] HANDLE_SUMMARY_MODAL_FAILURE',

  GET_INSTALLMENT = '[Leads] GET_INSTALLMENT',
  GET_INSTALLMENT_SUCCESS = '[Leads] GET_INSTALLMENT_SUCCESS',
  GET_INSTALLMENT_FAILURE = '[Leads] GET_INSTALLMENT_FAILURE',
}

export const createRejection = (payload?: any): IAction<ISummaryCall> => {
  return {
    type: LeadDetailActionTypes.CREATE_REJECTION,
    payload,
  };
};

export const createRejectionSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadDetailActionTypes.CREATE_REJECTION_SUCCESS,
    payload,
  };
};

export const createRejectionFailed = (error: string): IAction<any> => {
  return {
    type: LeadDetailActionTypes.CREATE_REJECTION_FAILED,
    error,
  };
};

export const calling = (payload?: any): IAction<number> => {
  return {
    type: LeadDetailActionTypes.CALLING,
    payload,
  };
};

export const connectedCall = (payload?: any): IAction<number> => {
  return {
    type: LeadDetailActionTypes.CONNECTED_CALL,
    payload,
  };
};

export const failedCall = (payload?: any): IAction<number> => {
  return {
    type: LeadDetailActionTypes.FAILED_CALL,
    payload,
  };
};

export const endCall = (payload?: any): IAction<any> => {
  return {
    type: LeadDetailActionTypes.END_CALL,
    payload,
  };
};

export const handleSummaryModal = (
  payload?: any
): IAction<ISummaryCallModal> => {
  return {
    type: LeadDetailActionTypes.HANDLE_SUMMARY_MODAL,
    payload,
  };
};

export const handleSummaryModalSuccess = (
  payload?: any
): IAction<ISummaryCallModal> => {
  return {
    type: LeadDetailActionTypes.HANDLE_SUMMARY_MODAL_SUCCESS,
    payload,
  };
};

export const handleSummaryModalFailure = (
  payload?: any
): IAction<ISummaryCallModal> => {
  return {
    type: LeadDetailActionTypes.HANDLE_SUMMARY_MODAL_FAILURE,
    payload,
  };
};

export const getInstallment = (payload?: any): IAction<ISummaryCall> => ({
  type: LeadDetailActionTypes.GET_INSTALLMENT,
  payload,
});

export const getInstallmentSuccess = (payload?: any): IAction<any> => ({
  type: LeadDetailActionTypes.GET_INSTALLMENT_SUCCESS,
  payload,
});

export const getInstallmentFailed = (error: string): IAction<any> => ({
  type: LeadDetailActionTypes.GET_INSTALLMENT_FAILURE,
  error,
});

export const getCallParticipants = (payload: any): IAction<number> => {
  return {
    type: LeadDetailActionTypes.GET_CALL_PARTICIPANTS,
    payload,
  };
};

export const getCallParticipantsSuccess = (payload: any): IAction<any> => {
  return {
    type: LeadDetailActionTypes.GET_CALL_PARTICIPANTS_SUCCESS,
    payload,
  };
};

export const getCallParticipantsFailure = (error: any): IAction<number> => {
  return {
    type: LeadDetailActionTypes.GET_CALL_PARTICIPANTS_FAILURE,
    error,
  };
};
