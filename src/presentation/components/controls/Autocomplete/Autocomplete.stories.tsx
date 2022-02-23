import React from 'react';
import { Meta } from '@storybook/react';
import Autocomplete from './Autocomplete';

interface User {
  key: string;
  id: number;
  value: string;
  title: string;
  label: string;
}
export default {
  title: 'Components/Controls/Autocomplete',
  component: Autocomplete,
} as Meta;

const Template = (args) => <Autocomplete {...args} />;

export const Primary = Template.bind({});

const userList: User[] = [
  { key: '1', id: 0, value: 'Siriwan', title: 'Siriwan', label: 'Siriwan' },
  { key: '2', id: 1, value: 'Pithi', title: 'Pithi', label: 'Pithi' },
  { key: '3', id: 2, value: 'Pimpicha', title: 'Pimpicha', label: 'Pimpicha' },
];

Primary.args = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  },
  label: 'Select Users',
  options: userList,
};
