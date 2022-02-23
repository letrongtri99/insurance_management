import Document from './document';
import updateOrder from './updateOrder';
import GetOrders from './getOrders';

export default class OrderDetailRepository {
  /**
   * @param {any}  body - A string param.
   */
  createOrderDocument = (body: any) => {
    return Document.createOrderDocument(body);
  };

  deleteDocument = (body: any) => {
    /**
     * @param {any}  body - A string param.
     */
    return Document.deleteOrderDocument(body);
  };

  updateOrder = (body: any) => {
    /**
     * @param {any}  body - A string param.
     */
    return updateOrder.execuse(body);
  };

  assignOrder = (body: any) => {
    return updateOrder.assignOrder(body);
  };

  getUploadedDocuments = (orderName: string) => {
    return Document.getUploadedDocs(orderName);
  };

  getOrdersList = (payload: any, productName: string) => {
    return GetOrders.getOrdersList(payload, productName);
  };
}
