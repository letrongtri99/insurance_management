import { combineReducers } from 'redux';
import leadOverFlowReducer from './overflow';
import leadScoreReducer from './scoring';

const leadSettingReducer = combineReducers({
  leadOverFlowReducer,
  leadScoreReducer,
});
export default leadSettingReducer;
