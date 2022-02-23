import { Observable } from 'rxjs';
import Type from '../../type';
import BaseApi from '../baseApi';

/**
 * Customer service
 * {@link https://test.sabye-songkran.com/openapi/customer.html#tag/CustomerService}
 */
export default class CustomerApi extends BaseApi {
  readonly baseUrl = '/api/customer/v1alpha1';

  getCustomers(): Observable<any> {
    return this.apiGateway.doGetAjaxRequest({
      Type: Type.Public,
      Path: `${this.baseUrl}/customers`,
    });
  }

  getCustomer(customerName: string): Observable<any> {
    return this.apiGateway.doGetAjaxRequest({
      Type: Type.Public,
      Path: `${this.baseUrl}/${customerName}`,
    });
  }

  updateCustomer(customerName: string, payload: any): Observable<any> {
    return this.apiGateway.doPatchAjaxRequest(
      {
        Type: Type.Public,
        Path: `${this.baseUrl}/${customerName}`,
      },
      payload
    );
  }
}
