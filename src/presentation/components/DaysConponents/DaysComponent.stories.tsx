import React from 'react';
import daysMockData from '../../../mock-data/DaysMockData';
import DaysComponent from './DaysComponent';

export default {
  title: 'Components/Controls/DaysComponent',
  component: DaysComponent,
};

const Template = (args) => {
  return <DaysComponent {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  daysDataArray: daysMockData.days,
  isLoading: false,
  selectedDate: '2020-09-30',
};
