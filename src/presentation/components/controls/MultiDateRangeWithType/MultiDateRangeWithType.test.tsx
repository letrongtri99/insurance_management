import React from 'react';
import { shallow } from 'enzyme';
import MultiDateRangeWithType from '.';

const initialProps = {
  onChange: () => null,
  name: '',
  value: '',
  options: [],
  hasExpand: true,
} as any;

const wrapperCase1 = shallow(<MultiDateRangeWithType {...initialProps} />);

describe('<MultiDateRangeWithType Component/>', () => {
  it('check MultiDateRangeWithType if `hasExpand` is true', () => {
    const classCol6 = wrapperCase1.find(
      '.shared-date-range-picker .MuiGrid-grid-xs-6'
    );
    expect(classCol6.exists()).toEqual(false);
  });
});
