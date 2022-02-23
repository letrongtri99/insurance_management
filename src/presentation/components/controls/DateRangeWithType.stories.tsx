import React from 'react';
import { addDays } from 'date-fns';
import DateRangeWithType from './DateRangeWithType';

export default {
  title: 'Components/Controls/DateRangeWithType',
  component: DateRangeWithType,
};

const Template = (args) => <DateRangeWithType {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onChange: (e) => {
    console.log(e);
  },
  value: {
    criteria: 'Created on',
    range: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
    key: 'selection',
  },
  options: [
    { id: 1, value: 'created_on', title: 'Created on' },
    { id: 2, value: 'updated_on', title: 'Updated on' },
  ],
};
