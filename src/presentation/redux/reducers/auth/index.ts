import {
  AUTHENTICATE,
  AUTHENTICATE_FAILED,
  AUTHENTICATE_SUCCESS,
  AUTHORIZE,
  AUTHORIZE_FAILED,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_SUSPEND,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  RESET_SUSPEND,
  UPDATE_LAST_LOGIN,
} from 'presentation/redux/actions/auth';
import { IUser } from 'shared/interfaces/common/admin/user';
import { IAction, IState } from 'shared/interfaces/common';

export interface IAuthState {
  user: IUser | undefined;
  isAuth: boolean;
  isAuthorized: boolean;
  updatedLastLogin: boolean;
  isSuspend: boolean;
}

const initialState: IState<IAuthState> = {
  data: {
    user: undefined,
    isAuth: false,
    isAuthorized: false,
    updatedLastLogin: false,
    isSuspend: false,
  },
  isFetching: false,
  success: false,
};

export function initReducer(state = initialState, action: IAction<any>): any {
  switch (action.type) {
    case AUTHORIZE:
    case LOGIN:
    case AUTHENTICATE: {
      return {
        ...state,
        isFetching: true,
        success: false,
      };
    }

    case LOGIN_SUCCESS:
    case AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
        data: {
          ...state.data,
          user: {
            id: action.payload,
          },
          isAuth: true,
        },
      };
    }

    case AUTHORIZE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
        data: {
          ...state.data,
          user: { ...state.data?.user, ...action.payload },
          isAuth: true,
          isAuthorized: true,
        },
      };
    }

    case LOGIN_FAILED:
    case AUTHORIZE_FAILED:
    case AUTHENTICATE_FAILED: {
      return {
        ...state,
        isFetching: false,
        success: true,
        data: {
          ...state.data,
          user: undefined,
          isAuth: false,
        },
      };
    }

    case UPDATE_LAST_LOGIN: {
      return {
        ...state,
        data: {
          ...state.data,
          updatedLastLogin: true,
        },
      };
    }

    case AUTHORIZE_SUSPEND: {
      return {
        ...state,
        data: {
          ...state.data,
          isSuspend: true,
        },
      };
    }

    case RESET_SUSPEND: {
      return {
        ...state,
        data: {
          ...state.data,
          isSuspend: false,
        },
      };
    }

    default:
      return state;
  }
}

export default initReducer;
