import { IResource } from 'shared/interfaces/common/resource';
import * as CONSTANTS from 'shared/constants';
import Type from '../../type';

const apiUrl = '/api/order/v1alpha1';

const createOrderDocument = (orderName?: string): IResource => ({
  Type: Type.Public,
  Path: `${apiUrl}/${orderName}/documents`,
});

const deleteOrderDocument = (document: string): IResource => ({
  Type: Type.Public,
  Path: `${apiUrl}/${document}`,
});

const updateOrder = (orderName?: string): IResource => ({
  Type: Type.Public,
  Path: `${apiUrl}/${orderName}`,
});

const assignOrderToAgent = (assignType: string): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiEndpoint.orderEndpoint}/${assignType}/assign`,
});

const getUploadedDocuments = (orderName: string): IResource => ({
  Type: Type.Public,
  Path: `${apiUrl}/${orderName}/documents`,
});

export default {
  createOrderDocument,
  deleteOrderDocument,
  updateOrder,
  assignOrderToAgent,
  getUploadedDocuments,
};
