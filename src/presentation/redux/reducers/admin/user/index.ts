import { combineReducers } from 'redux';
import profileReducer from './profile';
import changePasswordReducer from './changePassword';
import createUserReducer from './createUser';
import listReducer from './listUser';
import listCreatedByReducer from './listCreatedBy';
import editUserReducer from './editUser';
import importUserReducer from './importUser';
import lookUpUserReducer from './lookUpUser';

const userReducer = combineReducers({
  profileReducer,
  changePasswordReducer,
  createUserReducer,
  listReducer,
  editUserReducer,
  listCreatedByReducer,
  importUserReducer,
  lookUpUserReducer,
});
export default userReducer;
