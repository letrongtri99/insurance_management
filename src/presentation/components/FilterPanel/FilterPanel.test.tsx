import React from 'react';
import { shallow } from 'enzyme';
import FilterPanel from './FilterPanel';

const initialProps = {
  rows: 3,
  collapsedRows: 1,
  rowHeight: 60,
  children: null,
} as any;

const setState = jest.fn();
const minimized = false;
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((() => [minimized, setState]) as any);

const wrapper = shallow(<FilterPanel {...initialProps} />);

describe('<FilterPanel Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check button collapse exits', () => {
    const button = wrapper.find('.unittest-button-collapse');
    expect(button.exists()).toEqual(true);
  });

  it('click to button collapse', () => {
    const button = wrapper.find('.unittest-button-collapse');
    button.hostNodes().simulate('click');
    expect(setState).toHaveBeenCalledWith(true);
  });
});
