import { combineEpics } from 'redux-observable';
import { getCommentEpic, getCommentAfterCreateEpic } from './comment';

const leadActivityEpic = combineEpics(
  getCommentEpic,
  getCommentAfterCreateEpic
);

export default leadActivityEpic;
