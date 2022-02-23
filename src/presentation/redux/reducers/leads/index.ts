import { combineReducers } from 'redux';
import leadAssignmentReducer from './lead-assignment';
import listReducer from './import/listImport';
import leadParticipantReducers from './lead-reject-participant';
import leadRecordingReducers from './lead-reject-recording';
import createDocumentReducer from './create-document';

const leadsReducer = combineReducers({
  leadAssignmentReducer,
  listReducer,
  leadParticipantReducers,
  leadRecordingReducers,
  createDocumentReducer,
});
export default leadsReducer;
