import ApiGateway from 'data/gateway/api';
import { RabbitResource } from 'data/gateway/api/resource';
import getConfig from '../../setting';

const apiGateway = ApiGateway.createAPIConnection(getConfig());

const getOrdersList = (body: any, productName: string) => {
  const getOrdersListResource = RabbitResource.Order.getOrdersList(
    body,
    productName
  );
  return apiGateway.doGetAjaxRequest(getOrdersListResource, body);
};

export default { getOrdersList };
