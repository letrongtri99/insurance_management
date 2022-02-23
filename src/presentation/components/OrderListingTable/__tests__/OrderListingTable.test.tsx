import React from 'react';
import { render } from '__tests__/rtl-test-utils';
import {
  columnSettings,
  orders,
} from 'presentation/components/OrderListingTable/helper';
import OrderListing from '..';

test('render OrderListing view successfully', () => {
  const { getByTestId } = render(
    <OrderListing orders={orders} columnSettings={columnSettings} />
  );
  expect(getByTestId('order-list-table')).toBeTruthy();
});
