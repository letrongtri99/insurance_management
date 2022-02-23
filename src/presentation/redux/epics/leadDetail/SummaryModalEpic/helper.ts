import { updateLeadStatusSuccess } from 'presentation/redux/actions/leadDetail/updateLeadStatus';
import { hideModal, showSnackBar } from 'presentation/redux/actions/ui';
import { getString } from 'presentation/theme/localization';
import { iif, merge, of } from 'rxjs';
import { delayWhen, mergeMap, tap } from 'rxjs/operators';
import * as CONSTANTS from 'shared/constants';
import { customForkJoin, delayLoadingForkJoin } from 'shared/helper/operator';
import LeadDetailUseCase from 'domain/usecases/leadDetail';
import { updatePostRejectValue } from 'presentation/components/controls/Services/serviceHandlePostRejections';

export const showSnackBarUpdateCommentOnly = () => {
  return merge(
    of(
      showSnackBar({
        isOpen: true,
        message: getString('text.updateRejectionSuccessfully'),
        status: CONSTANTS.snackBarConfig.type.success,
      })
    ),
    of(hideModal(CONSTANTS.ModalConfig.leadSummaryCallModal))
  );
};

export const updateReasonAndStatus = (
  sources: any[],
  hasLeadData: boolean,
  isCreateRejection: boolean
) => {
  return customForkJoin(...sources).pipe(
    delayWhen(delayLoadingForkJoin),
    mergeMap(([...apiReturn]) => {
      let leadData: any;
      let error: boolean;
      let message = '';
      apiReturn.forEach((res) => {
        if (res?.status) {
          leadData = res;
        }
        if (res?.isError) {
          error = true;
          message = res.message;
        }
      });

      return merge(
        iif(
          () => error,
          of(
            showSnackBar({
              isOpen: true,
              message: getString('text.createRejectionFail', {
                message,
              }),
              status: CONSTANTS.snackBarConfig.type.error,
            })
          ),
          iif(
            () => isCreateRejection,
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.createRejectionSuccessfully'),
                status: CONSTANTS.snackBarConfig.type.success,
              })
            ),
            of(
              showSnackBar({
                isOpen: true,
                message: getString('text.updateRejectionSuccessfully'),
                status: CONSTANTS.snackBarConfig.type.success,
              })
            )
          )
        ),
        of(hideModal(CONSTANTS.ModalConfig.leadSummaryCallModal)),
        iif(
          () => hasLeadData && leadData,
          of(updateLeadStatusSuccess(leadData))
        )
      );
    })
  );
};

export const updateLeadStatusAPI = (payload: any) => {
  return new LeadDetailUseCase.UpdateLeadStatusUseCase().execute({
    leadId: payload.leadId,
    status: payload.status,
    comment: payload.comment,
  });
};

export const updateLeadRejectReasonAPI = (payload: any) => {
  return new LeadDetailUseCase.PostLeadRejectionUseCase()
    .execute({
      leadId: payload.leadId,
      reason: payload.reason,
      comment: payload.comment,
    })
    .pipe(
      tap((response: any) => {
        if (response.name) {
          updatePostRejectValue(true);
        }
      })
    );
};
