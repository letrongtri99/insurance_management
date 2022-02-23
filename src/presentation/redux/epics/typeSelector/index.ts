import { combineEpics } from 'redux-observable';
import getProductSelectorTypesEpic from './product';
import getTeamSelectorTypesEpic from './team';
import getRoleSelectorTypesEpic from './role';
import getUserSelectorTypesEpic from './user';
import getLeadTypeSelectorTypesEpic from './leadType';

const selectorEpic = combineEpics(
  getProductSelectorTypesEpic,
  getTeamSelectorTypesEpic,
  getRoleSelectorTypesEpic,
  getUserSelectorTypesEpic,
  getLeadTypeSelectorTypesEpic
);
export default selectorEpic;
