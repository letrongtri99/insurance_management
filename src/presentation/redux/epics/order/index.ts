import { ofType, combineEpics } from 'redux-observable';
import {
  catchError,
  concatMap,
  map,
  pluck,
  switchMap,
  mergeAll,
  withLatestFrom,
  delayWhen,
} from 'rxjs/operators';
import {
  epicWithStateFn,
  epicWithDependencies,
} from 'shared/interfaces/common';
import { forkJoin, Observable, of, merge } from 'rxjs';
import * as CONSTANTS from 'shared/constants';
import SelectorUseCase from 'domain/usecases/order';
import {
  OrdersAllActions,
  getOrdersAllSuccess,
  getOrdersAllFailed,
} from 'presentation/redux/actions/orders/all';
import {
  OrdersDocumentsActions,
  getOrdersDocumentsSuccess,
  getOrdersDocumentsFailed,
} from 'presentation/redux/actions/orders/documents';
import {
  QCModuleActions,
  getQCModuleSuccess,
  getQCModuleFailed,
} from 'presentation/redux/actions/orders/qc';
import { delayLoading } from '../../../../shared/helper/operator';
import {
  OrderActionTypes,
  getDetailSuccess,
  getDetailFailed,
  updateOrderSuccess,
  updateOrderFailed,
  updateCustomerSuccess,
  updateCustomerFailed,
} from '../../actions/order';
import { showSnackBar } from '../../actions/ui';
import { getString } from '../../../theme/localization';
import {
  uploadDocumentSelectorEpic,
  deleteDocumentEpic,
  getUploadedDocumentsEpic,
} from './document';

interface IOptionalResponse {
  customer?: any;
  supervisor?: any;
  salesAgent?: any;
}

export const fetchOrderEpic: epicWithDependencies = (
  action$,
  state$,
  { apiServices: { OrderApi, CustomerApi, UserApi } }
) =>
  action$.pipe(
    ofType(OrderActionTypes.GET_DETAIL),
    switchMap((action: any) => {
      const orderApi = new OrderApi();
      return orderApi.getOrder(action.payload.orderName).pipe(
        pluck('data'),
        // Waits for the previous Observable to complete before creating the next one
        concatMap((orderResponse: any) => {
          const userApi = new UserApi();
          const { customer, convertBy, supervisor } = orderResponse;
          const sourceObject: Record<string, Observable<any>> = {};

          if (customer) {
            const customerApi = new CustomerApi();
            sourceObject.customer = customerApi.getCustomer(customer);
          }

          if (convertBy) {
            sourceObject.salesAgent = userApi.getUser(convertBy);
          }

          if (supervisor) {
            sourceObject.supervisor = userApi.getUser(supervisor);
          }

          if (Object.keys(sourceObject).length) {
            return forkJoin(sourceObject).pipe(
              map((response: IOptionalResponse) => {
                const formattedOrderResponse = { ...orderResponse };

                Object.keys(response).forEach((key) => {
                  formattedOrderResponse[key] =
                    response[key as keyof IOptionalResponse]._data;
                });

                return getDetailSuccess(formattedOrderResponse);
              })
            );
          }

          return of(getDetailSuccess(orderResponse));
        }),
        catchError((error) =>
          of(
            getDetailFailed(error.toString()),
            showSnackBar({
              isOpen: true,
              message: getString('text.errorMessage', {
                message: error.toString(),
              }),
              status: CONSTANTS.snackBarConfig.type.error,
            })
          )
        )
      );
    })
  );

const updateOrderEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(OrderActionTypes.UPDATE_ORDER),
    withLatestFrom(state$.pipe(pluck('order', 'payload'))),
    switchMap(([action, state]) =>
      new SelectorUseCase.UpdateOrderUseCase(action.payload as any)
        .execute()
        .pipe(
          pluck('data'),
          map((res: any) =>
            merge(
              of(
                showSnackBar({
                  isOpen: true,
                  message: getString('text.updateOrderSuccessfully'),
                  status: CONSTANTS.snackBarConfig.type.success,
                })
              ),
              of(
                updateOrderSuccess({
                  ...state,
                  data: res.data,
                })
              )
            )
          ),
          mergeAll(),
          catchError((error) =>
            of(
              updateOrderFailed(),
              showSnackBar({
                isOpen: true,
                message: getString('text.updateOrderFailed', {
                  message: error.toString(),
                }),
                status: CONSTANTS.snackBarConfig.type.error,
              })
            )
          )
        )
    )
  );

