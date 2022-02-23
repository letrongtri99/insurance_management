import LeadRepository from 'data/repository/lead';
import { getCommentLeadAssignmentSuccess } from 'presentation/redux/actions/leads/lead-assignment';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, pluck, withLatestFrom } from 'rxjs/operators';

export const getAllSingleCommentData = (leadData: any[]) => {
  const respostory = new LeadRepository();
  return leadData
    .map((item: any) => {
      if (item.commentId) {
        return respostory.getSingleComment(item.commentId).pipe(
          pluck('data'),
          catchError((err) => of(err))
        );
      }
      return null;
    })
    .filter(Boolean) as Observable<any>[];
};

export const mapCommentToLeadData = (
  api: Observable<any>[],
  leadData: any[],
  totalItem: number
) => {
  return forkJoin(api).pipe(
    map((res) => {
      let listData = [...leadData];
      if (res?.length) {
        const rejectionCommentInfo = res;

        rejectionCommentInfo.forEach((comment: any) => {
          if (comment.name) {
            listData = listData.map((lead: any) => {
              const leadCommentURL = comment.name.substring(
                comment.name.indexOf('leads/'),
                comment.name.indexOf('/comments')
              );
              const leadId = leadCommentURL.substring(
                leadCommentURL.indexOf('/') + 1,
                leadCommentURL.length
              );
              const temp = { ...lead };
              if (leadId === lead.leadDetailId) {
                temp.rejectionComment = comment.text;
                return temp;
              }
              return temp;
            });
          }
        });
      }
      return getCommentLeadAssignmentSuccess(listData, totalItem);
    }),
    catchError(() => of(getCommentLeadAssignmentSuccess(leadData, totalItem)))
  );
};

export const combineWithLatestFromValue = (state: any) => {
  return withLatestFrom(
    state.pipe(pluck('leadsReducer', 'leadAssignmentReducer', 'data')),
    state.pipe(pluck('leadsReducer', 'leadAssignmentReducer', 'totalItem')),
    state.pipe(pluck('leadsReducer', 'leadAssignmentReducer', 'tableType'))
  );
};

export const getCallId = (callName: string) => {
  return callName?.substring(0, callName.indexOf('/participants')) || '';
};
