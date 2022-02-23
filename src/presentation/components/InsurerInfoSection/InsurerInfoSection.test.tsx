import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { configureStore } from 'presentation/redux/store';
import { IInsurer } from 'presentation/models/lead/insurer';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import themes from 'presentation/theme';
import InsurerInfoSection from './InsurerInfoSection';

const fakeInsurerObject: IInsurer = {
  currentInsurer: 'Bangkok Insurance',

  preferredInsurer: 38,

  preferredType: [
    {
      title: 'Type 1',
      value: 'type_1',
    },
  ],

  preferredSumInsured: 0,

  mandatory: 'both',

  expiryDate: '2025-11-16',

  startDate: '2020-11-16',

  youngestDriverDob: '1997-12-16',

  coupon: 'Rabbit2020',

  status: 'PURCHASE',
};

const fakeInsurers = [
  {
    name: 'insurers/42',
    displayName: 'Dhipaya',
    order: 3,
    id: 42,
  },
  {
    name: 'insurers/40',
    displayName: 'Chubb Samaggi Insurance Co. (PLC)',
    order: 3,
    id: 40,
  },
  {
    name: 'insurers/38',
    displayName: 'Roojai Insurance',
    order: 3,
    id: 38,
  },
];

const fakeTypes = [
  {
    title: 'Type 1',
    value: 'type_1',
  },
  {
    title: 'Type 2',
    value: 'type_2',
  },
  {
    title: 'Type 2+',
    value: 'type_2+',
  },
  {
    title: 'Type 3',
    value: 'type_3',
  },
  {
    title: 'Type 3+',
    value: 'type_3+',
  },
];
const leadStatus = 'LEAD_STATUS_NEW';
const handleRequestQuote = jest.fn();
const handleViewQuote = jest.fn();
const handleViewRenewal = jest.fn();
const handleUpdate = jest.fn();
const handleAddPaySlip = jest.fn();
const fakeCheckoutPackage = {
  package: '',
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ id: '123' }),
}));
const store = configureStore();
const wrapper = mount(
  <Provider store={store}>
    <MuiThemeProvider theme={themes[0]}>
      <ThemeProvider theme={themes[0]}>
        <InsurerInfoSection
          insurerObject={fakeInsurerObject}
          insurers={fakeInsurers}
          checkoutPackage={fakeCheckoutPackage}
          onRequestQuote={handleRequestQuote}
          onViewRenewal={handleViewRenewal}
          onUpdate={handleUpdate}
          onAddPaySlip={handleAddPaySlip}
          leadStatus={leadStatus}
        />
      </ThemeProvider>
    </MuiThemeProvider>
  </Provider>
);

describe('<InsurerInfoSection Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check change and update type', () => {
    const preferredType = wrapper.find('[name="preferredType"]');
    expect(preferredType.exists()).toEqual(true);
  });

  it('check change and update sum insurer', () => {
    const button = wrapper.find('.unittest-save-button');
    expect(button.exists()).toEqual(true);
    button.first().simulate('click');
  });

  it('click view renewal', () => {
    const button = wrapper.find('.unittest-view-renewal');
    expect(button.exists()).toEqual(true);
    button.first().simulate('click');
  });

  it('click request custom quote', () => {
    const button = wrapper.find('.unittest-request-CustomQuote');
    expect(button.exists()).toEqual(true);
    button.first().simulate('click');
  });
});
