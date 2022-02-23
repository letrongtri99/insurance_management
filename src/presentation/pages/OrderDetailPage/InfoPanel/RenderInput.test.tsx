import React from 'react';
import { shallow } from 'enzyme';
import RenderInputTextItem from './RenderInputTextItem';

const useStateSpy = jest.spyOn(React, 'useState');
const isEditText = false;
const setIsEditText = jest.fn();
const valueItem = '';
const setValueItem = jest.fn();
useStateSpy.mockImplementation((() => [isEditText, setIsEditText]) as any);
useStateSpy.mockImplementation((() => [valueItem, setValueItem]) as any);

const props = {
  valueText: '1',
  isEditable: true,
  name: '',
  handleEnter: jest.fn(),
  handleBlur: jest.fn(),
  className: '',
  callBackEdit: jest.fn(),
  onChange: jest.fn(),
  isError: false,
  error: '',
};
const wrapper = shallow(<RenderInputTextItem {...props} />);
describe('<RenderInput/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
