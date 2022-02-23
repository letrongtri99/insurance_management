import { IAction, IState } from '../../../../../shared/interfaces/common';
import { LeadPhoneActionTypes } from '../../../actions/leadDetail/phone';

const initialState: IState<any> = {
  data: {
    loading: false,
  },
  isFetching: false,
  success: true,
  status: '',
  actionType: '',
};

export default function phoneReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case LeadPhoneActionTypes.ADD_PHONE: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          loading: true,
        },
      };
    }
    case LeadPhoneActionTypes.ADD_PHONE_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        data: {
          ...state.data,
          loading: false,
          phone: action.payload,
        },
      };
    }
    case LeadPhoneActionTypes.ADD_PHONE_FAIL: {
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
    default:
      return state;
  }
}
