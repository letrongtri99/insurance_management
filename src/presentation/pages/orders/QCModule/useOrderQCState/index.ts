import { useSelector } from 'react-redux';

function useOrderQCState() {
  const orderQCs = useSelector(
    (state: any) => state?.ordersReducer?.qcModuleReducer?.data || []
  );

  const isLoading = useSelector(
    (state: any) => state?.ordersReducer?.qcModuleReducer?.isFetching
  );

  const totalItem = useSelector(
    (state: any) => state?.ordersReducer?.qcModuleReducer?.totalItem
  );

  const pageState = useSelector(
    (state: any) => state.ordersReducer?.qcModuleReducer?.pageState
  );

  return { orderQCs, isLoading, totalItem, pageState };
}

export default useOrderQCState;
