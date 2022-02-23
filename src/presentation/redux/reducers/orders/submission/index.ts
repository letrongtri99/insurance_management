import { IAction, IState } from 'shared/interfaces/common';
import { OrderSubmissionActions } from 'presentation/redux/actions/orders/submission';

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

export default function OrderSubmissionReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case OrderSubmissionActions.GET_ORDER_SUBMISSION: {
      return {
        ...state,
        isFetching: true,
        pageState: {
          pageSize: state.pageState.pageSize,
          currentPage: state.pageState.currentPage,
        },
      };
    }
    case OrderSubmissionActions.GET_ORDER_SUBMISSION_SUCCESS: {
      return {
        ...state,
        data: [],
        success: true,
        isFetching: false,
      };
    }
    case OrderSubmissionActions.GET_ORDER_SUBMISSION_FAILED: {
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
