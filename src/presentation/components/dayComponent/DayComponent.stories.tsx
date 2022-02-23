import React from 'react';
import DayComponent from './DayComponent';

export default {
  title: 'Components/Controls/DayComponent',
  component: DayComponent,
};

const Template = (args) => {
  const data = args;

  return (
    <div style={{ width: 200 }}>
      <DayComponent data={data} {...args} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  date: '2020/09/22',
  freeSlots: 228,
  paymentCalls: 1,
  appointmentCalls: 0,
  isActive: false,
};
