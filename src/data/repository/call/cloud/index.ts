import { RabbitResource } from 'data/gateway/api/resource';
import ResponseModel from 'models/response';
import { pluck, concatMap, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import ApiGateway from 'data/gateway/api';
import getConfig from 'data/setting';

const apiGateway = ApiGateway.createAPIConnection(getConfig());
let callName: string;
let callParticipantName: string;
let sdpAnswer: { type: string; sdp: string };

const createCall = ({
  peerConnection,
  phoneIndex,
  userName,
  leadName,
}: {
  peerConnection: any;
  phoneIndex: number;
  userName: string;
  leadName: string;
}): Observable<ResponseModel<any>> => {
  // To create a call between Agent and Lead need following these steps
  // 1. Post create call to register leads/xxxx to call service
  // 2. Add Agent as participant and update the SDP
  // 3. Wait until SDP negotiate ready before adding Lead to participant.
  // 4. Add Lead as participant
  return apiGateway
    .doPostAjaxRequest(RabbitResource.Call.CreateCallPath('calls'))
    .pipe(
      pluck('data'),
      concatMap((data: { name: string; createBy: string }) => {
        callName = data.name;
        return apiGateway.doPostAjaxRequest(
          RabbitResource.Call.CreateCallPath(`${callName}/participants`),
          {
            destination: {
              user: {
                user: userName,
              },
            },
            outgoing: false,
          }
        );
      }),
      pluck('data'),
      delay(2000),
      concatMap((data: { name: string }) => {
        callParticipantName = data.name;

        return apiGateway.doPutAjaxRequest(
          RabbitResource.Call.CreateCallPath(`${data.name}/sdps/offer`),
          JSON.stringify(peerConnection.localDescription.sdp)
        );
      }),
      delay(2000), // wait for 2 seconds before next line execute
      concatMap(() => {
        return apiGateway.doGetAjaxRequest(
          RabbitResource.Call.CreateCallPath(
            `${callParticipantName}/sdps/answer`
          )
        );
      }),
      pluck('data'),
      concatMap((answer: { type: string; sdp: string }) => {
        sdpAnswer = answer;

        return apiGateway.doPostAjaxRequest(
          RabbitResource.Call.CreateCallPath(`${callName}/participants`),
          {
            destination: {
              lead: {
                lead: leadName,
                phoneIndex,
              },
            },
            outgoing: true,
          }
        );
      }),
      concatMap(() => {
        return of({
          data: {
            callName,
            sdpAnswer,
          },
        });
      })
    );
};

const endCall = (callServerName: string): Observable<ResponseModel<any>> => {
  return apiGateway.doDeleteAjaxRequest(
    RabbitResource.Call.CreateCallPath(callServerName)
  );
};

export default {
  createCall,
  endCall,
};
