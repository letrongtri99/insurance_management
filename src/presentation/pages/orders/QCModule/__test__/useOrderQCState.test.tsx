import { renderHook } from '@testing-library/react-hooks';
import useOrderQCState from '../useOrderQCState';

test('should useOrderQCState behavior run well', () => {
  const response = renderHook(() => useOrderQCState());

  expect(response.result).toBeDefined();
});
