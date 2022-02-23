import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';
import LeadScheduleModalHelper from '../modal/LeadScheduleModal/LeadScheduleModal.helper';
import ScheduleModal from './index';
import { getString } from '../../theme/localization';

jest.mock('../modal/LeadScheduleModal/LeadScheduleModal.helper');

const initialProps = {
  openDialog: true,
  appointmentOptions: () => [
    { id: 'requested', title: getString('text.customerRequested') },
  ],
  onSubmit: () => jest.fn(),
  onGetAppointment: () => jest.fn(),
  onGetAppointmentDetail: () => jest.fn(),
  loading: false,
  HelperScheduleData: LeadScheduleModalHelper,
};

const handleCloseModal = jest.fn();

const store = configureStore();
const wrapper = shallow(
  <Provider store={store}>
    <ScheduleModal {...initialProps} closeDialog={handleCloseModal} />
  </Provider>,
  { context: { store } }
);

describe('<ScheduleModal Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('click to button close', () => {
    setTimeout(() => {
      const button = wrapper.find('.unittest__schedule__close-btn');
      button.hostNodes().simulate('click');
      expect(handleCloseModal).toHaveBeenCalledWith(false);
    }, 100);
  });

  afterEach(() => {
    handleCloseModal.mockClear();
  });
});
