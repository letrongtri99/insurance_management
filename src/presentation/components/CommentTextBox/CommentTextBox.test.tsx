import React from 'react';
import { shallow } from 'enzyme';
import {
  LeadActionTypes,
  pushComment,
} from 'presentation/redux/actions/leadDetail/comment';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';
import CommentTextBox from './CommentTextBox';

const store = configureStore();
const wrapper = shallow(
  <Provider store={store}>
    <CommentTextBox />
  </Provider>,
  { context: { store } }
);

describe('<CommentTextBox Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check tab Comment exits', () => {
    setTimeout(() => {
      const tab = wrapper.find('.unittest-tab-comment');
      expect(tab.exists()).toEqual(true);
    }, 100);
  });

  it('on change Text are', () => {
    setTimeout(() => {
      const textArea = wrapper.find('.unittest-text-area-comment');
      expect(textArea.exists()).toEqual(true);

      const event = {
        target: { value: 'this is content' },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      wrapper.find('.unittest-text-area-comment').simulate('change', event);
    }, 100);
  });

  it('check button save exits', () => {
    setTimeout(() => {
      const button = wrapper.find('.unittest-text-box-btn');
      expect(button.exists()).toEqual(true);
    }, 100);
  });

  it('click to button save', () => {
    setTimeout(() => {
      const button = wrapper.find('.unittest-text-box-btn');
      button.hostNodes().simulate('click');
      const expectedActions = {
        payload: {
          createBy: '',
          text: 'this is content',
        },
        type: LeadActionTypes.PUSH_COMMENT,
      };
      expect(
        pushComment({
          createBy: '',
          text: 'this is content',
        })
      ).toEqual(expectedActions);
    }, 100);
  });
});
