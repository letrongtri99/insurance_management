import { ofType } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  getCommentAfterCreateFail,
  getCommentAfterCreateSuccess,
  LeadActivityTypes,
} from 'presentation/redux/actions/leadActivity/comment';
import {
  getCommentSuccess,
  getCommentFail,
} from 'presentation/redux/actions/leadActivity';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import LeadUseCase from 'domain/usecases/lead';
import LookUpUserUsecase from 'domain/usecases/admin/user/lookUpUserUseCase';

import { getCommentData } from './helper';

const getCommentEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActivityTypes.GET_COMMENT),
    switchMap((action: any) => {
      return forkJoin([
        new LookUpUserUsecase().execute(),
        new LeadUseCase.GetCommentUseCase().execute(action.payload.comments),
      ]).pipe(
        map((res: any) => getCommentSuccess(getCommentData(res))),
        catchError((error: any) => of(getCommentFail(error.toString())))
      );
    })
  );

const getCommentAfterCreateEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActivityTypes.GET_COMMENT_AFTER_CREATE),
    switchMap((action: any) => {
      return forkJoin([
        new LookUpUserUsecase().execute(),
        new LeadUseCase.GetCommentUseCase().execute(action.payload.comments),
      ]).pipe(
        map((res: any) => getCommentAfterCreateSuccess(getCommentData(res))),
        catchError((error: any) =>
          of(getCommentAfterCreateFail(error.toString()))
        )
      );
    })
  );

export { getCommentEpic, getCommentAfterCreateEpic };
