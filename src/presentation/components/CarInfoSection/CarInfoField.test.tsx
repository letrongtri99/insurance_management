import React, { ChangeEvent } from 'react';
import { shallow } from 'enzyme';
import CarInfoField from './CarInfoField';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((() => [{}, setState]) as any);

const initialProps = {
  title: 'Province',
  value: 'Bangkok',
};

const wrapper = shallow(<CarInfoField {...initialProps} />);

describe('<CarInfoField Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('title and value exists in carInfoField', () => {
    const fieldWrapper = wrapper.find('.unit-test-car-info-field');
    expect(fieldWrapper.exists()).toBe(true);
    expect(fieldWrapper.children().length).toEqual(2);
  });

  afterEach(() => {
    setState.mockClear();
  });
});
