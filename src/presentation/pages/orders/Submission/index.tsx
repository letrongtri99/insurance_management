import React from 'react';
import { OrderType } from 'shared/constants/orderType';
import { useDispatch } from 'react-redux';
import OrderListing from 'presentation/components/OrderListingTable';
import { Grid } from '@material-ui/core';
import FilterPanel from 'presentation/components/FilterPanel2';
import {
  columnApproval,
  approvalList,
} from 'presentation/components/OrderListingTable/helper';
import { getOrderSubmission } from 'presentation/redux/actions/orders/submission';
import { getString } from 'presentation/theme/localization';
import { Helmet } from 'react-helmet';
import { INITIAL_VALUES, submissionFields } from '../filter.helper';

const OrderSubmissionPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    dispatch(getOrderSubmission(values));
  };

  return (
    <Grid container spacing={6}>
      <Helmet title={getString('titleTag.orderSubmission')} />
      <Grid item xs={12}>
        <FilterPanel
          fields={submissionFields}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          onReset={() => undefined}
          onChangeValue={() => undefined}
          assignType={OrderType.Submission}
          isOrderPage
        />
      </Grid>
      <Grid item xs={12}>
        <OrderListing
          columnSettings={columnApproval}
          orders={approvalList}
          isDisableExpand
        />
      </Grid>
    </Grid>
  );
};
export default OrderSubmissionPage;
