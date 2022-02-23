import ApiGateway from 'data/gateway/api';
import { RabbitResource } from 'data/gateway/api/resource';
import getConfig from '../../setting';

const apiGateway = ApiGateway.createAPIConnection(getConfig());

const createOrderDocument = ({ orderName, params }: any) => {
  const createOrderDocumentResource =
    RabbitResource.OrderDetail.createOrderDocument(orderName);

  return apiGateway.doPostAjaxRequest(createOrderDocumentResource, params);
};

const deleteOrderDocument = (payload: any) => {
  const deleteOrderDocumentResource =
    RabbitResource.OrderDetail.deleteOrderDocument(payload);

  return apiGateway.doDeleteAjaxRequest(deleteOrderDocumentResource);
};

const getUploadedDocs = (orderName: string) => {
  const getUploadedDocumentsResource =
    RabbitResource.OrderDetail.getUploadedDocuments(orderName);

  return apiGateway.doGetAjaxRequest(getUploadedDocumentsResource);
};

export default {
  createOrderDocument,
  deleteOrderDocument,
  getUploadedDocs,
};
