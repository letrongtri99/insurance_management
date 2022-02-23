import React from 'react';

import { Meta } from '@storybook/react/types-6-0';
import TimeSlots from './index';
import { ITimeslotsData } from './TimeslotsHelper';

export default {
  title: 'Components/Timeslots',
  component: TimeSlots,
} as Meta;

const Template = (args) => <TimeSlots {...args} />;

export const Primary = Template.bind({});

const timeslots: ITimeslotsData = {
  date: '2020-09-24',
  start: '02:00',
  end: '12:00',
  slots: [3, 6, 9, 12, 15],
  schedule: [
    {
      time: '2020-09-24T03:00:00Z',
      length: '15',
      isPayment: true,
    },
    {
      time: '2020-09-24T04:03:00Z',
      length: '9',
      isPayment: false,
    },
    {
      time: '2020-09-24T04:30:00Z',
      length: '12',
      isPayment: false,
    },
    {
      time: '2020-09-24T05:45:00Z',
      length: '3',
      isPayment: true,
    },
    {
      time: '2020-09-24T09:15:00Z',
      length: '6',
      isPayment: false,
    },
  ],
};

Primary.args = {
  onUpdate: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  },
  data: timeslots,
};
