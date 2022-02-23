import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { OrderType } from 'shared/constants/orderType';
import { configureStore } from 'presentation/redux/store';
import useRefetchOrderList from '..';

test('should useRefetchOrderList behavior run well', () => {
  const response = renderHook(() => useRefetchOrderList());

  expect(response.result).toBeDefined();
});

test('should refetch function behavior run well with OrderType input', () => {
  const store = configureStore();
  const wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  const response = renderHook(() => useRefetchOrderList(), { wrapper });
  expect(response.result.current.refetchList(OrderType.Document)).toBe(
    undefined
  );
});

test('should refetch function behavior run well with OrderType.QC input', () => {
  const store = configureStore();
  const wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  const response = renderHook(() => useRefetchOrderList(), { wrapper });
  expect(response.result.current.refetchList(OrderType.QC)).toBe(undefined);
});

test('should refetch function behavior run well with undefined input', () => {
  const store = configureStore();
  const wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  const response = renderHook(() => useRefetchOrderList(), { wrapper });
  expect(response.result.current.refetchList(undefined)).toBe(undefined);
});
