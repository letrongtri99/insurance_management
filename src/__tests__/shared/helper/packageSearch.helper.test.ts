import {
  formatDisplayInsurer,
  PackageSearchFieldName,
  PackageSearchFieldNameArr,
} from 'shared/constants/packageSearchFields';
import {
  otherFields,
  PackageSearch as PackageSearchClass,
} from 'presentation/pages/package/packageSearch/helper';
import { getString } from 'presentation/theme/localization';

const packageSearch = new PackageSearchClass();
const formValues = {
  status: 'ACTIVE',
  insurer: [{ id: 0, displayName: 'FPG Insurance', value: 'insurers/42' }],
  insuranceType: [],
  searchInput: '',
};

const expectOtherField = PackageSearchFieldNameArr.filter(
  (item) => item !== PackageSearchFieldName.STATUS
);

test('Check returned other fields name', () => {
  PackageSearchFieldNameArr.forEach((fieldName) => {
    if (fieldName === PackageSearchFieldName.STATUS) {
      expect(otherFields(fieldName)).toEqual(expectOtherField);
    }
  });
});

test('Check query form value', () => {
  const expectValue = 'status="ACTIVE" insurer in ("insurers/42")';
  expect(packageSearch.queryForm(formValues)).toEqual(expectValue);
});

test('Check convert boolean', () => {
  expect(packageSearch.convertBoolean(true)).toEqual(getString('package.yes'));
  expect(packageSearch.convertBoolean(false)).toEqual(getString('package.no'));
});

test('Check convert price', () => {
  expect(packageSearch.convertPrice(100000)).toEqual('100,000');
});

test('Check convert date', () => {
  expect(packageSearch.convertDate('')).toEqual('');
});

test('Check convert insurance type', () => {
  expect(packageSearch.convertInsuranceType('TYPE_1')).toEqual('1');
});

test('Check convert ioc code', () => {
  expect(packageSearch.convertOicCode('PACKAGE_1')).toEqual('1');
});

