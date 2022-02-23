import React from 'react';
import { render, screen } from '__tests__/rtl-test-utils';
import OrderDocumentsPage from '..';

jest.mock('presentation/components/FilterPanel2', () => () => (
  <div>Filter Section</div>
));

test('render order document list view successfully', () => {
  render(<OrderDocumentsPage />);

  expect(screen.getByTestId('order-document-page')).toHaveTextContent(
    'Leaddetailfields.orderid'
  );
});
