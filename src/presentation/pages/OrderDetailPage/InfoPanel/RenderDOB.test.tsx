import React from 'react';
import { shallow } from 'enzyme';
import RenderDOB from './RenderDOB';

const useStateSpy = jest.spyOn(React, 'useState');
const isEdit = false;
const setIsEdit = jest.fn();
const dateValue = '';
const setDateValue = jest.fn();
useStateSpy.mockImplementation((() => [isEdit, setIsEdit]) as any);
useStateSpy.mockImplementation((() => [dateValue, setDateValue]) as any);

const wrapper = shallow(
  <RenderDOB onClose={() => jest.fn()} value={new Date()} />
);
describe('<RenderDOB/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Button edit icon exists', () => {
    const button = wrapper.find({ 'data-testid': 'pen-icon' });
    expect(button.exists()).toBe(true);
  });
});
