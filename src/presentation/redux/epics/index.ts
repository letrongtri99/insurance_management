import { combineEpics } from 'redux-observable';
import initAppEpic from './general/appInitiation';
import changeLanguageEpic from './general/language';
import selectorEpic from './typeSelector';
import leadEpic from './lead';
import userEpic from './admin/user';
import adminEpic from './admin/team';
import distributionEpic from './distribution';
import leadSettingEpic from './leadSetting';
import leadActivityEpic from './leadActivity';
import leadDetailEpic from './leadDetail';
import presenceEpic from './presence';
import authEpic from './auth';
import callEpic from './call';
import packageEpic from './package';
import importEpic from './importFile';
import orderEpic from './order';
import carDetailEpic from './carDetail';
import provinceDetailEpic from './provinceDetail';
import documentEpic from './document';

const rootEpic = combineEpics(
  leadActivityEpic,
  initAppEpic,
  changeLanguageEpic,
  selectorEpic,
  userEpic,
  adminEpic,
  distributionEpic,
  leadSettingEpic,
  leadEpic,
  leadDetailEpic,
  presenceEpic,
  authEpic,
  callEpic,
  packageEpic,
  importEpic,
  orderEpic,
  carDetailEpic,
  provinceDetailEpic,
  documentEpic
);
export default rootEpic;
