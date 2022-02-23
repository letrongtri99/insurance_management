import { deepCopy } from 'shared/helper/utilities';
import { isHealthRevamp, isRebranding } from 'config/feature-flags';
import { IAction } from '../../../../shared/interfaces/common';
import { UIActionTypes } from '../../actions/ui';

interface IUIReducer {
  snackBarStatus: string;
  snackbarMessage: string;
  isSnackbarOpen: boolean;
  isEdit: boolean;
  modal: any;
  isNotClose: boolean;
  isCollapse: boolean;
  flags: Record<string, boolean>;
}

const initialState: IUIReducer = {
  isSnackbarOpen: false,
  isEdit: false,
  snackBarStatus: 'success',
  snackbarMessage: '',
  modal: null,
  isNotClose: false,
  isCollapse: false,
  flags: {
    isHealthRevamp,
    isRebranding,
  },
};

let modalConfig = null;

function uiInitReducer(state = initialState, action: IAction<any>): any {
  switch (action.type) {
    case UIActionTypes.SHOW_SNACKBAR:
      return {
        ...state,
        isSnackbarOpen: true,
        snackbarMessage: action.payload.message,
        snackBarStatus: action.payload.status,
        isNotClose: action.payload.isNotClose,
      };
    case UIActionTypes.HIDE_SNACKBAR:
      return {
        ...state,
        isSnackbarOpen: false,
      };
    case UIActionTypes.SHOW_MODAL:
      modalConfig = state.modal ? deepCopy(state.modal) : {};

      modalConfig[action.payload] = true;
      return {
        ...state,
        modal: modalConfig,
      };
    case UIActionTypes.HIDE_MODAL:
      modalConfig = state.modal ? deepCopy(state.modal) : {};

      modalConfig[action.payload] = false;
      return {
        ...state,
        modal: modalConfig,
      };
    case UIActionTypes.IS_EDIT_TRUE:
      return { ...state, isEdit: true };

    case UIActionTypes.IS_EDIT_FALSE:
      return { ...state, isEdit: false };

    case UIActionTypes.SET_COLLAPSE_STATUS:
      return { ...state, isCollapse: action.status };

    default:
      return state;
  }
}

export default uiInitReducer;
