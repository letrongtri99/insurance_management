import { ILeadScore } from 'shared/interfaces/common/lead/scoring';
import { Observable } from 'rxjs';
import { RabbitResource } from '../../../gateway/api/resource';
import ResponseModel from '../../../../models/response';
import getConfig from '../../../setting';
import ApiGateway from '../../../gateway/api';

const getListLeadScore = (): Observable<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const ListLeadScoreResource = RabbitResource.Scoring.getListLeadScore();
  return apiGateway.doGetAjaxRequest(ListLeadScoreResource);
};

const updateLeadScoreByName = (
  body: ILeadScore,
  params: any
): Observable<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const updateLeadScoreByNameResource =
    RabbitResource.Scoring.editLeadScoreByName(params);
  return apiGateway.doPatchAjaxRequest(updateLeadScoreByNameResource, body);
};

export default {
  getListLeadScore,
  updateLeadScoreByName,
};
