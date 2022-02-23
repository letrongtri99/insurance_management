import { combineEpics } from 'redux-observable';
import leadSettingOverFlowEpic from './overFlow';
import leadSettingScoreEpic from './scoring';

const leadSettingEpic = combineEpics(
  leadSettingOverFlowEpic,
  leadSettingScoreEpic
);

export default leadSettingEpic;
