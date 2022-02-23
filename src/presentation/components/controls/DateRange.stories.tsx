// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story, Meta } from '@storybook/react';
import React from 'react';

import { addDays } from 'date-fns';
import DateRange from './DateRange';

export default {
  title: 'Components/Controls/DateRange',
  component: DateRange,
};

const Template = (args) => <DateRange {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onChange: (e) => {
    console.log(e);
  },
  value: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ],
};
