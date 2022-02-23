import React, { useEffect } from 'react';
import { OrderType } from 'shared/constants/orderType';
import { useDispatch, useSelector } from 'react-redux';
import OrderListing from 'presentation/components/OrderListingTable';
import { Grid } from '@material-ui/core';
import FilterPanel from 'presentation/components/FilterPanel2';
import { columnDocumentsQC } from 'presentation/components/OrderListingTable/helper';
import { getOrdersDocuments } from 'presentation/redux/actions/orders/documents';
import { getString } from 'presentation/theme/localization';
import { Helmet } from 'react-helmet';
import { INITIAL_VALUES, fields } from '../filter.helper';

const OrderDocumentsPage = () => {
  const dispatch = useDispatch();

  const orderDocuments = useSelector(
    (state: any) => state?.ordersReducer?.orderDocumentsReducer?.data || []
  );

  const isLoading = useSelector(
    (state: any) => state?.ordersReducer?.orderDocumentsReducer?.isFetching
  );

  const totalItem = useSelector(
    (state: any) => state?.ordersReducer?.orderDocumentsReducer?.totalItem
  );

  const pageState = useSelector(
    (state: any) => state.ordersReducer?.orderDocumentsReducer?.pageState
  );

  const handleChangePageCurrent = (newPageState: any) => {
    dispatch(
      getOrdersDocuments({
        ...pageState,
        ...newPageState,
      })
    );
  };

  const handleSubmit = (values: any) => {
    dispatch(getOrdersDocuments(values));
  };

  useEffect(() => {
    dispatch(
      getOrdersDocuments({
        filters: [
          encodeURIComponent('order.documentBy != ""'),
          encodeURIComponent('order.documentStatus="DOCUMENT_STATUS_PENDING"'),
        ],
      })
    );
  }, [dispatch]);

  return (
    <Grid container spacing={6} data-testid="order-document-page">
      <Helmet title={getString('titleTag.orderDocument')} />
      <Grid item xs={12}>
        <FilterPanel
          fields={fields}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          onReset={() => undefined}
          onChangeValue={() => undefined}
          assignType={OrderType.Document}
          isOrderPage
        />
      </Grid>
      <Grid item xs={12}>
        <OrderListing
          columnSettings={columnDocumentsQC}
          orders={orderDocuments}
          handleChangePageCurrent={handleChangePageCurrent}
          isLoading={isLoading}
          totalItem={totalItem}
          pageState={pageState}
        />
      </Grid>
    </Grid>
  );
};
export default OrderDocumentsPage;
