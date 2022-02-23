import React from 'react';
import { shallow } from 'enzyme';
import CommonModal from '.';

const handleCloseModal = jest.fn();

const initialProps = {
  children: 'common modal test',
  open: true,
  title: 'common modal test',
};

const wrapper = shallow(
  <CommonModal {...initialProps} handleCloseModal={handleCloseModal} />
);

describe('<CommonModal Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display title of modal', () => {
    expect(wrapper.find('.unittest-title').text()).toEqual(initialProps.title);
  });

  it('should click to button close', () => {
    const button = wrapper.find('.unittest-close-button');
    button.simulate('click');
    expect(handleCloseModal).toHaveBeenCalledWith();
  });
});

afterEach(() => {
  handleCloseModal.mockClear();
});
