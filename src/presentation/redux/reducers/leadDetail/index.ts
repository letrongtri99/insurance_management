import { combineReducers } from 'redux';
import commentReducer from './comment';
import scheduleReducer from './scheduleModal';
import listAppointment from './scheduleModal/getAppointment';
import callReducer from './call';
import smsReducer from './sms';
import emailReducer from './email';
import attachmentReducer from './attachment';
import addAddressReducer from './addAddress';
import phoneReducer from './phone';
import addLeadReducer from './addLead';
import getAgentReducer from './getAgent';
import lead from './lead';
import getCarBrandReducer from './car';
import getListInsurerReducer from './insurer';
import updateLeadImportantReducer from './updateLeadImportant';
import handleSummaryModalReducer from './handleSummaryModal';
import InstallmentReducer from './installment';

const leadsDetailReducer = combineReducers({
  addAddressReducer,
  addLeadReducer,
  attachmentReducer,
  callReducer,
  commentReducer,
  emailReducer,
  getAgentReducer,
  getCarBrandReducer,
  getListInsurerReducer,
  lead,
  listAppointment,
  phoneReducer,
  scheduleReducer,
  smsReducer,
  updateLeadImportantReducer,
  handleSummaryModalReducer,
  InstallmentReducer,
});
export default leadsDetailReducer;
