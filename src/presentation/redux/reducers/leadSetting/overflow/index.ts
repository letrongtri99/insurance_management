import { IAction, IState } from '../../../../../shared/interfaces/common';
import { LeadActionTypes } from '../../../actions/leadSetting/overflowSetting';

const initialState: IState<any> = {
  data: {
    newLead: [],
    retainerLead: [],
  },
  isFetching: false,
  success: true,
  status: '',
  actionType: '',
};

export default function leadOverFlowReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case LeadActionTypes.GET_ALL_NEW_LEAD_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          newLead: action.payload,
        },
      };
    }
    case LeadActionTypes.GET_ALL_NEW_LEAD_FAIL: {
      return {
        ...state,
        data: {
          error: action.payload,
        },
      };
    }
    case LeadActionTypes.GET_ALL_RETAINER_LEAD_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          retainerLead: action.payload,
        },
      };
    }
    case LeadActionTypes.GET_ALL_RETAINER_LEAD_FAIL: {
      return {
        ...state,
        data: {},
      };
    }
    case LeadActionTypes.EDIT_OVERFLOW_NEWLEAD: {
      const leadEditItem = state.data.newLead.map((item: any) => {
        const newItem = item;
        if (newItem.name === action.payload.name) {
          newItem.loading = true;
          newItem.edit = false;
        }
        return newItem;
      });
      return {
        ...state,
        data: {
          ...state.data,
          newLead: leadEditItem,
        },
      };
    }
    case LeadActionTypes.EDIT_OVERFLOW_NEWLEAD_SUCCESS: {
      const leadEditItem = state.data.newLead.map((item: any) => {
        const newItem = item;
        if (newItem.name === action.payload.name) {
          newItem.loading = action.payload.loading;
          newItem.data = action.payload.data;
        }
        return newItem;
      });
      return {
        ...state,
        data: {
          ...state.data,
          newLead: leadEditItem,
        },
      };
    }
    case LeadActionTypes.EDIT_OVERFLOW_NEWLEAD_FAIL: {
      const leadEditItem = state.data.newLead.map((item: any) => {
        const newItem = item;
        if (newItem.name === action.payload.name) {
          newItem.loading = false;
          newItem.edit = true;
        }
        return newItem;
      });
      return {
        ...state,
        data: {
          ...state.data,
          newLead: leadEditItem,
        },
      };
    }
    case LeadActionTypes.EDIT_OVERFLOW_RETAINER: {
      const leadEditItem = state.data.newLead.map((item: any) => {
        const newItem = item;
        if (newItem.name === action.payload.name) {
          newItem.loading = true;
          newItem.edit = false;
        }
        return newItem;
      });
      return {
        ...state,
        data: {
          ...state.data,
          retainerLead: leadEditItem,
        },
      };
    }
    case LeadActionTypes.EDIT_OVERFLOW_RETAINER_SUCCESS: {
      const leadEditItem = state.data.newLead.map((item: any) => {
        const newItem = item;
        if (newItem.name === action.payload.name) {
          newItem.loading = action.payload.loading;
          newItem.data = action.payload.data;
        }
        return newItem;
      });
      return {
        ...state,
        data: {
          ...state.data,
          retainerLead: leadEditItem,
        },
      };
    }
    case LeadActionTypes.EDIT_OVERFLOW_RETAINER_FAIL: {
      const leadEditItem = state.data.newLead.map((item: any) => {
        const newItem = item;
        if (newItem.name === action.payload.name) {
          newItem.loading = false;
          newItem.edit = true;
        }
        return newItem;
      });
      return {
        ...state,
        data: {
          ...state.data,
          retainerLead: leadEditItem,
        },
      };
    }
    default:
      return state;
  }
}
