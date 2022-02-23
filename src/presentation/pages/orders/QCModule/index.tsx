import React, { useEffect } from 'react';
import { OrderType } from 'shared/constants/orderType';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import OrderListing from 'presentation/components/OrderListingTable';
import FilterPanel from 'presentation/components/FilterPanel2';
import { columnDocumentsQC } from 'presentation/components/OrderListingTable/helper';
import { getQCModule } from 'presentation/redux/actions/orders/qc';
import { getString } from 'presentation/theme/localization';
import { Helmet } from 'react-helmet';
import useOrderQCState from './useOrderQCState';
import { INITIAL_VALUES, fields } from '../filter.helper';

const QCModulePage = () => {
  const dispatch = useDispatch();
  const { orderQCs, isLoading, totalItem, pageState } = useOrderQCState();

  const handleChangePageCurrent = (newPageState: any) => {
    dispatch(
      getQCModule({
        ...pageState,
        ...newPageState,
      })
    );
  };

  const handleSubmit = (values: any) => {
    dispatch(getQCModule(values));
  };

  useEffect(() => {
    dispatch(
      getQCModule({
        filters: [
          encodeURIComponent('order.qc_by != ""'),
          encodeURIComponent(
            'order.qcStatus IN ("QC_STATUS_PENDING","QC_STATUS_PREAPPROVED","QC_STATUS_CRITICAL_ISSUES","QC_STATUS_ISSUES_FIXED")'
          ),
        ],
      })
    );
  }, [dispatch]);

  return (
    <Grid container spacing={6} data-testid="order-qc-module-page">
      <Helmet title={getString('titleTag.orderQC')} />
      <Grid item xs={12}>
        <FilterPanel
          fields={fields}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          onReset={() => undefined}
          onChangeValue={() => undefined}
          assignType={OrderType.QC}
          isOrderPage
        />
      </Grid>
      <Grid item xs={12}>
        <OrderListing
          columnSettings={columnDocumentsQC}
          orders={orderQCs}
          handleChangePageCurrent={handleChangePageCurrent}
          isLoading={isLoading}
          totalItem={totalItem}
          pageState={pageState}
        />
      </Grid>
    </Grid>
  );
};
export default QCModulePage;
