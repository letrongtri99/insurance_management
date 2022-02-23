import { IAction } from '../../../../../shared/interfaces/common';

// INFO: Set Leads File Information
export enum LeadActionTypes {
  GET_ALL_NEW_LEAD = '[LeadsSetting] GET_ALL_NEW_LEAD',
  GET_ALL_NEW_LEAD_SUCCESS = '[LeadsSetting] GET_ALL_NEW_LEAD_SUCCESS',
  GET_ALL_NEW_LEAD_FAIL = '[LeadsSetting] GET_ALL_NEW_LEAD_FAIL',

  GET_ALL_RETAINER_LEAD = '[LeadsSetting] GET_ALL_RETAINER_LEAD',
  GET_ALL_RETAINER_LEAD_SUCCESS = '[LeadsSetting] GET_ALL_RETAINER_LEAD_SUCCESS',
  GET_ALL_RETAINER_LEAD_FAIL = '[LeadsSetting] GET_ALL_RETAINER_LEAD_FAIL',

  EDIT_OVERFLOW_NEWLEAD = '[LeadsSetting] EDIT_OVERFLOW_NEWLEAD',
  EDIT_OVERFLOW_NEWLEAD_SUCCESS = '[LeadsSetting] EDIT_OVERFLOW_NEWLEAD_SUCCESS',
  EDIT_OVERFLOW_NEWLEAD_FAIL = '[LeadsSetting] EDIT_OVERFLOW_NEWLEAD_FAIL',

  EDIT_OVERFLOW_RETAINER = '[LeadsSetting] EDIT_OVERFLOW_RETAINER',
  EDIT_OVERFLOW_RETAINER_SUCCESS = '[LeadsSetting] EDIT_OVERFLOW_RETAINER_SUCCESS',
  EDIT_OVERFLOW_RETAINER_FAIL = '[LeadsSetting] EDIT_OVERFLOW_RETAINER_FAIL',
}

export const getAllNewLead = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ALL_NEW_LEAD,
    payload,
  };
};

export const getAllNewLeadSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ALL_NEW_LEAD_SUCCESS,
    payload,
  };
};

export const getAllNewLeadFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ALL_NEW_LEAD_FAIL,
    payload,
  };
};

export const getAllRetainerLead = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ALL_RETAINER_LEAD,
    payload,
  };
};

export const getAllRetainerLeadSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ALL_RETAINER_LEAD_SUCCESS,
    payload,
  };
};

export const getAllRetainerLeadFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.GET_ALL_RETAINER_LEAD_FAIL,
    payload,
  };
};

export const editOverflowNewLead = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.EDIT_OVERFLOW_NEWLEAD,
    payload,
  };
};

export const editOverflowNewLeadSuccess = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.EDIT_OVERFLOW_NEWLEAD_SUCCESS,
    payload,
  };
};

export const editOverflowNewLeadFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.EDIT_OVERFLOW_NEWLEAD_FAIL,
    payload,
  };
};

export const editOverflowRetainerLead = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.EDIT_OVERFLOW_RETAINER,
    payload,
  };
};

export const editOverflowRetainerLeadSuccess = (
  payload?: any
): IAction<any> => {
  return {
    type: LeadActionTypes.EDIT_OVERFLOW_RETAINER_SUCCESS,
    payload,
  };
};

export const editOverflowRetainerLeadFail = (payload?: any): IAction<any> => {
  return {
    type: LeadActionTypes.EDIT_OVERFLOW_RETAINER_FAIL,
    payload,
  };
};
