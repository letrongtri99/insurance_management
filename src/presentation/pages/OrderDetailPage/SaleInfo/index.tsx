import React from 'react';
import { getString } from 'presentation/theme/localization';
import { useDispatch, useSelector } from 'react-redux';
import InfoPanel from '../InfoPanel';
import { IField } from '../InfoPanel/type';
import { OrderActionTypes } from '../../../redux/actions/order';
import { IInputTextPayload } from '../InfoPanel/RenderInputTextItem';

const SaleInfo = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order?.payload);

  const handleCustomerChange = ({ name, value }: IInputTextPayload) => {
    dispatch({
      type: OrderActionTypes.UPDATE_CUSTOMER,
      payload: { [name]: value },
    });
  };

  const dataSchema: IField[] = [
    {
      title: 'Order Type',
      value: 'New',
      type: 'text',
    },
    {
      title: 'Customer First Name',
      value: order?.customer?.firstName || '',
      type: 'text',
      name: 'firstName',
      isEditable: !!order?.customer,
      onChange: (payload: IInputTextPayload) => handleCustomerChange(payload),
    },
    {
      title: 'Customer Last Name',
      value: order?.customer?.lastName || '',
      type: 'text',
      name: 'lastName',
      isEditable: !!order?.customer,
      onChange: (payload: IInputTextPayload) => handleCustomerChange(payload),
    },
    {
      title: 'Customer ID',
      value: order?.customer?.humanId || '',
      type: 'text',
    },
    {
      title: 'Renewal ID',
      value: 'O629997',
      type: 'text',
    },
    {
      title: 'Order ID',
      value: order?.humanId || '',
      type: 'text',
    },
    {
      title: 'Team',
      value: 'Fresh 1',
      type: 'text',
    },
    {
      title: 'Supervisor',
      value: order?.supervisor?.firstName
        ? `${order.supervisor.firstName} ${order?.supervisor.lastName ?? ''}`
        : '',
      type: 'text',
    },
    {
      title: 'Sales Agent',
      value: order?.salesAgent?.firstName
        ? `${order.salesAgent.firstName} ${order?.salesAgent.lastName ?? ''}`
        : '',
      type: 'text',
    },
    {
      title: 'Comm Language',
      value: 'English',
      type: 'text',
    },
    {
      title: 'Tax/Company Tax',
      value: '1828800070376',
      type: 'text',
    },
    {
      title: 'Company',
      value: 'Bangkok Smartcard System Co. ltd.',
      type: 'text',
    },
  ];

  return <InfoPanel dataSchema={dataSchema} title={getString('order.sale')} />;
};

export default SaleInfo;
