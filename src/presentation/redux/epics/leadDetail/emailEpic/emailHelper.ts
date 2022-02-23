import { concatMap, mergeMap, pluck, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import { IAttachmentRequest } from 'presentation/components/NewMessage/newMessage.helper';
import { getLeadIdFromPath } from '../scheduleModal/scheduleModal.helper';
import LeadDetailUseCase from '../../../../../domain/usecases/leadDetail';

const addAttachmentHelper = (listAttachment: IAttachmentRequest[]) => {
  return from(listAttachment).pipe(
    concatMap((item) => {
      const newPayload = {
        ...item,
        leadId: getLeadIdFromPath(),
      };
      return new LeadDetailUseCase.CreateAttachmentUseCase()
        .execute(newPayload)
        .pipe(
          pluck('url'),
          mergeMap((res) => {
            const { file } = item;
            return new LeadDetailUseCase.UploadAttachmentUseCase().execute({
              file,
              res,
            });
          })
        );
    }),
    toArray()
  );
};
export default addAttachmentHelper;
