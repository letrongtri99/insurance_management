import { combineEpics, ofType } from 'redux-observable';
import { merge, Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  pluck,
  switchMap,
} from 'rxjs/operators';
import {
  LeadActionTypes,
  sendEmailFail,
  sendEmailSuccess,
  getListEmail,
  getListEmailSuccess,
  getListEmailFail,
  getAttachmentFail,
  getAttachmentSuccess,
  uploadAttachmentFail,
  sendEmail,
} from 'presentation/redux/actions/leadDetail/email';
import { epicWithoutStateFn } from 'shared/interfaces/common';
import {
  LeadAddEmailActionTypes,
  addEmailFail,
  addEmailSuccess,
} from 'presentation/redux/actions/leadDetail/addEmail';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { getString } from 'presentation/theme/localization';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';
import { getLeadIdFromPath } from '../scheduleModal/scheduleModal.helper';
import addAttachmentHelper from './emailHelper';

const sendEmailEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActionTypes.SEND_EMAIL),
    switchMap((action) => {
      const newPayload = {
        ...action.payload,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.SendEmailUseCase().execute(newPayload).pipe(
        pluck('data'),
        mergeMap((res) =>
          merge(
            of(getListEmail()),
            of(sendEmailSuccess(res)),
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.sendEmailSuccess'),
                status: 'success',
              })
            )
          )
        ),
        catchError((error) =>
          merge(
            of(sendEmailFail(error)),
            of(
              showSnackBar({
                isOpen: true,
                message: error._message,
                status: 'error',
              })
            )
          )
        )
      );
    })
  );

const getListEmailEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActionTypes.GET_LIST_EMAIL),
    switchMap((action) => {
      const newPayload = {
        ...action.payload,
        leadId: getLeadIdFromPath(),
      };

      return new LeadDetailUseCase.GetListEmailUseCase()
        .execute(newPayload)
        .pipe(
          pluck('mails'),
          map((res) => {
            return getListEmailSuccess(res);
          }),
          catchError((error) =>
            merge(
              of(getListEmailFail(error)),
              of(
                showSnackBar({
                  isOpen: true,
                  message: error._message,
                  status: 'error',
                })
              )
            )
          )
        );
    })
  );

const getAttachmentEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadActionTypes.GET_ATTACHMENT),
    switchMap((action) => {
      return new LeadDetailUseCase.GetAttachmentUseCase()
        .execute(action.payload)
        .pipe(
          pluck('attachements'),
          map((res) => {
            return getAttachmentSuccess(res);
          }),
          catchError((error) => merge(of(getAttachmentFail(error))))
        );
    })
  );

const uploadAttachmentEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(LeadActionTypes.UPLOAD_ATTACHMENT),
    exhaustMap((action) => {
      const customAttachment = action.payload?.listAttachment;
      return addAttachmentHelper(customAttachment).pipe(
        map(() => sendEmail(action.payload.mailModal)),
        catchError((error) =>
          merge(
            of(uploadAttachmentFail(error)),
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.uploadAttachmentFail'),
                status: 'error',
              })
            )
          )
        )
      );
    })
  );

const addEmailEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(LeadAddEmailActionTypes.ADD_EMAIL),
    exhaustMap((action) => {
      const newPayload = {
        ...action.payload,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.AddEmailUseCase().execute(newPayload).pipe(
        pluck('data'),
        mergeMap((res) =>
          merge(
            of(addEmailSuccess(res)),
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.addEmailSuccess'),
                status: 'success',
              })
            )
          )
        ),
        catchError((error) =>
          merge(
            of(addEmailFail(error)),
            of(
              showSnackBar({
                isOpen: true,
                message: error._message,
                status: 'error',
              })
            )
          )
        )
      );
    })
  );

const leadDetailEmailEpic = combineEpics(
  sendEmailEpic,
  getListEmailEpic,
  getAttachmentEpic,
  uploadAttachmentEpic,
  addEmailEpic
);

export default leadDetailEmailEpic;
