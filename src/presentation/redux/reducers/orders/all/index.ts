import { IAction, IState } from 'shared/interfaces/common';
import { OrdersAllActions } from 'presentation/redux/actions/orders/all';
import {
  formatDocumentStatus,
  formatQCStatus,
  formatSubmissionStatus,
  formatApprovalStatus,
  formatOrderItem,
  ProductItem,
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

export const formatOrdersAll = (listOrdersAll: any[]) => {
  const data = listOrdersAll.map((item) => {
    return {
      id: item.order.name.split('/')[1],
      orderId: item.order.humanId,
      customer: `${item.customer.firstName} ${item.customer.lastName}`,
      website: 'Motor',
      paymentTerms: 'One-time',
      paymentStatus: { label: 'Paid', status: 'success' },
      totalNetPremium: '2,000',
      documentsStatus: formatDocumentStatus(item.order.documentStatus),
      qcStatus: formatQCStatus(item.order.qcStatus),
      submissionStatus: formatSubmissionStatus(item.order.submissionStatus),
      approvalStatus: formatApprovalStatus(item.order.approvalStatus),
      leadSource: 'Facebook',
      isStar: false,
      products: item.items?.map((productItem: ProductItem) =>
        formatOrderItem(productItem, item?.order?.data?.policyHolder)
      ),
      isChecked: false,
    };
  });

  return data;
};

export default function OrdersAllReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case OrdersAllActions.GET_ORDERS_ALL: {
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
    case OrdersAllActions.GET_ORDERS_ALL_SUCCESS: {
      return {
        ...state,
        data: formatOrdersAll(action.payload?.data?.orders || []) || [],
        success: true,
        isFetching: false,
        totalItem: formatNumber(action.payload?.data?.total),
      };
    }
    case OrdersAllActions.GET_ORDERS_ALL_FAILED: {
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
