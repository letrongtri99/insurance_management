import { LeadAddEmailActionTypes } from 'presentation/redux/actions/leadDetail/addEmail';
import { LeadAddressActionTypes } from 'presentation/redux/actions/leadDetail/addressModal';
import { LeadDetailGetLeadActionTypes } from 'presentation/redux/actions/leadDetail/getLeadByName';
import { LeadPhoneActionTypes } from 'presentation/redux/actions/leadDetail/phone';
import { LeadCustomerDetailActionTypes } from 'presentation/redux/actions/leadDetail/updateCustomerDetail';
import { IAction, IState } from 'shared/interfaces/common';

const initialState: IState<any> = {
  data: {
    agent: [],
    loading: false,
    calling: false,
    error: false,
  },
  isFetching: false,
  success: false,
  status: '',
  actionType: '',
};

export default function getAgentReducer(
  state = initialState,
  action: IAction<any>
) {
  switch (action.type) {
    case LeadDetailGetLeadActionTypes.GET_LEAD:
    case LeadCustomerDetailActionTypes.UPDATE_CUSTOMER_DETAIL: {
      return {
        ...state,
        isFetching: true,
        data: {
          ...state.data,
          loading: true,
          error: false,
        },
      };
    }
    case LeadDetailGetLeadActionTypes.GET_LEAD_SUCCESS:
    case LeadPhoneActionTypes.ADD_PHONE_SUCCESS:
    case LeadAddEmailActionTypes.ADD_EMAIL_SUCCESS:
    case LeadAddressActionTypes.ADD_ADDRESS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        success: true,
        data: {
          ...state.data,
          agent: action.payload,
          loading: false,
        },
      };
    }
    case LeadDetailGetLeadActionTypes.GET_LEAD_FAIL:
    case LeadCustomerDetailActionTypes.UPDATE_CUSTOMER_DETAIL_FAIL: {
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
    case LeadCustomerDetailActionTypes.UPDATE_CUSTOMER_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          agent: action.payload,
          loading: false,
        },
      };
    }
    default:
      return state;
  }
}
