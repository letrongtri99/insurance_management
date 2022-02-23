import { combineReducers } from 'redux';
import ordersAllReducer from './all';
import qcModuleReducer from './qc';
import orderSubmissionReducer from './submission';
import orderDocumentsReducer from './documents';
import orderApprovalReducer from './approval';
import orderAssignAgentReducer from './assignAgent';

const ordersReducer = combineReducers({
  ordersAllReducer,
  qcModuleReducer,
  orderSubmissionReducer,
  orderDocumentsReducer,
  orderApprovalReducer,
  orderAssignAgentReducer,
});

export default ordersReducer;
