import { combineReducers } from 'redux';
import listReducer from './listImportCarDiscount';

const carDiscountReducer = combineReducers({
  listReducer,
});

export default carDiscountReducer;
