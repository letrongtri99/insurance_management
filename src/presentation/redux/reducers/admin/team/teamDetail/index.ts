import { IAction, IState } from 'shared/interfaces/common';
import ReducerHelper from 'presentation/redux/reducers/helper';
import { TeamDetailSelectorActionTypes } from 'presentation/redux/actions/admin/team';

const initialState: IState<any> = ReducerHelper.baseReducer();

export default function (
  state = initialState,
  action: IAction<any>
): IState<any> {
  switch (action.type) {
    case TeamDetailSelectorActionTypes.GET_TEAM_DETAIL_TYPES:
      return ReducerHelper.baseProcessRequest(state, action);
    case TeamDetailSelectorActionTypes.GET_TEAM_DETAIL_TYPES_SUCCESS:
      return ReducerHelper.baseProcessSuccess(state, action);
    case TeamDetailSelectorActionTypes.GET_TEAM_DETAIL_TYPES_FAIL:
      return ReducerHelper.baseProcessFailed(state, action);
    default:
      return state;
  }
}
