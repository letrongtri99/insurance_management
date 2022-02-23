import React from 'react';
import CustomPagination from './index';

export default {
  title: 'Components/Controls/CustomPagination',
  component: CustomPagination,
};

const Template = (args: any) => <CustomPagination {...args} />;

export const Primary = Template.bind({});
const page = 1;
Primary.args = {
  page,
  nextToken: `Token for page ${page + 1}`,
  perPage: 10,
  pageSizes: [10, 20, 30, 50],
};
