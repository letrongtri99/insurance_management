import {
  AssignAgentActions,
  updateSelectedOrders,
  clearSelectedOrders,
} from '..';

it('Should updateListCheckbox run well', () => {
  const input = ['orders/123456'];
  const output = {
    type: AssignAgentActions.UPDATE_SELECTED_ORDERS,
    payload: ['orders/123456'],
  };
  expect(updateSelectedOrders(input)).toEqual(output);
});

it('Should clearListCheckbox run well', () => {
  const output = {
    type: AssignAgentActions.CLEAR_SELECTED_ORDERS,
    payload: [],
  };
  expect(clearSelectedOrders([])).toEqual(output);
});
