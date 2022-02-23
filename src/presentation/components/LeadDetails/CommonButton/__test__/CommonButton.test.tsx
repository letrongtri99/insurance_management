import React from 'react';
import { render } from '@testing-library/react';
import CommonButton from '..';

test('render CommonButton type Update-btn view successfully', () => {
  const { getByTestId } = render(
    <CommonButton
      type="update--order"
      color="primary"
      onClick={() => null}
      open
      close={() => null}
      handleCloseModal={() => null}
      title=""
      modalClass="order-update-modal"
    >
      Update
    </CommonButton>
  );
  expect(getByTestId('order-update-modal')).toBeTruthy();
});
