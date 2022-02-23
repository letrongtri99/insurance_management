import { epicWithoutStateFn, IAction } from 'shared/interfaces/common';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import {
  UploadDocumentActionTypes,
  uploadDocumentSuccess,
  uploadDocumentFail,
} from 'presentation/redux/actions/document';
import SelectorUseCase from 'domain/usecases/document';

const createDocumentSelectorEpic: epicWithoutStateFn = (action$) =>
  action$.pipe(
    ofType(UploadDocumentActionTypes.UPLOAD_DOCUMENT),
    switchMap((action: IAction<any>) =>
      new SelectorUseCase.UploadDocument(action.payload as any).execute().pipe(
        map((res) => uploadDocumentSuccess(res)),
        catchError((error) => of(uploadDocumentFail(error.toString())))
      )
    )
  );

export default createDocumentSelectorEpic;
