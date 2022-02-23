import { combineReducers } from 'redux';
import productSelectorReducer from './product';
import teamSelectorReducer from './team';
import allTeamsSelectorReducer from './allTeams';
import userSelectorReducer from './user';
import leadTypeSelectorReducer from './leadType';
import roleSelectorReducer from './role';
import globalProductSelectorReducer from './globalProduct';
import insurerSelectorReducer from './insurer';

const typeSelectorReducer = combineReducers({
  teamSelectorReducer,
  allTeamsSelectorReducer,
  userSelectorReducer,
  roleSelectorReducer,
  productSelectorReducer,
  leadTypeSelectorReducer,
  globalProductSelectorReducer,
  insurerSelectorReducer,
});
export default typeSelectorReducer;
