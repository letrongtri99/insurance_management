import { Observable } from 'rxjs';
import { RabbitResource } from '../../../gateway/api/resource';
import ResponseModel from '../../../../models/response';
import getConfig from '../../../setting';
import ApiGateway from '../../../gateway/api';
import { IDistributionLead } from '../../../../shared/interfaces/common/admin/user';

const getRetainer = (): Observable<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const retainerResource = RabbitResource.Distribution.GetRetainer();
  return apiGateway.doGetAjaxRequest(retainerResource);
};

const getNewLeads = (): Observable<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const newLeadsResource = RabbitResource.Distribution.GetNewLeads();
  return apiGateway.doGetAjaxRequest(newLeadsResource);
};

const updateNewLeads = (
  body: IDistributionLead
): Observable<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const updateNewLeadsResource = RabbitResource.Distribution.UpdateNewLeads();
  return apiGateway.doPatchAjaxRequest(updateNewLeadsResource, body);
};

const updateRetainerLeads = (
  body: IDistributionLead
): Observable<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const updateRetainerLeadsResource =
    RabbitResource.Distribution.UpdateRetainerLeads();
  return apiGateway.doPatchAjaxRequest(updateRetainerLeadsResource, body);
};
export default {
  getRetainer,
  getNewLeads,
  updateNewLeads,
  updateRetainerLeads,
};
