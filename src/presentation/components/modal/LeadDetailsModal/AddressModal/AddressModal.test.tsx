import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import AddressModal from './index';
import { configureStore } from '../../../../redux/store';

const store = configureStore();
const wrapper = mount(
  <Provider store={store}>
    <AddressModal close={() => null} />
  </Provider>,
  { context: { store } }
);

describe('<AddressModal/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
