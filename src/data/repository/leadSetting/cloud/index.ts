import ApiGateway from 'data/gateway/api';
import { RabbitResource } from 'data/gateway/api/resource';
import getConfig from '../../../setting';

const getAllNewLead = () => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const createUserResource = RabbitResource.LeadSetting.getAllNewlead();

  return apiGateway.doGetAjaxRequest(createUserResource);
};

const getAllRetainerlead = () => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const createUserResource = RabbitResource.LeadSetting.getAllRetainerlead();

  return apiGateway.doGetAjaxRequest(createUserResource);
};

const editNewLead = (body: any) => {
  const { name } = body;
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const createUserResource = RabbitResource.LeadSetting.editNewLead(name);

  return apiGateway.doPatchAjaxRequest(createUserResource, body);
};

const editRetainerLead = (body: any) => {
  const { name } = body;
  const apiGateway = ApiGateway.createAPIConnection(getConfig());
  const createUserResource = RabbitResource.LeadSetting.editRetainerlead(name);

  return apiGateway.doPatchAjaxRequest(createUserResource, body);
};

export default {
  getAllNewLead,
  getAllRetainerlead,
  editNewLead,
  editRetainerLead,
};
