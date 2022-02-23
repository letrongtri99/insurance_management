import React from 'react';
import { shallow } from 'enzyme';
import { dataTableList } from './activityTable.helper';
import ActivityTable from '.';

const wrapper = shallow(<ActivityTable listData={dataTableList} />);
const dataTable = dataTableList[0];

describe('<ActivityTable Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display data of name', () => {
    dataTable.data.map((item: any) => {
      return expect(
        wrapper
          .find(`.unittest-row-${item.sequenceNumber} .unittest-user-name`)
          .text()
      ).toEqual(item.userName);
    });
  });

  it('should display data of status', () => {
    dataTable.data.map((item: any) => {
      return expect(
        wrapper
          .find(`.unittest-row-${item.sequenceNumber} .unittest-status`)
          .text()
      ).toEqual(item.status);
    });
  });

  it('should display data of summary', () => {
    dataTable.data.map((item: any) => {
      return expect(
        wrapper
          .find(`.unittest-row-${item.sequenceNumber} .unittest-summary`)
          .text()
      ).toEqual(item.summary);
    });
  });
});
