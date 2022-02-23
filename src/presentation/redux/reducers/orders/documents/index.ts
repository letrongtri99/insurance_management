import { IAction, IState } from 'shared/interfaces/common';
import { OrdersDocumentsActions } from 'presentation/redux/actions/orders/documents';
import {
  formatOrderDocuments,
  formatNumber,
} from 'presentation/components/OrderListingTable/helper';

const initialState: IState<any> & { totalItem?: number } & {
  pageState: any;
} = {
  data: [],
  isFetching: false,
  success: true,
  status: '',
  totalItem: 0,
  tableType: '',
  pageState: {
    pageSize: 15,
    currentPage: 1,
  },
};

export default function DocumentsModuleReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case OrdersDocumentsActions.GET_ORDERS_DOCUMENTS: {
      const { pageSize, currentPage, orderBy } = action.payload;
      return {
        ...state,
        isFetching: true,
        pageState: {
          pageSize: pageSize || state.pageState.pageSize,
          currentPage: currentPage || state.pageState.currentPage,
          orderBy,
        },
      };
    }
    case OrdersDocumentsActions.GET_ORDERS_DOCUMENTS_SUCCESS: {
      const formatOrders =
        formatOrderDocuments(
          action.payload?.data?.orders || [],
          'documentAgent'
        ) || [];
      return {
        ...state,
        data: formatOrders,
        success: true,
        isFetching: false,
        totalItem: formatNumber(action.payload?.data?.total),
      };
    }
    case OrdersDocumentsActions.GET_ORDERS_DOCUMENTS_FAILED: {
      return {
        ...state,
        data: [],
        success: false,
        isFetching: false,
        totalItem: 0,
      };
    }
    default:
      return state;
  }
}
