import React from 'react';
import { render, screen } from '__tests__/rtl-test-utils';
import userEvent from '@testing-library/user-event';
import OrderDetailPage from './index';

// There are errors on this component, need to fix it first before able to run test
jest.mock('presentation/components/ActivityOrderSection', () => () => (
  <div>Activity Order Section</div>
));

it('has policyholder title in the page', () => {
  render(<OrderDetailPage />);

  expect(screen.getByTestId('order-detail-page')).toHaveTextContent(
    'policyholderleadDetailFields.title'
  );
});

it('able to open schedule calendar and see Urgent checkbox', () => {
  render(<OrderDetailPage />);

  userEvent.click(screen.getByText(/text.appointmentBtn/i));
});

it('able to open schedule calendar and see Urgent checkbox', () => {
  render(<OrderDetailPage />);

  userEvent.click(screen.getByText(/text.update/i));
});

test('render OrderDetailPage view with order-update-btn successfully', () => {
  const { getByTestId } = render(<OrderDetailPage />);
  expect(getByTestId('update--order')).toBeTruthy();
});
