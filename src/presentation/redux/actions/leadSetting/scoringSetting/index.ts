import { IAction } from 'shared/interfaces/common';

export enum ScoringActionTypes {
  GET_LIST_LEAD_SCORE = '[Scoring] GET_LIST_LEAD_SCORE',
  GET_LIST_LEAD_SCORE_SUCCESS = '[Scoring] GET_LIST_LEAD_SCORE_SUCCESS',
  GET_LIST_LEAD_SCORE_FAILED = '[Scoring] GET_LIST_LEAD_SCORE_FAILED',

  UPDATE_LEAD_SCORE_BY_NAME = '[Scoring] UPDATE_LEAD_SCORE_BY_NAME',
  UPDATE_LEAD_SCORE_BY_NAME_SUCCESS = '[Scoring] UPDATE_LEAD_SCORE_BY_NAME_SUCCESS',
  UPDATE_LEAD_SCORE_BY_NAME_FAILED = '[Scoring] UPDATE_LEAD_SCORE_BY_NAME_FAILED',
}

export const getListLeadScore = (): IAction<any> => {
  return {
    type: ScoringActionTypes.GET_LIST_LEAD_SCORE,
  };
};

export const getListLeadScoreSuccess = (payload: any): IAction<any> => {
  return {
    type: ScoringActionTypes.GET_LIST_LEAD_SCORE_SUCCESS,
    payload,
  };
};

export const getListLeadScoreFailed = (error?: string): IAction<any> => {
  return {
    type: ScoringActionTypes.GET_LIST_LEAD_SCORE_FAILED,
    error,
  };
};

export const updateLeadScoreByName = (
  payload: any,
  leadType: string
): IAction<any> => {
  return {
    type: ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME,
    payload,
    leadType,
  };
};
export const updateLeadScoreByNameSuccess = (payload: any): IAction<any> => {
  return {
    type: ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME_SUCCESS,
    payload,
  };
};

export const updateLeadScoreByNameFailed = (
  payload?: any,
  error?: string
): IAction<any> => {
  return {
    type: ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME_FAILED,
    payload,
    error,
  };
};
