import React from 'react';
import { render } from '@testing-library/react';
import OrderUpdateModal from '..';

test('render OrderUpdateModal view successfully', () => {
  const { getByTestId } = render(<OrderUpdateModal close={() => null} />);
  expect(getByTestId('order-update-modal')).toBeTruthy();
});

const Warning = (
  <ul>
    <li>Policyhoilder Info: Title</li>
    <li>Policyholder Info: DOB</li>
    <li>Vehicle: 2nd driver DOB</li>
    <li>Documents: 1st Named Driver License</li>
  </ul>
);

test('render OrderUpdateModal if there is a warning view successfully', () => {
  const { getByTestId } = render(
    <OrderUpdateModal close={() => null} warning={Warning} />
  );
  expect(getByTestId('order-update-modal__warning')).toBeTruthy();
});

test('render OrderUpdateModal if there is no warning view successfully', () => {
  const { queryByTestId } = render(<OrderUpdateModal close={() => null} />);
  expect(queryByTestId('order-update-modal__warning')).toBeFalsy();
});
