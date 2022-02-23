import React from 'react';
import { render, screen } from '__tests__/rtl-test-utils';
import QCModulePage from '..';

jest.mock('presentation/components/FilterPanel2', () => () => (
  <div>Filter Section</div>
));

test('render order QC Module list view successfully', () => {
  render(<QCModulePage />);

  expect(screen.getByTestId('order-qc-module-page')).toHaveTextContent(
    'Leaddetailfields.orderid'
  );
});
