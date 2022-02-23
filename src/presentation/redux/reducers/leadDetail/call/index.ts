import { IAction, IState } from '../../../../../shared/interfaces/common';
import { LeadDetailActionTypes } from '../../../actions/leads/detail';

const initialState: IState<any> = {
  data: {
    loading: false,
    calling: false,
    startCall: false,
    callName: '',
    sdpAnswer: {},
  },
  isFetching: false,
  success: true,
  status: '',
  actionType: '',
};

export default function callReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case LeadDetailActionTypes.CREATE_REJECTION: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          loading: true,
        },
      };
    }
    case LeadDetailActionTypes.CREATE_REJECTION_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        data: {
          ...state.data,
          loading: false,
        },
      };
    }
    case LeadDetailActionTypes.CREATE_REJECTION_FAILED: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          loading: false,
          error: action.payload,
          // calling: false,
        },
      };
    }
    case LeadDetailActionTypes.CALLING: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          calling: false,
          startCall: true,
        },
      };
    }

    case LeadDetailActionTypes.CONNECTED_CALL: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          callName: action.payload.callName,
          sdpAnswer: action.payload.sdpAnswer,
          calling: true,
          startCall: true,
        },
      };
    }

    case LeadDetailActionTypes.END_CALL: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          calling: false,
          startCall: false,
        },
      };
    }

    case LeadDetailActionTypes.GET_CALL_PARTICIPANTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          callParticipants: action.payload.participants,
        },
      };
    }

    default:
      return state;
  }
}
