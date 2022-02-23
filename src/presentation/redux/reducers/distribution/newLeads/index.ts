import { IAction, IState } from '../../../../../shared/interfaces/common';
import { IDistributionLead } from '../../../../../shared/interfaces/common/admin/user';
import { DistributionActionTypes } from '../../../actions/distribution';
import customLeadData from '../distributionReducer.helper';

const initialState: IState<IDistributionLead> = {
  data: {},
  isFetching: true,
  success: true,
  status: '',
  actionType: '',
};

export default function newLeadsReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case DistributionActionTypes.GET_NEW_LEADS: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case DistributionActionTypes.GET_NEW_LEADS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: customLeadData(action.payload),
      };
    }
    case DistributionActionTypes.GET_NEW_LEADS_FAILED: {
      return {
        ...state,
        isFetching: false,
        data: {},
      };
    }
    case DistributionActionTypes.UPDATE_NEW_LEADS_VALUES: {
      return {
        ...state,
        data: customLeadData(action.payload),
      };
    }
    default:
      return state;
  }
}
