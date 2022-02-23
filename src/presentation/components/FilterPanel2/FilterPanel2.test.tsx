import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import {
  INITIAL_VALUES,
  fields,
} from 'presentation/pages/orders/filter.helper';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';
import {
  getRoleAgent,
  getNotificationSuccess,
  getNotificationFailed,
  getAgentName,
  getPayloadAssign,
  getUsersByRole,
  showRenderAgentName,
  getDisable,
} from 'presentation/components/FilterPanel2/Filterpanel.helper';
import { TypeAssign } from 'presentation/components/TableAllLead/TableAllLead.helper';
import { getString } from 'presentation/theme/localization';
import { OrderType } from 'shared/constants/orderType';
import TeamRole from 'shared/constants/teamRole';
import FilterPanel, { RenderAgentName } from '.';

jest.mock('presentation/components/controls/Slider', () => () => (
  <div>Slider Section</div>
));

test('render component FilterPanel view successfully', () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const { getByTestId } = render(
    <FilterPanel
      fields={fields}
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      isOrderPage
      assignType={OrderType.All}
    />
  );
  expect(getByTestId('filter-panel')).toBeTruthy();
});

test('render component RenderAgentName successfully', () => {
  const store = configureStore();
  const { getByTestId } = render(
    <Provider store={store}>
      <RenderAgentName />
    </Provider>
  );
  expect(getByTestId('agent-name')).toBeTruthy();
});

test('get correct role agent', () => {
  const context = OrderType.QC;

  expect(getRoleAgent(context)).toEqual(TeamRole.QualityControl);

  expect(getRoleAgent(OrderType.Submission)).toEqual(TeamRole.Submission);
});

test('get agent name', () => {
  const status = TypeAssign.UNASSIGN;
  const agentName = '';

  expect(getAgentName(status, agentName)).toEqual('');
});

test('get notification success', () => {
  const status = TypeAssign.ASSIGN;

  expect(getNotificationSuccess(status)).toEqual(
    getString('text.assignedOrderSuccess')
  );
});

test('get notification success with another status', () => {
  const status = TypeAssign.UNASSIGN;

  expect(getNotificationSuccess(status)).toEqual(
    getString('text.unassignedOrderSuccess')
  );
});

test('get notification failed', () => {
  const status = TypeAssign.ASSIGN;

  expect(getNotificationFailed(status)).toEqual(
    getString('text.assignedOrderFailed')
  );
});

test('get notification failed with another status', () => {
  const status = TypeAssign.UNASSIGN;

  expect(getNotificationFailed(status)).toEqual(
    getString('text.unassignedOrderFailed')
  );
});

test('assing order to agent', () => {
  const orderList = [
    'orders/26b00184-3f6c-4407-ab43-3eac6add13c5',
    'orders/f51ec5ea-1460-4807-ab04-68160af288a7',
  ];
  const status = 'ASSIGN';
  const agentName = 'users/811420b4-5b14-4995-8eaa-9456c887c183';
  const assignType = OrderType.Document;

  expect(getPayloadAssign(orderList, status, agentName, assignType)).toEqual({
    body: {
      orderNames: [
        'orders/26b00184-3f6c-4407-ab43-3eac6add13c5',
        'orders/f51ec5ea-1460-4807-ab04-68160af288a7',
      ],
      assignedTo: 'users/811420b4-5b14-4995-8eaa-9456c887c183',
    },
    assignType: 'DOCUMENT',
  });
});

test('check reset button filter panel', () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  render(
    <FilterPanel
      fields={fields}
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    />
  );

  expect(screen.getByTestId('reset-btn').closest('button')).toHaveAttribute(
    'disabled'
  );
});

test('check assign button filter panel', () => {
  const store = configureStore();
  const { getByTestId } = render(
    <Provider store={store}>
      <RenderAgentName />
    </Provider>
  );

  expect(getByTestId('assign-btn').closest('button')).toHaveAttribute(
    'disabled'
  );

  expect(getByTestId('unassign-btn').closest('button')).toHaveAttribute(
    'disabled'
  );
});

test('check get user', () => {
  const listUsers = [
    { key: 'users/99d3685d-6931-4f08-9c75-203308549f0c', value: 'A A' },
  ];
  expect(getUsersByRole(listUsers)).toEqual([
    {
      key: 'users/99d3685d-6931-4f08-9c75-203308549f0c',
      value: 'A A',
      title: 'A A',
    },
  ]);
});

test('check get user with empty input', () => {
  expect(getUsersByRole(null)).toEqual([]);
});

test('render collapse button successfully', () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const { getByTestId } = render(
    <FilterPanel
      fields={fields}
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    />
  );
  userEvent.click(getByTestId('collapse-button'));
});

test('check showRenderAgentName run well within conditions', () => {
  expect(showRenderAgentName(true, OrderType.Approval)).toEqual(
    <RenderAgentName assignType={OrderType.Approval} />
  );
});

test('check showRenderAgentName run well outside conditions', () => {
  expect(showRenderAgentName(false, OrderType.All)).toEqual('');
});

test('check getDisable run well within conditions', () => {
  expect(getDisable('Duy Nguyen', [])).toEqual(true);
});

test('check getDisable run well outside conditions', () => {
  expect(getDisable('', ['Duy Nguyen'])).toEqual(true);
});
