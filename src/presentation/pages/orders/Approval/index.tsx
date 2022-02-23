import React, { useEffect, useState } from 'react';
import { OrderType } from 'shared/constants/orderType';
import { useDispatch } from 'react-redux';
import OrderListing from 'presentation/components/OrderListingTable';
import { Grid } from '@material-ui/core';
import FilterPanel from 'presentation/components/FilterPanel2';
import { IFilterFormField } from 'presentation/components/FilterPanel2/FilterField';
import { getOrdersApproval } from 'presentation/redux/actions/orders/approval';
import {
  columnApproval,
  approvalList,
} from 'presentation/components/OrderListingTable/helper';
import { getString } from 'presentation/theme/localization';
import { Helmet } from 'react-helmet';
import {
  INITIAL_VALUES,
  insuranceTypeField,
  insurerField,
  submissionFields,
} from '../filter.helper';

const FOURTH_POS = 4;
const FIFTH_POS = 5;

const OrderApprovalPage = () => {
  const [fields, setFields] = useState<IFilterFormField[]>([]);
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    dispatch(getOrdersApproval(values));
  };

  useEffect(() => {
    // The fields are generated here because they are specific to
    // the approval page.
    const newFields = submissionFields.slice();
    newFields.splice(FOURTH_POS - 1, 0, insuranceTypeField);
    newFields.splice(FIFTH_POS - 1, 0, insurerField);
    setFields(newFields);
  }, []);

  return (
    <Grid container spacing={6}>
      <Helmet title={getString('titleTag.orderApproval')} />
      <Grid item xs={12}>
        <FilterPanel
          fields={fields}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          assignType={OrderType.Approval}
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
export default OrderApprovalPage;
