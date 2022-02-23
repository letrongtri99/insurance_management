import React from 'react';
import { shallow } from 'enzyme';
import { dayComponent } from 'models/DayComponent';
import DayComponent from './DayComponent';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((() => [{}, setState]) as any);

const onSelectHandle = jest.fn();

const dayData: dayComponent = {
  appointmentCalls: 3,
  date: '2020-10-12',
  freeSlots: 195,
  isActive: true,
  paymentCalls: 2,
};

const initialProps = {
  data: dayData,
  isLoading: false,
  isDisabled: false,
};

const wrapper = shallow(
  <DayComponent {...initialProps} onSelect={onSelectHandle} />
);

describe('<DayComponent Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('check day component exists', () => {
    const element = wrapper.find('.unittest-day-component-exists');
    expect(element.exists()).toEqual(true);
  });

  it('on select handle', () => {
    const button = wrapper.find('.unittest-app-day-component');
    button.simulate('click');
    expect(onSelectHandle).toHaveBeenCalledWith(dayData);
  });

  afterEach(() => {
    setState.mockClear();
  });
});