const updateCustomerEpic: epicWithDependencies = (
  action$,
  state$,
  { apiServices: { CustomerApi } }
) =>
  action$.pipe(
    ofType(OrderActionTypes.UPDATE_CUSTOMER),
    withLatestFrom(state$.pipe(pluck('order', 'payload'))),
    switchMap(([action, state]) => {
      const customerApi = new CustomerApi();
      return customerApi
        .updateCustomer(state.customer.name, action.payload)
        .pipe(
          pluck('data'),
          map((res) =>
            merge(
              of(
                showSnackBar({
                  isOpen: true,
                  message: getString('text.updateOrderSuccessfully'),
                  status: CONSTANTS.snackBarConfig.type.success,
                })
              ),
              of(updateCustomerSuccess(res))
            )
          ),
          mergeAll(),
          catchError((error) =>
            of(
              updateCustomerFailed(error.toString()),
              showSnackBar({
                isOpen: true,
                message: getString('text.errorMessage', {
                  message: error.toString(),
                }),
                status: CONSTANTS.snackBarConfig.type.error,
              })
            )
          )
        );
    })
  );

const getOrdersDocumentsEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(OrdersDocumentsActions.GET_ORDERS_DOCUMENTS),
    withLatestFrom(
      state$.pipe(
        pluck('typeSelectorReducer', 'globalProductSelectorReducer', 'data')
      ),
      state$.pipe(pluck('ordersReducer', 'orderDocumentsReducer', 'pageState'))
    ),
    switchMap(([action, productName, pageState]) => {
      const payload = action.payload.pageSize
        ? {
            ...action.payload,
          }
        : { ...action.payload, ...pageState };

      return new SelectorUseCase.GetOrdersListUseCase()
        .execute(payload, productName)
        .pipe(
          delayWhen(delayLoading),
          map((res) => getOrdersDocumentsSuccess(res)),
          catchError((err) => of(getOrdersDocumentsFailed(err)))
        );
    })
  );

const getQCModuleEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(QCModuleActions.GET_QC_MODULE),
    withLatestFrom(
      state$.pipe(
        pluck('typeSelectorReducer', 'globalProductSelectorReducer', 'data')
      ),
      state$.pipe(pluck('ordersReducer', 'qcModuleReducer', 'pageState'))
    ),
    switchMap(([action, productName, pageState]) => {
      const payload = action.payload.pageSize
        ? {
            ...action.payload,
          }
        : { ...action.payload, ...pageState };

      return new SelectorUseCase.GetOrdersListUseCase()
        .execute(payload, productName)
        .pipe(
          delayWhen(delayLoading),
          map((res) => getQCModuleSuccess(res)),
          catchError((err) => of(getQCModuleFailed(err)))
        );
    })
  );

const getOrdersAllEpic: epicWithStateFn = (action$, state$) =>
  action$.pipe(
    ofType(OrdersAllActions.GET_ORDERS_ALL),
    withLatestFrom(
      state$.pipe(
        pluck('typeSelectorReducer', 'globalProductSelectorReducer', 'data')
      ),
      state$.pipe(pluck('ordersReducer', 'ordersAllReducer', 'pageState'))
    ),
    switchMap(([action, productName, pageState]) => {
      const payload = action.payload.pageSize
        ? {
            ...action.payload,
          }
        : { ...action.payload, ...pageState };

      return new SelectorUseCase.GetOrdersAllUseCase()
        .execute(payload, productName)
        .pipe(
          delayWhen(delayLoading),
          map((res) => getOrdersAllSuccess(res)),
          catchError((err) => of(getOrdersAllFailed(err)))
        );
    })
  );

export default combineEpics(
  fetchOrderEpic,
  updateCustomerEpic,
  uploadDocumentSelectorEpic,
  deleteDocumentEpic,
  updateOrderEpic,
  getUploadedDocumentsEpic,
  getOrdersAllEpic,
  getOrdersDocumentsEpic,
  getQCModuleEpic
);
