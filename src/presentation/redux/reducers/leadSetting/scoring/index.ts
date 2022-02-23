import { ScoringActionTypes } from 'presentation/redux/actions/leadSetting/scoringSetting';
import { IAction, IState } from '../../../../../shared/interfaces/common';
import customListLeadScore, {
  leadScoreUpdate,
  leadScoreUpdateFailed,
  leadScoreUpdateSuccess,
} from './scoringReducer.helper';
import ReducerHelper from '../../helper';

const initialState: IState<any> = ReducerHelper.baseReducer();

export default function (state = initialState, action: IAction<any>): any {
  switch (action.type) {
    case ScoringActionTypes.GET_LIST_LEAD_SCORE:
      return ReducerHelper.baseProcessRequest(state, {
        ...action,
        isLoading: true,
      });
    case ScoringActionTypes.GET_LIST_LEAD_SCORE_SUCCESS: {
      return ReducerHelper.baseProcessSuccess(
        state,
        customListLeadScore(action)
      );
    }

    case ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME:
      return ReducerHelper.baseProcessSuccess(state, {
        ...action,
        payload: leadScoreUpdate(state, action),
      });

    case ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME_SUCCESS: {
      return ReducerHelper.baseProcessSuccess(state, {
        ...action,
        payload: leadScoreUpdateSuccess(state, action),
        isLoading: false,
      });
    }

    case ScoringActionTypes.UPDATE_LEAD_SCORE_BY_NAME_FAILED:
      return ReducerHelper.baseProcessSuccess(state, {
        ...action,
        payload: leadScoreUpdateFailed(state, action),
        isLoading: false,
      });

    case ScoringActionTypes.GET_LIST_LEAD_SCORE_FAILED:
      return ReducerHelper.baseProcessFailed(state, {
        ...action,
        isLoading: false,
      });
    default:
      return state;
  }
}
