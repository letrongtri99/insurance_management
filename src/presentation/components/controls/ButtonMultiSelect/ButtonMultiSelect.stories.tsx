import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/react';
import ButtonMultiSelect from './index';

export default {
  title: 'Components/Controls/ButtonMultiSelect',
  component: ButtonMultiSelect,
} as Meta;

const Template = (args) => <ButtonMultiSelect {...args} />;

export const Primary = Template.bind({});

const AddressUse = [
  { id: 1, value: 'policy', label: 'Policy' },
  { id: 2, value: 'shipment', label: 'Shipment' },
  { id: 3, value: 'billing', label: 'Billing' },
];

Primary.args = {
  items: AddressUse,
  value: ['policy', 'shipment'],
  name: 'Button MultiSelect',
};
