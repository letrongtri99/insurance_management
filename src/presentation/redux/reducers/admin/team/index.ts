import { combineReducers } from 'redux';
import listReducer from './listTeam';
import editReducer from './editTeam';
import createTeamReducer from './createTeam';
import listTeamNameReducer from './listTeamName';
import teamDetailReducer from './teamDetail';

const teamReducer = combineReducers({
  createTeamReducer,
  listReducer,
  editReducer,
  listTeamNameReducer,
  teamDetailReducer,
});

export default teamReducer;
