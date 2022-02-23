import CallCloud from './cloud';

export default class CallRepository {
  createCall = (payload: any) => {
    return CallCloud.createCall(payload);
  };

  endCall = (callName: string) => {
    return CallCloud.endCall(callName);
  };
}
