import { LeadDetailGetLeadActionTypes } from 'presentation/redux/actions/leadDetail/getLeadByName';
import { LeadDetailUpdateLeadDataActionTypes } from 'presentation/redux/actions/leadDetail/updateLeadData';
import { LeadDetailUpdateLeadStatusActionTypes } from 'presentation/redux/actions/leadDetail/updateLeadStatus';
import { LeadRejectionActionTypes } from 'presentation/redux/actions/leadDetail/leadRejection';
import { IAction, IReduxState } from 'shared/interfaces/common';
import { UpdateLeadImportantActionTypes } from 'presentation/redux/actions/leadDetail/updateLeadImportant';
import { LeadCustomerDetailActionTypes } from 'presentation/redux/actions/leadDetail/updateCustomerDetail';
import { LeadCouponActionTypes } from 'presentation/redux/actions/leadDetail/coupon';

const initialState: IReduxState<any> = {
  payload: {
    important: false,
  },
  error: null,
  isFetching: false,
  success: true,
};

export default function UserLead(state = initialState, action: IAction<any>) {
  switch (action.type) {
    case LeadDetailGetLeadActionTypes.GET_LEAD:
    case LeadRejectionActionTypes.LEAD_REJECTION:
    case LeadDetailUpdateLeadStatusActionTypes.UPDATE_LEAD_STATUS:
    case LeadDetailUpdateLeadDataActionTypes.UPDATE_LEAD_DATA: {
      return {
        isFetching: true,
        payload: state.payload,
        success: false,
        error: false,
      };
    }
    case LeadDetailGetLeadActionTypes.GET_LEAD_SUCCESS:
    case LeadRejectionActionTypes.LEAD_REJECTION_SUCCESS:
    case LeadDetailUpdateLeadStatusActionTypes.UPDATE_LEAD_STATUS_SUCCESS:
    case LeadCustomerDetailActionTypes.UPDATE_CUSTOMER_DETAIL_SUCCESS:
    case LeadDetailUpdateLeadDataActionTypes.UPDATE_LEAD_DATA_SUCCESS:
    case UpdateLeadImportantActionTypes.UPDATE_LEAD_IMPORTANT_SUCCESS: {
      return {
        isFetching: false,
        error: null,
        success: true,
        payload: {
          ...state.payload,
          ...action.payload,
        },
      };
    }
    case LeadDetailGetLeadActionTypes.GET_LEAD_FAIL:
    case LeadRejectionActionTypes.LEAD_REJECTION_FAIL:
    case LeadDetailUpdateLeadStatusActionTypes.UPDATE_LEAD_STATUS_FAILED:
    case LeadDetailUpdateLeadDataActionTypes.UPDATE_LEAD_DATA_FAILED: {
      return {
        success: false,
        isFetching: false,
        payload: state.payload,
        error: action.payload,
      };
    }
    case LeadCouponActionTypes.DELETE_COUPON_SUCCESS:
    case LeadCouponActionTypes.ADD_COUPON_SUCCESS: {
      return {
        isFetching: false,
        error: null,
        success: true,
        payload: {
          ...state.payload,
          data: {
            ...state.payload.data,
            checkout: {
              ...action.payload?.voucher,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}
