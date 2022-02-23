import { IAction } from 'shared/interfaces/common';
import { AssignAgentActions } from 'presentation/redux/actions/orders/assignAgent';

const initialState = {
  listCheckBox: [],
};

export default function AssignAgentReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case AssignAgentActions.UPDATE_SELECTED_ORDERS: {
      let newListCheckBox = [];
      const checkItemExist = state.listCheckBox.find(
        (e: any) => e.id === action.payload.id
      );

      if (checkItemExist) {
        newListCheckBox = state.listCheckBox.filter(
          (e: any) => e.id !== action.payload.id
        );
      } else {
        newListCheckBox = [...state.listCheckBox, action.payload];
      }

      return {
        ...state,
        listCheckBox: newListCheckBox,
      };
    }
    case AssignAgentActions.CLEAR_SELECTED_ORDERS: {
      return {
        ...state,
        listCheckBox: [],
      };
    }
    default:
      return state;
  }
}
