import { TokenType } from 'data/constants';
import {
  formatInsurerInfo,
  getProvinceNameByLanguage,
  camelCase,
  canViewLead,
  getFieldTitle,
  formatCustomerInfo,
  getValueVoluntaryInsuranceType,
  customCarGeneral,
  sortPreferedInsurers,
  getCarDescription,
  getCityProvinceName,
} from 'presentation/pages/LeadDetailsPage/leadDetailsPage.helper';
import { LANGUAGES } from 'presentation/theme/localization';

const customer = {
  important: false,
  name: 'leads/c7efaff4-024a-4356-9f0d-b21bb5544d8b',
  createTime: '2021-06-28T04:20:27.110054Z',
  updateTime: '2021-07-02T06:06:08.756010Z',
  deleteTime: null,
  createBy: '',
  product: 'products/car-insurance',
  schema: 'schemas/efce3390-8da6-44b3-9e4c-2c7b78ca2c9d',
  data: {
    carDashCam: true,
    carModified: false,
    carSubModelYear: 33264,
    carUsageType: 'personal',
    currentInsurer: 27,
    customerDOB: '1987-01-21',
    customerEmail: ['sunees@rabbit.co.th'],
    customerFirstName: 'Puitest Si',
    customerGender: 'f',
    customerLastName: 'Testsri',
    customerPhoneNumber: [
      {
        phone: '+66987777383',
        status: 'unverified',
      },
    ],
    insuranceKind: 'both',
    locale: 'th-en',
    marketingConsent: false,
    policyStartDate: '2021-07-02',
    policyExpiryDate: '2021-07-06',
    preferredInsurer: 7,
    registeredProvince: 110000,
    voluntaryInsuranceType: ['type_1', 'type_2+', 'type_3+'],
    carLicensePlate: '231-3242 กท',
  },
  source: 'sources/9dc888b0-1676-4359-9186-2b368fcfe93f',
  assignedTo: 'users/382bd655-a62c-497f-a24a-da6e4ed6967e',
  status: 'LEAD_STATUS_VALID',
  humanId: 'L111050',
  root: '',
  type: 'LEAD_TYPE_NEW',
  isRejected: false,
  reference: '',
  annotations: null,
  responseTimes: 250,
};

