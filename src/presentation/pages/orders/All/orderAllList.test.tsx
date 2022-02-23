import React from 'react';
import { render, screen } from '__tests__/rtl-test-utils';
import OrderAllPage from './index';

jest.mock('presentation/components/FilterPanel2', () => () => (
  <div>Filter Section</div>
));

test('render order all list view successfully', () => {
  render(<OrderAllPage />);

  expect(screen.getByTestId('all-list-order')).toHaveTextContent(
    'Leaddetailfields.orderid'
  );
});
