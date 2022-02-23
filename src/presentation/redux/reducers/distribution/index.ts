import { combineReducers } from 'redux';
import newLeadReducer from './newLeads';
import retainerLeadReducer from './retainerLeads';

const distributionReducer = combineReducers({
  newLeadReducer,
  retainerLeadReducer,
});

export default distributionReducer;
