import React from 'react';
// INFO: use for fix ReferenceError: regeneratorRuntime is not defined
import 'regenerator-runtime/runtime';
import { shallow } from 'enzyme';
import * as CONSTANTS from 'shared/constants';
import { configureStore } from 'presentation/redux/store';
import { Provider } from 'react-redux';
import { LeadPage } from './index';
import {
  convertMandatory,
  formatCarInfo,
  formatInsurerInfo,
  getProvinceNameByLanguage,
} from './leadDetailsPage.helper';

// INFO: 1. Mock the useState to watch react useState hook
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((() => [{}, setState]) as any);

const fakeListInsurers = {
  insurers: [],
  nextPageToken: '',
  responseTimes: 200,
};

const showModalFn = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: '',
  }),
}));

const store = configureStore();

// INFO: 2. Shallow mount component
const wrapper = shallow(
  <Provider store={store}>
    <LeadPage
      match={{ params: null }}
      modalConfig={null}
      // INFO: we need to enable calling = true so the summary button can be rendered for testing
      callState={{ calling: true }}
      showModal={showModalFn}
      hideModal={() => null}
      calling={() => null}
      endCall={() => null}
      currentCustomer={[]}
      hasError={false}
      isFetching={false}
      success
      user={{
        role: 'roles/admin',
      }}
      listInsurer={fakeListInsurers}
      showSnackBar={() => null}
      destroyModalSchedule={() => null}
      getLead={() => null}
      getListInsurer={() => null}
      updateCustomerDetail={() => null}
      getCallParticipants={() => null}
    />
  </Provider>
);

describe('<LeadPage Component />', () => {
  it('will be mounted correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('have the button for message popup', () => {
    expect(wrapper.find('.unittest-message-button')).toHaveLength(0);
  });

  it('will open a popup when message button is clicked', () => {
    const button = wrapper.find('.unittest-message-button');
  });

  it('will open a popup when summary button is clicked', () => {
    const button = wrapper.find('.unitest-summary-button');
  });

  it('Test formatCarInfo', () => {
    const customerInfo = {
      important: true,
      name: 'leads/91b82282-6745-4d66-a754-33b2f965f478',
      createTime: '2021-04-05T07:24:41.954992Z',
      updateTime: '2021-09-21T23:36:48.337299Z',
      deleteTime: null,
      createBy: '',
      product: 'products/car-insurance',
      schema: 'schemas/efce3390-8da6-44b3-9e4c-2c7b78ca2c9d',
      data: {
        carDashCam: true,
        carModified: true,
        carSubModelYear: 42772,
        carUsageType: 'personal',
        currentInsurer: 27,
        customerBillingAddress: [
          {
            address: 'qw',
            addressType: 'personal',
            district: 100100,
            fullName: '`131231',
            postCode: 10200,
            province: 100000,
            subDistrict: 100101,
          },
        ],
        customerDOB: '1993-03-09',
        customerEmail: ['rajendras@rabbit.co.th', 'nichamon.u29@gmail.co'],
        customerFirstName: 'Rajendra',
        customerGender: 'm',
        customerLastName: 'sharma',
        customerPhoneNumber: [{ phone: '+66123456789', status: 'unverified' }],
        customerPolicyAddress: [
          {
            address: 'qw',
            addressType: 'personal',
            district: 100100,
            fullName: '`131231',
            postCode: 10200,
            province: 100000,
            subDistrict: 100101,
          },
        ],
        customerShippingAddress: [
          {
            address: 'qw',
            addressType: 'personal',
            district: 100100,
            fullName: '`131231',
            postCode: 10200,
            province: 100000,
            subDistrict: 100101,
          },
        ],
        locale: 'th-en',
        preferredInsurer: 29,
        registeredProvince: 100000,
        utm: { lead_source: 'rabbit.co.th' },
        voluntaryInsuranceType: ['type_2'],
      },
      source: 'sources/9dc888b0-1676-4359-9186-2b368fcfe93f',
      assignedTo: 'users/d2b6f25b-b4e4-48fd-8166-7f255af3f8ec',
      status: 'LEAD_STATUS_VALID',
      humanId: 'L62014',
      root: '',
      type: 'LEAD_TYPE_NEW',
      isRejected: false,
      reference: '',
      annotations: null,
      responseTimes: 644,
    };
    const carInfoGeneral = {
      year: 2020,
      brand: 'Toyota',
      model: 'Vios',
      engineSize: 1.5,
      transmissionType: 'Automatic',
      sumInsuredMax: 431500,
      carProvince: 'Bangkok',
      carProvinceOIC: {
        name: 'provinces/100000',
        nameEn: 'Bangkok',
        nameTh: 'กรุงเทพมหานคร',
        responseTimes: 838,
      },
      noOfDoor: 4,
      cabType: '',
    };
    const expectedResult = {
      year: 2020,
      brand: 'Toyota',
      model: 'Vios',
      engineSize: 1.5,
      transmission: 'Automatic',
      noOfDoor: 4,
      cabType: '',
      dashCam: true,
      purpose: 'personal',
      province: 'Bangkok',
      modification: true,
    };
    expect(formatCarInfo(customerInfo, carInfoGeneral)).toEqual(expectedResult);
  });

  it('Test formatCarInfo second condition', () => {
    expect(
      formatCarInfo(
        {},
        {
          noOfDoor: null,
        }
      )
    ).toEqual({
      year: 0,
      brand: '',
      model: '',
      engineSize: 0,
      transmission: '',
      noOfDoor: '',
      cabType: '',
      dashCam: false,
      purpose: '',
      province: '',
      modification: false,
      licensePlate: undefined,
    });
  });
  describe('Test covertMandatory', () => {
    it('Should return yes with mandatory type', () => {
      expect(convertMandatory('mandatory')).toEqual('Yes');
    });
    it('Should return no with voluntary type', () => {
      expect(convertMandatory('voluntary')).toEqual('No');
    });
    it('Should return empty', () => {
      expect(convertMandatory('')).toEqual('');
    });
  });

  it('Test canViewLead', () => {
    expect(
      getProvinceNameByLanguage({
        name: 'provinces/100000',
        nameEn: 'Bangkok',
        nameTh: 'กรุงเทพมหานคร',
        responseTimes: 744,
      } as any)
    ).toEqual('กรุงเทพมหานคร');
  });

  afterEach(() => {
    setState.mockClear();
    showModalFn.mockClear();
  });
});