test('Check convert insurer id', () => {
  expect(packageSearch.convertOicCode('INSURER_1')).toEqual('1');
});
const packages = [
  {
    name: 'packages/754225',
    displayName:
      'เอฟพีจีประกันภัย ชั้น 1 ซ่อมห้าง (ติดกล้อง+ไม่ระบุชื่อผู้ขับขี่)',
    price: '2050000',
    insurer: 'insurers/42',
    carInsuranceType: 'TYPE_1',
    isFixedPremium: false,
    deductibleAmount: '0',
    sumCoverageMin: '55000000',
    sumCoverageMax: '55000000',
    bailBondCoverage: '30000000',
    fireTheftCoverage: '55000000',
    floodCoverage: '55000000',
    medicalExpensesCoverage: '10000000',
    medicalExpensesCoverageNo: 7,
    personalAccidentCoverage: '10000000',
    personalAccidentCoverageNo: 7,
    liabilityPropertyCoverage: '100000000',
    liabilityPerPersonCoverage: '100000000',
    liabilityPerAccidentCoverage: '1000000000',
    carRepairType: 'DEALER',
    carAgeMin: 4,
    carAgeMax: 4,
    modifiedCarAccepted: true,
    oicCode: 'TYPE_110',
    termsEn: '',
    termsTh: '',
    expireTime: '',
    status: 'INACTIVE',
    filename: '',
    createTime: '',
    updateTime: '',
    broker: 'ASK',
    source: 'MANUAL',
    code: 754225,
    insurerPackageCode: '',
    isEcoCar: false,
    yearlyMileage: 0,
    antiTheftDiscount: '0',
    yearsOwned: 0,
    numberVehiclesHousehold: 0,
    carRegistrationCategory: '',
    drivingPurpose: 'DRIVING_PURPOSES_UNSPECIFIED',
    parkingLocation: '',
    maritalStatus: 'MARTIAL_STATUSES_UNSPECIFIED',
    occupation: '',
    drivingExperience: 0,
    reuseManualPackage: false,
    hasCctvDiscount: true,
    startTime: '',
    isLowCost: false,
    provinces: [
      'provinces/370000',
      'provinces/150000',
      'provinces/100000',
      'provinces/380000',
      'provinces/310000',
      'provinces/240000',
      'provinces/180000',
      'provinces/360000',
      'provinces/220000',
      'provinces/500000',
      'provinces/570000',
      'provinces/200000',
      'provinces/860000',
      'provinces/460000',
      'provinces/620000',
      'provinces/710000',
      'provinces/400000',
      'provinces/810000',
      'provinces/520000',
      'provinces/510000',
      'provinces/420000',
      'provinces/160000',
      'provinces/580000',
      'provinces/440000',
      'provinces/490000',
      'provinces/260000',
      'provinces/730000',
      'provinces/480000',
      'provinces/300000',
      'provinces/600000',
      'provinces/800000',
      'provinces/550000',
      'provinces/960000',
      'provinces/390000',
      'provinces/430000',
      'provinces/120000',
      'provinces/130000',
      'provinces/940000',
      'provinces/820000',
      'provinces/930000',
      'provinces/560000',
      'provinces/670000',
      'provinces/760000',
      'provinces/660000',
      'provinces/650000',
      'provinces/540000',
      'provinces/140000',
      'provinces/830000',
      'provinces/250000',
      'provinces/770000',
      'provinces/850000',
      'provinces/700000',
      'provinces/210000',
      'provinces/450000',
      'provinces/270000',
      'provinces/470000',
      'provinces/110000',
      'provinces/740000',
      'provinces/750000',
      'provinces/190000',
      'provinces/910000',
      'provinces/170000',
      'provinces/330000',
      'provinces/900000',
      'provinces/640000',
      'provinces/720000',
      'provinces/840000',
      'provinces/320000',
      'provinces/630000',
      'provinces/920000',
      'provinces/230000',
      'provinces/340000',
      'provinces/410000',
      'provinces/610000',
      'provinces/530000',
      'provinces/950000',
      'provinces/350000',
    ],
    gender: 'GENDERS_UNSPECIFIED',
    carUsingPurpose: 'CAR_USING_PURPOSES_UNSPECIFIED',
    noClaimBonus: 'NO_CLAIM_BONUS_TYPES_UNSPECIFIED',
    excessType: 'EXCESS_TYPES_UNSPECIFIED',
    minYearsOfHoldingDriverLicense: 0,
    maxYearsOfHoldingDriverLicense: 0,
    minNumberOfClaimsInYear: 0,
    maxNumberOfClaimsInYear: 0,
    maxAge: 0,
    minAge: 0,
    minMileage: 0,
    maxMileage: 0,
    carSubmodels: ['brands/33/models/299/submodels/2327'],
  },
];
const packageRows = {
  data: [
    [
      754225,
      '',
      '42',
      '110',
      'เอฟพีจีประกันภัย ชั้น 1 ซ่อมห้าง (ติดกล้อง+ไม่ระบุชื่อผู้ขับขี่)',
      '',
      '',
      '1',
      '2,050,000',
      '55,000,000',
      '55,000,000',
      4,
      4,
      '0',
      'DEALER',
      '55,000,000',
      '55,000,000',
      '',
      getString('package.yes'),
      '10,000,000',
      7,
      '10,000,000',
      7,
      '30,000,000',
      '100,000,000',
      '100,000,000',
      '1,000,000,000',
      null,
      '2327',
      '',
      '',
      '370000, 150000, 100000, 380000, 310000, 240000, 180000, 360000, 220000, 500000, 570000, 200000, 860000, 460000, 620000, 710000, 400000, 810000, 520000, 510000, 420000, 160000, 580000, 440000, 490000, 260000, 730000, 480000, 300000, 600000, 800000, 550000, 960000, 390000, 430000, 120000, 130000, 940000, 820000, 930000, 560000, 670000, 760000, 660000, 650000, 540000, 140000, 830000, 250000, 770000, 850000, 700000, 210000, 450000, 270000, 470000, 110000, 740000, 750000, 190000, 910000, 170000, 330000, 900000, 640000, 720000, 840000, 320000, 630000, 920000, 230000, 340000, 410000, 610000, 530000, 950000, 350000',
      getString('package.yes'),
      0,
      0,
      getString('package.no'),
      getString('statusCollection.inactive'),
      '',
      '',
      '',
    ],
  ],
  fields: [
    'package_code',
    'insurer_package_code',
    'insurer_id',
    'oic_code',
    'name',
    'start_date',
    'expiration_date',
    'car_insurance_type',
    'price',
    'sum_coverage_min',
    'sum_coverage_max',
    'car_age_min',
    'car_age_max',
    'deductible_amount',
    'car_repair_type',
    'fire_theft_coverage',
    'flood_coverage',
    'engine_size',
    'modified_car_accepted',
    'personal_accident_coverage',
    'personal_accident_coverage_no',
    'medical_expenses_coverage',
    'medical_expenses_coverage_no',
    'bail_bond_coverage',
    'liability_property_coverage',
    'liability_per_person_coverage',
    'liability_per_accident_coverage',
    'car_group',
    'car_submodel_ids',
    'terms_th',
    'terms_en',
    'provinces_covered',
    'has_cctv_discount',
    'min_age',
    'max_age',
    'is_low_cost',
    'package_status',
    'create_at',
    'create_by',
    'file_name',
  ],
};

test('Check packages row', () => {
  expect(JSON.stringify(packageSearch.getPackageRows(packages))).toEqual(
    JSON.stringify(packageRows)
  );
});

describe('Test formatDisplayInsurer', () => {
  it('Should be return empty array if input empty', () => {
    expect(formatDisplayInsurer([])).toEqual([]);
  });
  it('Should be return custom insurer name', () => {
    const input = [
      { name: 'insurers/42', displayName: 'FPG Insurance', order: 3 },
    ];
    expect(formatDisplayInsurer(input)).toEqual([
      { name: 'insurers/42', displayName: 'longInsurers.42', order: 3 },
    ]);
  });
});
