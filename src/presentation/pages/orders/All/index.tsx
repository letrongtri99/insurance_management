import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { OrderType } from 'shared/constants/orderType';
import { useDispatch, useSelector } from 'react-redux';
import OrderListing from 'presentation/components/OrderListingTable';
import { Grid } from '@material-ui/core';
import FilterPanel from 'presentation/components/FilterPanel2';
import { columnSettings } from 'presentation/components/OrderListingTable/helper';
import { getOrdersAll } from 'presentation/redux/actions/orders/all';
import { getString } from 'presentation/theme/localization';
import { INITIAL_VALUES, fields } from '../filter.helper';

const OrderAllPage = () => {
  const dispatch = useDispatch();
  const orderDataAll = useSelector(
    (state: any) => state?.ordersReducer?.ordersAllReducer?.data || []
  );

  const isLoading = useSelector(
    (state: any) => state?.ordersReducer?.ordersAllReducer?.isFetching
  );

  const totalItem = useSelector(
    (state: any) => state?.ordersReducer?.ordersAllReducer?.totalItem
  );

  const pageState = useSelector(
    (state: any) => state.ordersReducer?.ordersAllReducer?.pageState
  );

  const handleSubmit = (values: any) => {
    dispatch(getOrdersAll(values));
  };

  const handleChangePageCurrent = (newPageState: any) => {
    dispatch(
      getOrdersAll({
        ...newPageState,
        filters: [],
      })
    );
  };

  useEffect(() => {
    dispatch(
      getOrdersAll({
        filters: [],
      })
    );
  }, [dispatch]);

  return (
    <Grid container spacing={6} data-testid="all-list-order">
      <Helmet title={getString('titleTag.orderAll')} />
      <Grid item xs={12}>
        <FilterPanel
          fields={fields}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          onReset={() => undefined}
          onChangeValue={() => undefined}
          assignType={OrderType.All}
          isOrderPage
        />
      </Grid>
      <Grid item xs={12}>
        <OrderListing
          columnSettings={columnSettings}
          orders={orderDataAll}
          handleChangePageCurrent={handleChangePageCurrent}
          isLoading={isLoading}
          totalItem={totalItem}
          pageState={pageState}
        />
      </Grid>
    </Grid>
  );
};
export default OrderAllPage;
