import { IAction, IState } from 'shared/interfaces/common';
import { OrdersApprovalActions } from 'presentation/redux/actions/orders/approval';

interface InitialState extends IState<any> {
  totalItem?: number;
  pageState: {
    pageSize: number;
    currentPage: number;
  };
}

const initialState: InitialState = {
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

export default function OrdersApprovalReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case OrdersApprovalActions.GET_ORDERS_APPROVAL: {
      return {
        ...state,
        isFetching: true,
        pageState: {
          pageSize: state.pageState.pageSize,
          currentPage: state.pageState.currentPage,
        },
      };
    }
    case OrdersApprovalActions.GET_ORDERS_APPROVAL_SUCCESS: {
      return {
        ...state,
        data: [],
        success: true,
        isFetching: false,
      };
    }
    case OrdersApprovalActions.GET_ORDERS_APPROVAL_FAILED: {
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
