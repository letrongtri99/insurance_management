import React from 'react';
import { shallow } from 'enzyme';
import RenderValue from './RenderValue';

const useStateSpy = jest.spyOn(React, 'useState');
const objectState = false;
const setObjState = jest.fn();
useStateSpy.mockImplementation((() => [objectState, setObjState]) as any);
const objectValue = {
  editType: 'input',
  id: '91021644-9fe9-4b57-9a2e-c08120de29d0',
  isEdit: false,
  isEditable: false,
  isError: false,
  title: 'Lead ID',
  value: 'L62014',
};
const wrapper = shallow(
  <RenderValue
    objValue={objectValue as any}
    key=""
    updateDOB={() => jest.fn()}
  />
);
describe('<RenderValue/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
