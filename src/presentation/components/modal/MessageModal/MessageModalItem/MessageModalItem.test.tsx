import React from 'react';
import { shallow } from 'enzyme';
import MessageModalItem from './index';
import { IItemEmail } from '../messageModal.helper';

const emailMockData: IItemEmail = {
  name: '',
  subject: '',
  body: '',
  cc: [''],
  bodyText: '',
  createdBy: '',
  emailIndex: 1,
  createTime: '',
  updateTime: '',
  deleteTime: '',
  type: '',
  parentId: '',
};
const handleClick = jest.fn();
const activeId = '1';

const wrapper = shallow(
  <MessageModalItem
    messageItem={emailMockData}
    isActive={activeId}
    onClick={handleClick}
  />
);

describe('<MessageModalItem Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check is active item', () => {
    const event = {
      target: { value: activeId },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    wrapper.simulate('click', event.target.value);
    expect(handleClick).toHaveBeenCalledWith(activeId);
  });
});
