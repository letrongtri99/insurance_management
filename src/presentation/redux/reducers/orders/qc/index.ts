import { IAction, IState } from 'shared/interfaces/common';
import { QCModuleActions } from 'presentation/redux/actions/orders/qc';
import {
  formatOrderDocuments,
  formatNumber,
} from 'presentation/components/OrderListingTable/helper';

const initialState: IState<any> & { totalItem?: number } & {
  pageState: any;
  listCheckBox?: any;
} = {
  data: [],
  listCheckBox: [],
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

export default function QCModuleReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case QCModuleActions.GET_QC_MODULE: {
      return {
        ...state,
        isFetching: true,
        pageState: {
          pageSize: state.pageState.pageSize,
          currentPage: state.pageState.currentPage,
        },
      };
    }
    case QCModuleActions.GET_QC_MODULE_SUCCESS: {
      const formatOrders = formatOrderDocuments(
        action.payload.data.orders,
        'qcAgent'
      );
      return {
        ...state,
        data: formatOrders,
        success: true,
        isFetching: false,
        totalItem: formatNumber(action.payload.data.total),
      };
    }
    case QCModuleActions.GET_QC_MODULE_FAILED: {
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
