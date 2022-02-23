import { IAction, IState } from '../../../../../shared/interfaces/common';
import { LeadActionTypes } from '../../../actions/leadDetail/email';
import { LeadAddEmailActionTypes } from '../../../actions/leadDetail/addEmail';

const initialState: IState<any> = {
  data: {
    loading: false,
    emails: [],
    fileUploadUrl: '',
  },
  isFetching: false,
  success: true,
  status: '',
  actionType: '',
};

export default function emailReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case LeadActionTypes.GET_LIST_EMAIL:
    case LeadActionTypes.SEND_EMAIL: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          loading: true,
        },
      };
    }
    case LeadActionTypes.GET_LIST_EMAIL_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        data: {
          ...state.data,
          loading: false,
          emails: action.payload,
        },
      };
    }
    case LeadActionTypes.GET_LIST_EMAIL_FAIL:
    case LeadActionTypes.SEND_EMAIL_FAIL: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          loading: false,
          error: action.payload,
        },
      };
    }
    case LeadActionTypes.SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        data: {
          ...state.data,
          loading: false,
        },
      };
    }
    case LeadActionTypes.ADD_ATTACHMENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          fileUploadUrl: action.payload,
          loading: false,
        },
      };
    }
    case LeadAddEmailActionTypes.REPLY_EMAIL: {
      return {
        ...state,
        isFetching: true,
        data: {
          ...state.data,
          emailReplyTo: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
