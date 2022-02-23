import React from 'react';
import { shallow } from 'enzyme';
import { dayComponent } from '../../../models/DayComponent';
import DaysComponent from './DaysComponent';
import DaysComponentWrapper from '../DaysComponentWrapper/DaysComponentWrapper';

const fakeAction = 'NEXT_WEEK';

const daysList: dayComponent[] = [
  {
    appointmentCalls: 3,
    date: '2020-10-12',
    freeSlots: 195,
    isActive: true,
    paymentCalls: 2,
  },
  {
    appointmentCalls: 3,
    date: '2020-10-12',
    freeSlots: 195,
    isActive: true,
    paymentCalls: 2,
  },
];
const onChangeHandle = jest.fn();
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((() => [daysList, setState]) as any);

const initialProps = {
  numberOfDays: 0,
  daysDataArray: [],
  selectedDate: '',
  isLoading: false,
};

const wrapper = shallow(
  <DaysComponent
    {...initialProps}
    onSelect={() => null}
    onChange={onChangeHandle}
  />
);

describe('<DaysComponent Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('change date slide', () => {
    const component = wrapper.find(DaysComponentWrapper);
    expect(component.exists()).toBe(true);
    const renderProp = shallow(
      <DaysComponentWrapper
        onNextPrevious={onChangeHandle}
        isHaveToday={false}
      />
    );
    const children = renderProp.find('.unittest-right-arrow');
    children.simulate('click');
    expect(onChangeHandle).toHaveBeenCalledWith(fakeAction);
  });

  afterEach(() => {
    setState.mockClear();
  });
});
