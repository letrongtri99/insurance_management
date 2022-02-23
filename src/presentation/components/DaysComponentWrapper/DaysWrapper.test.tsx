import React from 'react';
import { shallow } from 'enzyme';
import DaysComponentWrapper from './DaysComponentWrapper';

const NEXT_WEEK = 'NEXT_WEEK';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((() => [{}, setState]) as any);

const onNextPreviousHandle = jest.fn();

const initialProps = {
  isHaveToday: false,
};

const wrapper = shallow(
  <DaysComponentWrapper
    {...initialProps}
    onNextPrevious={onNextPreviousHandle}
  />
);

describe('<DaysComponentWrapper Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('click day navigation', () => {
    const button = wrapper.find('.unittest-right-arrow');
    button.simulate('click');
    expect(onNextPreviousHandle).toHaveBeenCalledWith(NEXT_WEEK);
  });
  afterEach(() => {
    setState.mockClear();
    onNextPreviousHandle.mockClear();
  });
});
