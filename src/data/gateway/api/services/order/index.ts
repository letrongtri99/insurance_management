import { Observable } from 'rxjs';
import Type from '../../type';
import BaseApi from '../baseApi';

/**
 * Order service
 * {@link https://test.sabye-songkran.com/openapi/order.html#tag/OrderService}
 */
export default class OrderApi extends BaseApi {
  readonly baseUrl = '/api/order/v1alpha1';

  getListOrders(): Observable<any> {
    return this.apiGateway.doGetAjaxRequest({
      Type: Type.Public,
      Path: `${this.baseUrl}/orders`,
    });
  }

  /**
   * @param orderName Name of the order to retrieve. Must be in the form of orders/{order}.
   */
  getOrder(orderName: string): Observable<any> {
    return this.apiGateway.doGetAjaxRequest({
      Type: Type.Public,
      Path: `${this.baseUrl}/${orderName}`,
    });
  }
}
