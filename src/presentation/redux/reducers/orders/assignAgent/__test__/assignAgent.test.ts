import { AssignAgentActions } from 'presentation/redux/actions/orders/assignAgent';
import AssignAgentReducer from '..';

const initialState = {
  listCheckBox: [],
};

test('check handleReducer run with AssignAgentActions.UPDATE_SELECTED_ORDERS', () => {
  const action = {
    type: AssignAgentActions.UPDATE_SELECTED_ORDERS,
    payloads: [
      {
        id: 'o_1',
        title: 'Option 1',
        value: 'o_1',
      },
    ],
  };
  expect(AssignAgentReducer(initialState, action)).toEqual({
    listCheckBox: [undefined],
  });
});

test('check handleReducer run with AssignAgentActions.CLEAR_SELECTED_ORDERS', () => {
  const action = {
    type: AssignAgentActions.CLEAR_SELECTED_ORDERS,
  };
  expect(AssignAgentReducer(initialState, action)).toEqual({
    listCheckBox: [],
  });
});