const insurers: any = {
  insurers: [
    {
      name: 'insurers/42',
      displayName: 'FPG Insurance',
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
    {
      name: 'insurers/37',
      displayName: 'AIG Insurance (Thailand) Public Company Limited',
      order: 18,
      id: 37,
    },
    {
      name: 'insurers/36',
      displayName: 'Sri Ayudhaya General Insurance Public Company Limited',
      order: 3,
      id: 36,
    },
    {
      name: 'insurers/35',
      displayName: 'Safety Insurance Public Company Limited',
      order: 5,
      id: 35,
    },
    {
      name: 'insurers/34',
      displayName: 'MSIG Insurance (Thailand) Public Company Limited',
      order: 3,
      id: 34,
    },
    {
      name: 'insurers/33',
      displayName: 'LMG Insurance Company Limited',
      order: 12,
      id: 33,
    },
    {
      name: 'insurers/32',
      displayName: 'Krungthai Panich Insurance Public Company Limited',
      order: 1,
      id: 32,
    },
    {
      name: 'insurers/31',
      displayName: 'The Navakij Insurance Public Company Limited',
      order: 13,
      id: 31,
    },
    {
      name: 'insurers/30',
      displayName: 'Generali Insurance (Thailand) Public Company Limited',
      order: 1,
      id: 30,
    },
    {
      name: 'insurers/29',
      displayName: 'Samaggi Insurance Company Limited (Thailand)',
      order: 1,
      id: 29,
    },
    {
      name: 'insurers/28',
      displayName: 'Thanachart Insurance Co., Ltd',
      order: 4,
      id: 28,
    },
    {
      name: 'insurers/27',
      displayName: 'The Viriyah Insurance Company Limited',
      order: 2,
      id: 27,
    },
    {
      name: 'insurers/26',
      displayName: 'Tokio Marine Insurance (Thailand) Public Company Limited',
      order: 1,
      id: 26,
    },
    {
      name: 'insurers/25',
      displayName: 'Thaivivat Insurance Public Co., Ltd.',
      order: 6,
      id: 25,
    },
    {
      name: 'insurers/24',
      displayName: 'Thaisri Insurance Public Company Limited',
      order: 3,
      id: 24,
    },
    {
      name: 'insurers/23',
      displayName: 'Thai Setakij Insurance Public Company Limited',
      order: 2,
      id: 23,
    },
    {
      name: 'insurers/22',
      displayName: 'Siam City Insurance PLC',
      order: 2,
      id: 22,
    },
    {
      name: 'insurers/21',
      displayName: 'Thai Insurance Public Company Limited',
      order: 2,
      id: 21,
    },
    {
      name: 'insurers/20',
      displayName: 'Syn Mun Kong Insurance Public Company Limited',
      order: 15,
      id: 20,
    },
    {
      name: 'insurers/19',
      displayName: 'The South East Insurance Public Company Limited',
      order: 7,
      id: 19,
    },
    {
      name: 'insurers/18',
      displayName: 'Nam Seng Insurance Public Company Limited',
      order: 2,
      id: 18,
    },
    {
      name: 'insurers/17',
      displayName: 'Muang Thai Insurance Public Company Limited',
      order: 9,
      id: 17,
    },
    {
      name: 'insurers/16',
      displayName: 'Mittare Insurance Public Company Limited',
      order: 2,
      id: 16,
    },
    {
      name: 'insurers/15',
      displayName: 'KSK Insurance (Thailand) Public Company Limited',
      order: 2,
      id: 15,
    },
    {
      name: 'insurers/14',
      displayName: 'Kamol Insurance Public Company Limited',
      order: 2,
      id: 14,
    },
    {
      name: 'insurers/13',
      displayName: 'Indara Insurance Public Company Limited',
      order: 2,
      id: 13,
    },
    {
      name: 'insurers/12',
      displayName: 'Erawan Insurance Co.,Ltd.',
      order: 2,
      id: 12,
    },
    {
      name: 'insurers/11',
      displayName: 'Dhipaya Insurance Public Company Limited',
      order: 8,
      id: 11,
    },
    {
      name: 'insurers/10',
      displayName: 'The Deves Insurance Public Company Limited',
      order: 14,
      id: 10,
    },
    {
      name: 'insurers/9',
      displayName: 'Charan Insurance Public Company Limited',
      order: 3,
      id: 9,
    },
    {
      name: 'insurers/8',
      displayName: 'Chao Phaya Inurance Pubilic Company Limited',
      order: 3,
      id: 8,
    },
    {
      name: 'insurers/7',
      displayName: 'Bangkok Insurance Public Company Limited',
      order: 1,
      id: 7,
    },
    {
      name: 'insurers/6',
      displayName: 'AXA Insurance Pubilic Company Limited',
      order: 11,
      id: 6,
    },
    {
      name: 'insurers/5',
      displayName: 'Assets Insurance Public Company Limited',
      order: 17,
      id: 5,
    },
    {
      name: 'insurers/4',
      displayName: 'Asia Insurance 1950 Co., Ltd',
      order: 10,
      id: 4,
    },
    {
      name: 'insurers/3',
      displayName: 'Aioi Bangkok Insurance Public Company Limited',
      order: 3,
      id: 3,
    },
    {
      name: 'insurers/2',
      displayName: 'Thai Paiboon Insurance PLC',
      order: 3,
      id: 2,
    },
    {
      name: 'insurers/1',
      displayName: 'Allianz  General Insurance Public Company Limited',
      order: 16,
      id: 1,
    },
  ],
};

const tempInsurerInfo = {
  currentInsurer: 'The Viriyah Insurance Company Limited',
  preferredType: [
    {
      title: 'Type 1',
      value: 'type_1',
    },
    {
      title: 'Type 2+',
      value: 'type_2+',
    },
    {
      title: 'Type 3+',
      value: 'type_3+',
    },
  ],
  preferredSumInsured: 0,
  mandatory: 'Yes',
  startDate: '2021-07-02',
  expiryDate: '2021-07-06',
  paymentSchedule: 0,
  preferredInsurer: 7,
  youngestDriverDob: '',
  coupon: '',
  status: 'LEAD_STATUS_VALID',
};

test('Format preferred type', () => {
  expect(formatInsurerInfo(customer, insurers)).toEqual(tempInsurerInfo);
});

test('Format preferred type with null field', () => {
  expect(formatInsurerInfo(null, insurers)).toEqual(undefined);
});

test('Format preferred type with fallback value', () => {
  expect(formatInsurerInfo({}, { insurers: [] } as any)).toEqual({
    currentInsurer: '',
    preferredInsurer: undefined,
    preferredType: undefined,
    preferredSumInsured: 0,
    mandatory: '',
    expiryDate: undefined,
    startDate: undefined,
    youngestDriverDob: '',
    coupon: '',
    status: '',
    paymentSchedule: 0,
  });
});

const province = {
  name: 'provinces/110000',
  nameEn: 'Samut Prakan',
  nameTh: 'สมุทรปราการ',
  responseTimes: 230,
};

const provinceThExpect = 'สมุทรปราการ';
const provinceEnExpect = 'Samut Prakan';

test('Get province name by Thai language', () => {
  // Pre-condition: Set language to test
  localStorage.setItem(TokenType.Locale, LANGUAGES.THAI);
  expect(getProvinceNameByLanguage(province)).toEqual(provinceThExpect);
  localStorage.clear();
});

test('Get province name by English language', () => {
  // Pre-condition: Set language to test
  localStorage.setItem(TokenType.Locale, LANGUAGES.ENGLISH);
  expect(getProvinceNameByLanguage(province)).toEqual(provinceEnExpect);
  localStorage.clear();
});

const string1 = 'Model';
const stringExpect1 = 'model';

const string2 = 'License plate';
const stringExpect2 = 'licensePlate';

const string3 = 'Lead ID';
const stringExpect3 = 'leadId';

const string4 = '';
const stringExpect4 = '';

const string5 = '     ';
const stringExpect5 = '';

test('Transform string to camel case', () => {
  expect(camelCase(string1)).toEqual(stringExpect1);
});

test('Transform string to camel case', () => {
  expect(camelCase(string2)).toEqual(stringExpect2);
});

test('Transform string to camel case', () => {
  expect(camelCase(string3)).toEqual(stringExpect3);
});

test('Transform string to camel case', () => {
  expect(camelCase(string4)).toEqual(stringExpect4);
});

test('Transform string to camel case', () => {
  expect(camelCase(string5)).toEqual(stringExpect5);
});

const user1 = {
  id: '6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  name: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  createTime: '2020-08-31T09:01:37.201556Z',
  updateTime: '2021-07-09T08:13:27.247429Z',
  deleteTime: null,
  createBy: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  humanId: 'attilam@rabbit.co.th',
  role: 'roles/admin',
  firstName: 'Attila',
  lastName: 'Molnar',
  annotations: {},
  loginTime: '2021-07-09T08:13:27.238087Z',
  responseTimes: 191,
};

const user2 = {
  id: '6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  name: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  createTime: '2020-08-31T09:01:37.201556Z',
  updateTime: '2021-07-09T08:13:27.247429Z',
  deleteTime: null,
  createBy: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  humanId: 'attilam@rabbit.co.th',
  role: 'roles/manager',
  firstName: 'Attila',
  lastName: 'Molnar',
  annotations: {},
  loginTime: '2021-07-09T08:13:27.238087Z',
  responseTimes: 191,
};

const user3 = {
  id: '6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  name: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  createTime: '2020-08-31T09:01:37.201556Z',
  updateTime: '2021-07-09T08:13:27.247429Z',
  deleteTime: null,
  createBy: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  humanId: 'attilam@rabbit.co.th',
  role: 'roles/inbound',
  firstName: 'Attila',
  lastName: 'Molnar',
  annotations: {},
  loginTime: '2021-07-09T08:13:27.238087Z',
  responseTimes: 191,
};

const user4 = {
  id: '6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  name: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  createTime: '2020-08-31T09:01:37.201556Z',
  updateTime: '2021-07-09T08:13:27.247429Z',
  deleteTime: null,
  createBy: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  humanId: 'attilam@rabbit.co.th',
  role: 'roles/supervisor',
  firstName: 'Attila',
  lastName: 'Molnar',
  annotations: {},
  loginTime: '2021-07-09T08:13:27.238087Z',
  responseTimes: 191,
};

const user5 = {
  id: '6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  name: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  createTime: '2020-08-31T09:01:37.201556Z',
  updateTime: '2021-07-09T08:13:27.247429Z',
  deleteTime: null,
  createBy: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  humanId: 'attilam@rabbit.co.th',
  role: 'roles/sales',
  firstName: 'Attila',
  lastName: 'Molnar',
  annotations: {},
  loginTime: '2021-07-09T08:13:27.238087Z',
  responseTimes: 191,
};

const user6 = {
  id: '6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  name: 'users/382bd655-a62c-497f-a24a-da6e4ed6967e',
  createTime: '2020-08-31T09:01:37.201556Z',
  updateTime: '2021-07-09T08:13:27.247429Z',
  deleteTime: null,
  createBy: 'users/6f35b998-c1e0-4dea-bd0b-ee3a008242f9',
  humanId: 'attilam@rabbit.co.th',
  role: 'roles/sales',
  firstName: 'Attila',
  lastName: 'Molnar',
  annotations: {},
  loginTime: '2021-07-09T08:13:27.238087Z',
  responseTimes: 191,
};

const currentCustomer = {
  important: false,
  name: 'leads/c7efaff4-024a-4356-9f0d-b21bb5544d8b',
  assignedTo: 'users/382bd655-a62c-497f-a24a-da6e4ed6967e',
};

test('Check permission can view lead with role admin', () => {
  expect(canViewLead(user1, currentCustomer)).toEqual(true);
});

test('Check permission can view lead with role manager', () => {
  expect(canViewLead(user2, currentCustomer)).toEqual(true);
});

test('Check permission can view lead with role inbound', () => {
  expect(canViewLead(user3, currentCustomer)).toEqual(true);
});

test('Check permission can view lead with role supervisor', () => {
  expect(canViewLead(user4, currentCustomer)).toEqual(true);
});

test('Check permission can view lead with role sales', () => {
  expect(canViewLead(user5, currentCustomer)).toEqual(false);
});

test('Check permission can view lead with role sales and same name', () => {
  expect(canViewLead(user6, currentCustomer)).toEqual(true);
});

test('Should be return false if not have user', () => {
  expect(canViewLead(null, {})).toEqual(false);
});

test('Should be return false if not have lead', () => {
  expect(canViewLead({}, null)).toEqual(false);
});

test('Should be return false if not have both of user and lead', () => {
  expect(canViewLead(null, null)).toEqual(false);
});

test('Should be false if user role not correct', () => {
  expect(canViewLead({ role: 'test' }, {})).toEqual(false);
});
const property1 = 'dob';
const property2 = 'leadId';
const property3 = 'redPlate';
const property4 = '';
const property5 = '      ';

const titleExpect1 = 'leadDetailFields.dob';
const titleExpect2 = 'leadDetailFields.leadid';
const titleExpect3 = 'leadDetailFields.redplate';
const titleExpect4 = '';
const titleExpect5 = '';

test('Get title from property', () => {
  expect(getFieldTitle(property1)).toEqual(titleExpect1);
});

test('Get title from property', () => {
  expect(getFieldTitle(property2)).toEqual(titleExpect2);
});

test('Get title from property', () => {
  expect(getFieldTitle(property3)).toEqual(titleExpect3);
});

test('Get title from property', () => {
  expect(getFieldTitle(property4)).toEqual(titleExpect4);
});

test('Get title from property', () => {
  expect(getFieldTitle(property5)).toEqual(titleExpect5);
});

const customerCityName: any[] = [];
const customerExpect = {
  lead: {
    customerFirstName: 'Puitest Si',
    customerLastName: 'Testsri',
    status: 'LEAD_STATUS_VALID',
    gender: 'f',
    customerDob: '1987-01-21',
    age: 34,
    customerProvince: '',
    customerCity: '',
    customerReference: '',
    leadType: 'leadTypeFilter.new',
    leadReference: 'L111050',
    leadParent: '',
    name: 'leads/c7efaff4-024a-4356-9f0d-b21bb5544d8b',
    isRejected: false,
    reference: null,
    agentName: 'Siriwan',
  },
  customer: {
    firstName: 'Puitest Si',
    lastName: 'Testsri',
    gender: 'f',
    latestLead: '02/08/2020(2560) (5:13:39PM)',
    latestOrder: '02/08/2020(2560) (5:13:39PM)',
  },
  policyHolder: {
    title: 'Mr',
    firstName: 'Siriwan',
    lastName: 'Siriwan',
    DOB: '12/12/1996',
    age: '',
    province: 'krabi',
    city: 'Ao luk',
  },
  leadInfo: { agentName: 'Siriwan', id: 'L111050', type: 'leadTypeFilter.new' },
};

describe('Test formatCustomerInfo', () => {
  it('Should return undefined if customer undefined', () => {
    expect(formatCustomerInfo(undefined, customerCityName)).toEqual(undefined);
  });
  it('Should be return customer format', () => {
    expect(formatCustomerInfo(customer, customerCityName)).toEqual(
      customerExpect
    );
  });
});

const voluntaryInsuranceType = [
  {
    title: 'Type 3+',
    value: 'type_3+',
  },
];

const voluntaryInsuranceTypeExpect = ['type_3+'];

test('Get value voluntary insurance type', () => {
  expect(getValueVoluntaryInsuranceType(voluntaryInsuranceType)).toEqual(
    voluntaryInsuranceTypeExpect
  );
});

const [carSubModel, carModel, carBrand, carProvince, carYear] = [
  {
    name: 'brands/24/models/186/submodels/1302',
    displayName: 'Coupe 2dr JP CVT Front Wheel Drive 1.5i',
    engineSize: 1497,
    engineDescription: 1.5,
    transmissionType: 'Automatic',
    responseTimes: 220,
  },
  {
    name: 'brands/24/models/186',
    displayName: 'CR-Z',
    order: 0,
    responseTimes: 216,
  },
  {
    name: 'brands/24',
    displayName: 'Honda',
    order: 2,
    responseTimes: 221,
  },
  {
    name: 'provinces/100000',
    nameEn: 'Bangkok',
    nameTh: 'กรุงเทพมหานคร',
    responseTimes: 232,
  },
  {
    name: 'brands/24/models/186/submodels/1302/years/4657',
    year: 2014,
    sumInsuredMin: 1380000,
    sumInsuredMax: 716000,
    fuelType: 'Petrol',
    month: 3,
    redbookId: 'HOND14BP',
    responseTimes: 228,
  },
];

const customCarThExpect = {
  year: 2014,
  brand: 'Honda',
  model: 'CR-Z',
  engineSize: 1.5,
  transmissionType: 'Automatic',
  sumInsuredMax: 716000,
  carProvince: 'กรุงเทพมหานคร',
  carProvinceOIC: {
    name: 'provinces/100000',
    nameEn: 'Bangkok',
    nameTh: 'กรุงเทพมหานคร',
    responseTimes: 232,
  },
};

const customCarEnExpect = {
  year: 2014,
  brand: 'Honda',
  model: 'CR-Z',
  engineSize: 1.5,
  transmissionType: 'Automatic',
  sumInsuredMax: 716000,
  carProvince: 'Bangkok',
  carProvinceOIC: {
    name: 'provinces/100000',
    nameEn: 'Bangkok',
    nameTh: 'กรุงเทพมหานคร',
    responseTimes: 232,
  },
};

test('Custom car general information with current language is thai', () => {
  // Pre-condition: Set language to test
  localStorage.setItem(TokenType.Locale, LANGUAGES.THAI);
  expect(
    customCarGeneral([carSubModel, carModel, carBrand, carProvince, carYear])
  ).toEqual(customCarThExpect);
  localStorage.clear();
});

test('Custom car general information with current language is english', () => {
  // Pre-condition: Set language to test
  localStorage.setItem(TokenType.Locale, LANGUAGES.ENGLISH);
  expect(
    customCarGeneral([carSubModel, carModel, carBrand, carProvince, carYear])
  ).toEqual(customCarEnExpect);
  localStorage.clear();
});

const insurersExpect = [
  {
    name: 'insurers/7',
    displayName: 'Bangkok Insurance Public Company Limited',
    order: 1,
    id: 7,
  },
  {
    name: 'insurers/27',
    displayName: 'The Viriyah Insurance Company Limited',
    order: 2,
    id: 27,
  },
  {
    name: 'insurers/28',
    displayName: 'Thanachart Insurance Co., Ltd',
    order: 4,
    id: 28,
  },
  {
    name: 'insurers/35',
    displayName: 'Safety Insurance Public Company Limited',
    order: 5,
    id: 35,
  },
  {
    name: 'insurers/23',
    displayName: 'Thai Setakij Insurance Public Company Limited',
    order: 2,
    id: 23,
  },
  {
    name: 'insurers/19',
    displayName: 'The South East Insurance Public Company Limited',
    order: 7,
    id: 19,
  },
  {
    name: 'insurers/5',
    displayName: 'Assets Insurance Public Company Limited',
    order: 17,
    id: 5,
  },
  {
    name: 'insurers/33',
    displayName: 'LMG Insurance Company Limited',
    order: 12,
    id: 33,
  },
  {
    name: 'insurers/11',
    displayName: 'Dhipaya Insurance Public Company Limited',
    order: 8,
    id: 11,
  },
  {
    name: 'insurers/37',
    displayName: 'AIG Insurance (Thailand) Public Company Limited',
    order: 18,
    id: 37,
  },
  {
    name: 'insurers/3',
    displayName: 'Aioi Bangkok Insurance Public Company Limited',
    order: 3,
    id: 3,
  },
  {
    name: 'insurers/1',
    displayName: 'Allianz  General Insurance Public Company Limited',
    order: 16,
    id: 1,
  },
  {
    name: 'insurers/4',
    displayName: 'Asia Insurance 1950 Co., Ltd',
    order: 10,
    id: 4,
  },
  {
    name: 'insurers/6',
    displayName: 'AXA Insurance Pubilic Company Limited',
    order: 11,
    id: 6,
  },
  {
    name: 'insurers/8',
    displayName: 'Chao Phaya Inurance Pubilic Company Limited',
    order: 3,
    id: 8,
  },
  {
    name: 'insurers/9',
    displayName: 'Charan Insurance Public Company Limited',
    order: 3,
    id: 9,
  },
  {
    name: 'insurers/40',
    displayName: 'Chubb Samaggi Insurance Co. (PLC)',
    order: 3,
    id: 40,
  },
  {
    name: 'insurers/12',
    displayName: 'Erawan Insurance Co.,Ltd.',
    order: 2,
    id: 12,
  },
  {
    name: 'insurers/42',
    displayName: 'FPG Insurance',
    order: 3,
    id: 42,
  },
  {
    name: 'insurers/30',
    displayName: 'Generali Insurance (Thailand) Public Company Limited',
    order: 1,
    id: 30,
  },
  {
    name: 'insurers/13',
    displayName: 'Indara Insurance Public Company Limited',
    order: 2,
    id: 13,
  },
  {
    name: 'insurers/14',
    displayName: 'Kamol Insurance Public Company Limited',
    order: 2,
    id: 14,
  },
  {
    name: 'insurers/32',
    displayName: 'Krungthai Panich Insurance Public Company Limited',
    order: 1,
    id: 32,
  },
  {
    name: 'insurers/15',
    displayName: 'KSK Insurance (Thailand) Public Company Limited',
    order: 2,
    id: 15,
  },
  {
    name: 'insurers/16',
    displayName: 'Mittare Insurance Public Company Limited',
    order: 2,
    id: 16,
  },
  {
    name: 'insurers/34',
    displayName: 'MSIG Insurance (Thailand) Public Company Limited',
    order: 3,
    id: 34,
  },
  {
    name: 'insurers/17',
    displayName: 'Muang Thai Insurance Public Company Limited',
    order: 9,
    id: 17,
  },
  {
    name: 'insurers/18',
    displayName: 'Nam Seng Insurance Public Company Limited',
    order: 2,
    id: 18,
  },
  {
    name: 'insurers/38',
    displayName: 'Roojai Insurance',
    order: 3,
    id: 38,
  },
  {
    name: 'insurers/29',
    displayName: 'Samaggi Insurance Company Limited (Thailand)',
    order: 1,
    id: 29,
  },
  {
    name: 'insurers/22',
    displayName: 'Siam City Insurance PLC',
    order: 2,
    id: 22,
  },
  {
    name: 'insurers/36',
    displayName: 'Sri Ayudhaya General Insurance Public Company Limited',
    order: 3,
    id: 36,
  },
  {
    name: 'insurers/20',
    displayName: 'Syn Mun Kong Insurance Public Company Limited',
    order: 15,
    id: 20,
  },
  {
    name: 'insurers/21',
    displayName: 'Thai Insurance Public Company Limited',
    order: 2,
    id: 21,
  },
  {
    name: 'insurers/2',
    displayName: 'Thai Paiboon Insurance PLC',
    order: 3,
    id: 2,
  },
  {
    name: 'insurers/24',
    displayName: 'Thaisri Insurance Public Company Limited',
    order: 3,
    id: 24,
  },
  {
    name: 'insurers/25',
    displayName: 'Thaivivat Insurance Public Co., Ltd.',
    order: 6,
    id: 25,
  },
  {
    name: 'insurers/10',
    displayName: 'The Deves Insurance Public Company Limited',
    order: 14,
    id: 10,
  },
  {
    name: 'insurers/31',
    displayName: 'The Navakij Insurance Public Company Limited',
    order: 13,
    id: 31,
  },
  {
    name: 'insurers/26',
    displayName: 'Tokio Marine Insurance (Thailand) Public Company Limited',
    order: 1,
    id: 26,
  },
];

test('Sort preferred insurers by fixed list and display name', () => {
  expect(sortPreferedInsurers(insurers.insurers)).toEqual(insurersExpect);
});

describe('Test getCarDescription', () => {
  const input = {
    name: 'brands/54/models/632/submodels/10819/years/42772',
  };
  it('Should be return car info', () => {
    expect(getCarDescription(input)).toEqual({
      brand: 'brands/54',
      model: 'brands/54/models/632',
      subModel: 'brands/54/models/632/submodels/10819',
    });
  });
});

describe('Test getCityProvince', () => {
  it('Should be return city and province', () => {
    expect(getCityProvinceName('1', '1')).toEqual({
      province: '1',
      districts: '1',
    });
  });
  it('Should be return empty if input empty ', () => {
    expect(getCityProvinceName('', '')).toEqual({
      province: '',
      districts: '',
    });
  });
});
