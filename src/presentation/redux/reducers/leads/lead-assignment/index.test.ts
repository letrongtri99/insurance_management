import moment from 'moment';
import {
  getTime,
  getSortedDate,
  getValidAppointmentDate,
  customTrueFalse,
  customerGender,
  customerLeadStatus,
  customerLeadType,
  customerPolicyType,
  formatLeadAssignment,
  customRejectionReason,
} from './index';

const unsortedDate = [
  { startTime: '2021-11-08T12:42:00Z' },
  { startTime: '2021-06-28T15:30:00Z' },
  { startTime: '2021-06-28T14:30:00Z' },
];

const sortedDate = [
  { startTime: '2021-06-28T14:30:00Z' },
  { startTime: '2021-06-28T15:30:00Z' },
  { startTime: '2021-11-08T12:42:00Z' },
];

const pastAppointment = [
  {
    endTime: moment().utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment()
      .utc()
      .subtract(1, 'day')
      .subtract(15, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
  },
];

const futureAppointment = [
  {
    endTime: moment()
      .utc()
      .add(1, 'day')
      .add(15, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment().utc().add(1, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
  },
];

const pastAppointments = [
  {
    endTime: moment()
      .utc()
      .subtract(10, 'days')
      .add(10, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment()
      .utc()
      .subtract(10, 'days')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
  },
  {
    endTime: moment()
      .utc()
      .subtract(5, 'days')
      .add(10, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment()
      .utc()
      .subtract(5, 'days')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
  },
  {
    endTime: moment()
      .utc()
      .subtract(1, 'day')
      .add(10, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment().utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
  },
];

const futureAppointments = [
  {
    endTime: moment()
      .utc()
      .add(15, 'minutes')
      .add(12, 'days')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment().utc().add(12, 'days').format('YYYY-MM-DDTHH:mm:ssZ'),
  },
  {
    endTime: moment()
      .utc()
      .add(15, 'minutes')
      .add(2, 'hour')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment().utc().add(2, 'hours').format('YYYY-MM-DDTHH:mm:ssZ'),
  },
];

const mixedAppointments = [
  {
    endTime: moment().utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment()
      .utc()
      .subtract(1, 'day')
      .add(15, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
  },
  {
    endTime: moment()
      .utc()
      .subtract(5, 'day')
      .add(15, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment().utc().subtract(5, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
  },
  {
    endTime: moment()
      .utc()
      .add(10, 'days')
      .add(15, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ'),
    startTime: moment().utc().add(10, 'days').format('YYYY-MM-DDTHH:mm:ssZ'),
  },
];

describe('Lead Assignment', () => {
  describe('getTime', () => {
    it('returns 1636375320000 as time when', () => {
      expect(getTime('2021-11-08T12:42:00Z')).toEqual(1636375320000);
    });
    it('Should be return 0 if input is falsy', () => {
      expect(getTime('')).toEqual(0);
    });
  });

  describe('getSortedDate', () => {
    it('returns sortedDate when pass unsortedDate', () => {
      expect(getSortedDate(unsortedDate)).toEqual(sortedDate);
    });
  });

  describe('getValidAppointmentDate', () => {
    it('returns the appointment start date when passed only 1 appointment past data', () => {
      expect(getValidAppointmentDate(pastAppointment)).toEqual(
        moment(pastAppointment[0].startTime)
          .utc()
          .format('DD/MM/YYYY (hh:mm:ss A)')
      );
    });

    it('returns the appointment start date when passed only 1 appointment future data', () => {
      expect(getValidAppointmentDate(futureAppointment)).toEqual(
        moment(futureAppointment[0].startTime)
          .utc()
          .format('DD/MM/YYYY (hh:mm:ss A)')
      );
    });

    it('returns last appointment date when passed with past multiple appointments data', () => {
      expect(getValidAppointmentDate(pastAppointments)).toEqual(
        moment(pastAppointments[2].startTime)
          .utc()
          .format('DD/MM/YYYY (hh:mm:ss A)')
      );
    });

    it('returns earliest appointment date when passed with future appointment data', () => {
      expect(getValidAppointmentDate(futureAppointments)).toEqual(
        moment(futureAppointments[1].startTime)
          .utc()
          .format('DD/MM/YYYY (hh:mm:ss A)')
      );
    });

    it('returns last appointment date when passed with mixed appointments data', () => {
      expect(getValidAppointmentDate(mixedAppointments)).toEqual(
        moment(mixedAppointments[0].startTime)
          .utc()
          .format('DD/MM/YYYY (hh:mm:ss A)')
      );
    });
  });
});

describe('Test customTrueFalse', () => {
  it('Should be return empty if input is not boolean', () => {
    expect(customTrueFalse('' as any)).toEqual('');
  });
  it('Should be return Yes if input is true', () => {
    expect(customTrueFalse(true)).toEqual('Yes');
  });
  it('Should be return No if input is false', () => {
    expect(customTrueFalse(false)).toEqual('No');
  });
});

describe('Test customGender', () => {
  it('Should be return empty if input is empty', () => {
    expect(customerGender('' as any)).toEqual('');
  });
  it('Should be return "Male" if input is is "m"', () => {
    expect(customerGender('m')).toEqual('Male');
  });
  it('Should be return "Female" if input is false', () => {
    expect(customerGender('f')).toEqual('Female');
  });
});

describe('Test customerLeadStatus', () => {
  it('Should be return empty if status not found', () => {
    expect(customerLeadStatus('')).toEqual('');
  });
  it('Should be return lead title status', () => {
    expect(customerLeadStatus('LEAD_STATUS_NEW')).toEqual('leadStatus.new');
  });
});

describe('Test customerLeadType', () => {
  it('Should be return empty if not found lead type', () => {
    expect(customerLeadType('')).toEqual('');
  });
  it('Should be return lead type', () => {
    expect(customerLeadType('LEAD_TYPE_NEW')).toEqual('leadTypeFilter.new');
  });
});

describe('Test customerPolicyType', () => {
  it('Should be return null if input is empty array', () => {
    expect(customerPolicyType([])).toEqual('');
  });
  it('Should be return combine string of policy type', () => {
    expect(customerPolicyType(['type_1', 'type_2'])).toEqual('Type 1, Type 2');
  });
});

describe('Test customerRejectionReason', () => {
  it('Should return null if not found rejection', () => {
    expect(customRejectionReason('')).toEqual(null);
  });

  it('Should return rejection title', () => {
    expect(customRejectionReason('wrong_number')).toEqual(
      'rejectReason.wrongNumber'
    );
  });
});

describe('Test formatLeadAssignment', () => {
  it('Should be return empty array if input is empty', () => {
    expect(formatLeadAssignment([])).toEqual([]);
  });
  it('Should be array lead assignment if input not empty', () => {
    expect(
      formatLeadAssignment([
        {
          lead: {
            name: 'leads/6b020c28-b423-4340-8c30-5c59a1d03f64',
            createTime: '',
            updateTime: '',
            deleteTime: null,
            createBy: '',
            product: 'products/car-insurance',
            schema: 'schemas/efce3390-8da6-44b3-9e4c-2c7b78ca2c9d',
            data: {
              carDashCam: true,
              carLicensePlate: 'kkkk',
              carModified: false,
              carSubModelYear: 18887,
              carUsageType: 'personal',
              currentInsurer: 27,
              customerDOB: '',
              customerEmail: ['test@test.com'],
              customerFirstName: 'Test',
              customerGender: 'm',
              customerLastName: 'Test',
              customerPhoneNumber: [
                { phone: '+66123456789', status: 'unverified' },
              ],
              customerPolicyAddress: [
                {
                  address: 'số 9, ngõ 29, trần phú',
                  addressType: 'personal',
                  district: 110200,
                  firstName: 'test',
                  lastName: 'test',
                  postCode: 10560,
                  province: 110000,
                  subDistrict: 110203,
                },
              ],
              customerShippingAddress: [
                {
                  address: 'số 9, ngõ 29, trần phú',
                  addressType: 'personal',
                  district: 110200,
                  firstName: 'Vu',
                  lastName: 'Thuy',
                  postCode: 10560,
                  province: 110000,
                  subDistrict: 110203,
                },
              ],
              insuranceKind: 'both',
              locale: 'th-en',
              marketingConsent: false,
              policyHolderFirstName: 'John',
              policyHolderLastName: '',
              policyStartDate: '',
              registeredProvince: 100000,
              utm: { lead_source: 'rabbit.co.th' },
              voluntaryInsuranceType: ['type_2+', 'type_3+'],
            },
            source: 'sources/9dc888b0-1676-4359-9186-2b368fcfe93f',
            important: false,
            assignedTo: '',
            status: 'LEAD_STATUS_NEW',
            humanId: 'L62015',
            root: '',
            type: 'LEAD_TYPE_NEW',
            isRejected: false,
          },
          source: {
            name: 'sources/9dc888b0-1676-4359-9186-2b368fcfe93f',
            createTime: '',
            updateTime: '',
            deleteTime: null,
            createBy: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
            updateBy: 'users/60644dcf-1aa6-4565-9d04-124e155641c2',
            product: 'products/car-insurance',
            online: true,
            hidden: false,
            source: '72rf-sales-flow-api',
            medium: 'hydra',
            campaign: 'hydra dummy',
          },
          customer: null,
          team: null,
          insuree: {
            age: 21,
            dateOfBirth: '',
            email: ['test@test.com'],
            firstName: 'Test',
            fullName: 'Test Test',
            gender: 'm',
            lastName: 'Test',
            phone: ['+66123456789'],
          },
          car: {
            brand: 'Honda',
            brandId: 24,
            dashcam: true,
            engineSize: 1497,
            licensePlate: 'kkkk',
            model: 'City',
            modelId: 183,
            modified: false,
            registeredProvince: 'Bangkok',
            registeredProvinceId: 100000,
            submodelId: 5691,
            transmission: 'Automatic',
            usage: 'personal',
            year: 2017,
            yearsId: 18887,
          },
          insurance: {
            currentInsurer: 'Viriyah Insurance',
            currentInsurerId: 27,
            policyStartDate: '',
            voluntaryInsuranceType: ['type_2+', 'type_3+'],
          },
          assigned: null,
          appointments: [
            {
              name: 'calendars/9f48cd36-bad9-430b-8964-ee590c341583/events/da818437-286d-45f1-bd43-9a6d3959daef',
              createTime: '',
              updateTime: '',
              deleteTime: null,
              createBy: 'users/9f48cd36-bad9-430b-8964-ee590c341583',
              startTime: '',
              endTime: '',
              appointment: {
                lead: 'leads/6b020c28-b423-4340-8c30-5c59a1d03f64',
                appointmentType: 'agreed',
                payment: false,
                subject: 'Call test',
              },
            },
            {
              name: 'calendars/9f48cd36-bad9-430b-8964-ee590c341583/events/3a9b4c25-842a-44ff-9396-a4be777cb8d3',
              createTime: '',
              updateTime: '',
              deleteTime: null,
              createBy: 'users/9f48cd36-bad9-430b-8964-ee590c341583',
              startTime: '',
              endTime: '',
              appointment: {
                lead: 'leads/6b020c28-b423-4340-8c30-5c59a1d03f64',
                appointmentType: 'agreed',
                payment: false,
                subject: 'KL',
              },
            },
          ],
          rejections: [],
          attributes: null,
        },
      ])
    ).toEqual([
      {
        phoneNumber: '+66123456789',
        email: 'test@test.com',
        carEngineSize: '1497 L',
        leadDetailId: '6b020c28-b423-4340-8c30-5c59a1d03f64',
        leadType: 'leadTypeFilter.new',
        leadStatus: 'leadStatus.new',
        gender: 'Male',
        marketingConsent: 'No',
        carDashcam: 'Yes',
        carModification: 'No',
        policyPreferredType: 'Type 2+, Type 3+',
        expiryDate: '',
        createdOn: '',
        updatedOn: '',
        assignedOn: '',
        dob: '',
        policyStartDate: '',
        user: ' ',
        teamName: '',
        name: 'Test Test',
        leadScore: '',
        sumInsured: '',
        appointmentDate: '',
        leadId: 'L62015',
        licensePlate: 'kkkk',
        leadSource: '72rf-sales-flow-api',
        customerId: '',
        referralId: '',
        age: 21,
        carBranch: 'Honda',
        carModel: 'City',
        carYear: 2017,
        carTransmission: 'Automatic',
        carUsage: 'personal',
        carRegisteredProvince: 'Bangkok',
        currentInsurer: 'shortInsurers.27',
        lastInsurer: '',
        isChecked: false,
        failedDials: '',
        connectDials: '',
        leadSubStatus: '',
        totalDials: '',
        paymentDate: '',
        renewalId: '',
        piwikId: '',
        lastVisitedOn: '',
        rejectionComment: '',
        commentId: '',
        rejectionReason: null,
        rejectedDate: '',
        rejectionId: '',
        isRejected: false,
        rejections: [],
      },
    ]);
  });
});
