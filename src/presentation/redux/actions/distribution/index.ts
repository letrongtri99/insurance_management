import { IAction } from '../../../../shared/interfaces/common';
import { IDistributionLead } from '../../../../shared/interfaces/common/admin/user';

export enum DistributionActionTypes {
  GET_NEW_LEADS = '[Distribution] GET_NEW_LEADS',
  GET_NEW_LEADS_SUCCESS = '[Distribution] GET_NEW_LEADS_SUCCESS',
  GET_NEW_LEADS_FAILED = '[Distribution] GET_NEW_LEADS_FAILED',

  GET_RETAINER_LEADS = '[Distribution] GET_RETAINER_LEADS',
  GET_RETAINER_LEADS_SUCCESS = '[Distribution] GET_RETAINER_LEADS_SUCCESS',
  GET_RETAINER_LEADS_FAILED = '[Distribution] GET_RETAINER_LEADS_FAILED',

  UPDATE_NEW_LEADS = '[Distribution] UPDATE_NEW_LEADS',
  UPDATE_NEW_LEADS_SUCCESS = '[Distribution] UPDATE_NEW_LEADS_SUCCESS',
  UPDATE_NEW_LEADS_FAILED = '[Distribution] UPDATE_NEW_LEADS_FAILED',

  UPDATE_RETAINER_LEADS = '[Distribution] UPDATE_RETAINER_LEADS',
  UPDATE_RETAINER_LEADS_SUCCESS = '[Distribution] UPDATE_RETAINER_LEADS_SUCCESS',
  UPDATE_RETAINER_LEADS_FAILED = '[Distribution] UPDATE_RETAINER_LEADS_FAILED',

  UPDATE_NEW_LEADS_VALUES = '[Distribution] UPDATE_NEW_LEADS_VALUES',
  UPDATE_RETAINER_LEADS_VALUES = '[Distribution] UPDATE_RETAINER_LEADS_VALUES',
}

export const getNewLeads = (): IAction<any> => {
  return {
    type: DistributionActionTypes.GET_NEW_LEADS,
  };
};

export const getNewLeadsSuccess = (
  payload: IDistributionLead
): IAction<any> => {
  return {
    type: DistributionActionTypes.GET_NEW_LEADS_SUCCESS,
    payload,
  };
};

export const getNewLeadsFailed = (error?: string): IAction<any> => {
  return {
    type: DistributionActionTypes.GET_NEW_LEADS_FAILED,
    error,
  };
};
export const getRetainerLeads = (): IAction<any> => {
  return {
    type: DistributionActionTypes.GET_RETAINER_LEADS,
  };
};

export const getRetainerLeadsSuccess = (
  payload: IDistributionLead
): IAction<any> => {
  return {
    type: DistributionActionTypes.GET_RETAINER_LEADS_SUCCESS,
    payload,
  };
};

export const getRetainerLeadsFailed = (error?: string): IAction<any> => {
  return {
    type: DistributionActionTypes.GET_RETAINER_LEADS_FAILED,
    error,
  };
};

export const updateNewLeads = (payload: IDistributionLead): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_NEW_LEADS,
    payload,
  };
};

export const updateNewLeadsSuccess = (
  payload: IDistributionLead
): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_NEW_LEADS_SUCCESS,
    payload,
  };
};

export const updateNewLeadsFailed = (error?: string): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_NEW_LEADS_FAILED,
    error,
  };
};

export const updateRetainerLeads = (
  payload: IDistributionLead
): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_RETAINER_LEADS,
    payload,
  };
};

export const updateRetainerLeadsSuccess = (
  payload: IDistributionLead
): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_RETAINER_LEADS_SUCCESS,
    payload,
  };
};

export const updateRetainerLeadsFailed = (error?: string): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_RETAINER_LEADS_FAILED,
    error,
  };
};

export const updateNewLeadsValue = (
  payload: IDistributionLead
): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_NEW_LEADS_VALUES,
    payload,
  };
};

export const updateRetainerLeadsValue = (
  payload: IDistributionLead
): IAction<any> => {
  return {
    type: DistributionActionTypes.UPDATE_RETAINER_LEADS_VALUES,
    payload,
  };
};
