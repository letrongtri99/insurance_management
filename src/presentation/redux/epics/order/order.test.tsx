import OrderApi from 'data/gateway/api/services/order';
import CustomerApi from 'data/gateway/api/services/customer';
import UserApi from 'data/gateway/api/services/user';
import { of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { fetchOrderEpic } from './index';
import { OrderActionTypes } from '../../actions/order';
import * as CONSTANTS from '../../../../shared/constants';
import { UIActionTypes } from '../../actions/ui';

jest.mock('data/gateway/api/services/user', () => {
  return jest.fn().mockImplementation(() => {
    return { getUser: () => of({ _data: { firstName: 'Diego' } }) };
  });
});

jest.mock('data/gateway/api/services/order', () => {
  return (
    jest
      .fn(() => {
        return {
          getOrder: (orderName: string) => {
            if (!orderName) {
              return throwError('Order not found!');
            }

            return of({
              data: {
                name: 'orders/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
                customer: 'customers/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
                supervisor: 'customers/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
                convertBy: 'customers/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
              },
            });
          },
        };
      })
      // Mock for first call
      .mockImplementationOnce(() => ({
        getOrder: () => {
          return of({
            data: {
              name: 'orders/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
              customer: '',
              supervisor: '',
              convertBy: '',
            },
          });
        },
      }))
  );
});

jest.mock('data/gateway/api/services/customer', () => {
  return jest.fn().mockImplementation(() => {
    return { getCustomer: () => of({ _data: { firstName: 'John' } }) };
  });
});

const state$ = of({ state: { name: 'Mock' } }); // not needed for this epic

const dependencies = {
  apiServices: {
    OrderApi,
    CustomerApi,
    UserApi,
  },
};

describe('Fetch Order Epic', () => {
  it('returns get detail success action', async () => {
    const action$ = of({
      type: OrderActionTypes.GET_DETAIL,
      payload: { orderName: 'orders/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650' },
    });

    const result$ = fetchOrderEpic(action$, state$, dependencies).pipe(
      toArray() // buffers output until Epic naturally completes()
    );

    const result = await result$.toPromise();

    expect(result).toEqual([
      {
        type: OrderActionTypes.GET_DETAIL_SUCCESS,
        payload: {
          name: 'orders/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
          customer: '',
          supervisor: '',
          convertBy: '',
        },
      },
    ]);
  });

  it('returns get detail success action with customer, sales agent, and supervisor data', async () => {
    const action$ = of({
      type: OrderActionTypes.GET_DETAIL,
      payload: { orderName: 'orders/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650' },
    });

    const result$ = fetchOrderEpic(action$, state$, dependencies).pipe(
      toArray() // buffers output until Epic naturally completes()
    );

    const result = await result$.toPromise();

    expect(result).toEqual([
      {
        type: OrderActionTypes.GET_DETAIL_SUCCESS,
        payload: {
          convertBy: 'customers/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
          name: 'orders/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650',
          customer: { firstName: 'John' },
          salesAgent: { firstName: 'Diego' },
          supervisor: { firstName: 'Diego' },
        },
      },
    ]);
  });

  it('shows showSnackBar with error message if there is an error', async () => {
    const action$ = of({
      type: OrderActionTypes.GET_DETAIL,
      payload: { fake: 'orders/69d22bc3-afd7-49e7-9a66-c1fa1e6a1650' },
    });

    const result$ = fetchOrderEpic(action$, state$, dependencies).pipe(
      toArray() // buffers output until Epic naturally completes()
    );

    const result = await result$.toPromise();

    expect(result).toEqual([
      {
        type: OrderActionTypes.GET_DETAIL_FAILED,
        payload: 'Order not found!',
      },
      {
        type: UIActionTypes.SHOW_SNACKBAR,
        payload: {
          isOpen: true,
          message: 'text.errorMessage',
          status: CONSTANTS.snackBarConfig.type.error,
        },
      },
    ]);
  });
});
