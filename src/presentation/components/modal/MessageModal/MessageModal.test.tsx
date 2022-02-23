import React from 'react';
// INFO: use for fix ReferenceError: regeneratorRuntime is not defined
import 'regenerator-runtime/runtime';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';
import MessageModal from './index';

const MessageUserMockData = {
  status: '1',
  leadReference: 'Rabbit2020',
  customerName: 'Siriwan Tongkleang',
};

const initialProps = {
  data: MessageUserMockData,
  openDialog: true,
};

const handleCloseModal = jest.fn();

const store = configureStore();
const wrapper = shallow(
  <Provider store={store}>
    <MessageModal {...initialProps} closeDialog={handleCloseModal} />
  </Provider>,
  { context: { store } }
);

describe('<MessageModal Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  afterEach(() => {
    handleCloseModal.mockClear();
  });
});
