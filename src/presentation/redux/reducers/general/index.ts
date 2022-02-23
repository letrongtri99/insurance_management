import { combineReducers } from 'redux';
import { IAction, IState } from '../../../../shared/interfaces/common';

const initialState: IState<any> = {
  data: {},
  isFetching: false,
  success: true,
  status: '',
  actionType: '',
};

export function initReducer(state = initialState, action: IAction<any>): any {
  switch (action.type) {
    default:
      return state;
  }
}

export const homeInitReducer = combineReducers({
  initReducer,
});
