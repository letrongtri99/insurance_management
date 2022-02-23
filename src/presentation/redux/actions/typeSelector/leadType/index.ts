import { IAction } from '../../../../../shared/interfaces/common';

// Get Lead Type Selector Types
export enum LeadTypeSelectorActionTypes {
  GET_LEAD_TYPES = '[LeadTypeSelector] GET_LEAD_TYPES',
  GET_LEAD_TYPES_SUCCESS = '[LeadTypeSelector] GET_LEAD_TYPES_SUCCESS',
  GET_LEAD_TYPES_FAIL = '[LeadTypeSelector] GET_LEAD_TYPES_FAIL',
}

export const getLeadTypeSelectorTypes = (): IAction<any> => {
  return {
    type: LeadTypeSelectorActionTypes.GET_LEAD_TYPES,
  };
};
export const getLeadTypeSelectorTypesSuccess = (
  payload?: any
): IAction<any> => {
  return {
    type: LeadTypeSelectorActionTypes.GET_LEAD_TYPES_SUCCESS,
    payload,
  };
};

export const getLeadTypeSelectorTypesFail = (
  payload?: string
): IAction<any> => {
  return {
    type: LeadTypeSelectorActionTypes.GET_LEAD_TYPES_FAIL,
    payload,
  };
};
