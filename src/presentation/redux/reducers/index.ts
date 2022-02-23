import { combineReducers } from 'redux';
import { homeInitReducer } from './general';
import uiInitReducer from './ui';
import themeReducer from './layouts/themeReducers';
import languageReducer from './languages';
import leadsReducer from './leads';
import customerReducer from './customer';
import userReducer from './admin/user';
import typeSelectorReducer from './typeSelector';
import headerLayoutReducer from './layouts/headerLayoutReducer';
import teamReducer from './admin/team';
import distributionReducer from './distribution';
import leadSettingReducer from './leadSetting';
import leadActivityReducer from './leadActivity';
import leadsDetailReducer from './leadDetail';
import presenceReducer from './presence';
import leadSourceReducer from './leadSource';
import authReducer from './auth';
import packageReducer from './package/import';
import carDiscountReducer from './carDiscount';
import importFileReducer from './importFile';
import ordersReducer from './orders';
import orderReducer from './order';
import carDetailReducer from './carDetail';
import provinceDetailReducer from './provinceDetail';
import orderUploadDocumentReducer from './order/document';
import documentReducer from './document';

/**
 * @Todo Fix state name and normalizing state shape
 * Name State Slices Based On the Stored Data
 * {@Link https://redux.js.org/style-guide/style-guide#name-state-slices-based-on-the-stored-data}
 *
 * Normalizing State Shape
 * {@Link https://redux.js.org/usage/structuring-reducers/normalizing-state-shape}
 */
export const appReducer = combineReducers({
  authReducer,
  customerReducer,
  distributionReducer,
  headerLayoutReducer,
  homeInitReducer,
  languageReducer,
  leadActivityReducer,
  leadSettingReducer,
  leadSourceReducer,
  leadsDetailReducer,
  leadsReducer,
  presenceReducer,
  teamReducer,
  themeReducer,
  typeSelectorReducer,
  uiInitReducer,
  userReducer,
  packageReducer,
  carDiscountReducer,
  importFileReducer,
  ordersReducer,
  order: orderReducer,
  carDetailReducer,
  provinceDetailReducer,
  orderUploadDocumentReducer,
  documentReducer,
});

export const rootReducer = (state: any, action: any): any => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
