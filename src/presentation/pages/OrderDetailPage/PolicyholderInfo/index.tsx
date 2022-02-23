import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countingAgeToPresent } from 'shared/helper/utilities';
import { updateOrder } from 'presentation/redux/actions/order';
import InfoPanel from '../InfoPanel';
import { IField } from '../InfoPanel/type';
import { getString } from '../../../theme/localization';

const PolicyholderInfo = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order?.payload);
  const policyHolder = useSelector(
    (state: any) => state.order?.payload?.data?.policyHolder
  );

  const dataSchema: IField[] = [
    {
      title: 'Title',
      value: policyHolder?.title,
      type: 'select',
      name: 'title',
    },
    {
      title: 'First Name',
      value: policyHolder?.firstName || '',
      type: 'text',
      isEditable: true,
      name: 'firstName',
    },
    {
      title: 'Last Name',
      value: policyHolder?.lastName || '',
      type: 'text',
      isEditable: true,
      name: 'lastName',
    },
    {
      title: 'Gender',
      value: policyHolder?.gender,
      type: 'select',
      isEditable: true,
      name: 'gender',
    },
    {
      title: 'DOB',
      type: 'date',
      value: policyHolder?.dateOfBirth || null,
      name: 'dateOfBirth',
    },
    {
      title: 'Age',
      value: policyHolder?.dateOfBirth
        ? countingAgeToPresent(policyHolder.dateOfBirth)
        : '',
      type: 'text',
      name: 'age',
    },
    {
      title: 'National ID',
      value: policyHolder?.nationalID ?? '',
      type: 'text',
      isEditable: true,
      name: 'nationalID',
    },
  ];

  const onUpdateOrder = (payload: any) => {
    if (order?.name) {
      const formatedOrder = {
        name: order.name,
        data: {
          ...order.data,
          policyHolder: {
            ...order.data.policyHolder,
            [payload.name]: payload.value,
          },
        },
      };
      dispatch(updateOrder(formatedOrder));
    }
  };

  return (
    <InfoPanel
      dataSchema={dataSchema}
      title={getString('order.policyholder')}
      handleUpdateOrder={onUpdateOrder}
    />
  );
};

export default PolicyholderInfo;
