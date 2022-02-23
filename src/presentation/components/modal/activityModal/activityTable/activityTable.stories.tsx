import React from 'react';
import { dataTableList } from './activityTable.helper';
import ActivityTable from '.';
import './activityTable.stories.scss';

export default {
  title: 'Components/Controls/activityTable',
  component: ActivityTable,
};

const Template = (args) => {
  const mockData = dataTableList;
  return (
    <div className="activity-table-stories" style={{ width: 1000 }}>
      <ActivityTable listData={mockData} {...args} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  listData: dataTableList,
};
