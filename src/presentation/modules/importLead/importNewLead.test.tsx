import React from 'react';
import { mount } from '__tests__/test-utils';
import ImportNewLead from './ImportNewLead';

const handleCloseModal = jest.fn();
const setState = jest.fn();
const wrapper = mount(<ImportNewLead close={handleCloseModal()} />);
const useStateSpy = jest.spyOn(React, 'useState');

const state = {
  title: false,
  isDisabled: false,
  isErrorMessage: true,
  requiredColumns: ['Last Name', 'Phone'],
  isCsv: [
    'application/csv',
    'application/x-csv',
    'text/csv',
    'text/comma-separated-values',
    'text/x-comma-separated-values',
    'text/tab-separated-values',
    'application/vnd.ms-excel',
  ],
};

useStateSpy.mockImplementation((() => [state, setState]) as any);

describe('<ImportNewLead Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should click to button cancel', () => {
    const button = wrapper.find('.unittest-cancel-btn').first();
    expect(button.exists()).toBe(true);
    button.simulate('click');
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it('should click to button submit', () => {
    const button = wrapper.find('.unittest-submit-btn').first();
    expect(button.exists()).toBe(true);
    button.simulate('click');
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
