import { IInputProps } from 'shared/interfaces/common/lead/package';

import {
  carAgeCollection,
  createSchema,
  insuranceTypeCollection,
  numberOfPersonCollection,
  OICCollection,
  selectCollection,
} from './packageStaticData';
import { getString } from '../../presentation/theme/localization';
import {
  packageTypes,
  driverAmount,
} from '../../presentation/pages/LeadDetailsPage/CustomQuote/Package/helper';

export const packageFields = {
  // INFO: Package
  name: {
    name: 'name',
    title: 'Package Name*',
  },
  type: {
    name: 'package_type',
  },
  startDate: {
    name: 'start_date',
    title: 'Start Date*',
  },
  expirationDate: {
    name: 'expiration_date',
    title: 'Expirations*',
  },
  insuranceCompanyId: {
    name: 'insurance_company_id',
    title: 'Insurance Company*',
  },
  carInsuranceType: {
    name: 'car_insurance_type',
    title: 'Insurance Type*',
  },
  oicCode: {
    name: 'oic_code',
    title: 'OIC Code*',
  },
  carRepairType: {
    name: 'car_repair_type',
    title: 'Repair*',
  },
  modifiedCarAccepted: {
    name: 'modified_car_accepted',
    title: 'Car Modification Accepted?*',
  },
  hasCctvDiscount: {
    name: 'has_cctv_discount',
    title: 'Is CCTV discount included?*',
  },
  // INFO: Car And Sum Insured
  carAge: {
    name: 'car_age',
    title: 'Car age(year)*',
  },
  sumCoverage: {
    name: 'carAndSumInsured',
    title: 'Sum Insured*',
  },
  sumCoverageMin: {
    name: 'sum_coverage_min',
    title: 'Min',
  },
  sumCoverageMax: {
    name: 'sum_coverage_max',
    title: 'Max',
  },
  deductibleAmount: {
    name: 'deductible_amount',
    title: 'Deductible (THB)*',
  },
  price: {
    name: 'price',
    title: 'Gross premium/price without mandatory (THB)*',
  },
  fireTheftCoverage: {
    name: 'fire_theft_coverage',
    title: 'Theft & fire coverage?*',
  },
  fireTheftCoverageValue: {
    name: 'fire_theft_coverage_value',
    title: 'Value',
  },
  floodCoverage: {
    name: 'flood_coverage',
    title: 'Flood coverage?*',
  },
  floodCoverageValue: {
    name: 'flood_coverage_value',
    title: 'Value',
  },
  carSubmodels: {
    name: 'car_submodels',
    title: 'Car Submodels*',
  },

  // INFO: Coverage
  liabilityPerPersonCoverage: {
    name: 'liability_per_person_coverage',
    title: 'Liability for damage per person (THB)*',
  },
  liabilityPerAccidentCoverage: {
    name: 'liability_per_accident_coverage',
    title: 'Liability for damage per time (THB)*',
  },
  liabilityPropertyCoverage: {
    name: 'liability_property_coverage',
    title: 'Liability for property damage (THB)*',
  },
  personalAccidentCoverage: {
    name: 'personal_accident_coverage',
    title: 'Personal Accident (THB)*',
  },
  personalAccidentCoverageNo: {
    name: 'personal_accident_coverage_no',
    title: 'No. of persons PA*',
  },
  medicalExpensesCoverage: {
    name: 'medical_expenses_coverage',
    title: 'Medical Expenses (THB)*',
  },
  medicalExpensesCoverageNo: {
    name: 'medical_expenses_coverage_no',
    title: 'No. of persons ME*',
  },
  bailBondCoverage: {
    name: 'bail_bond_coverage',
    title: 'Bail Bond (THB)*',
  },
  fixedDriver: {
    name: 'fixedDriver',
  },
  firstDriverDOB: {
    name: 'firstDriverDOB',
  },
  secondDriverDOB: {
    name: 'secondDriverDOB',
  },
};

export const packageSchema = (): IInputProps[] => [
  createSchema(
    packageFields.name.title,
    packageFields.name.name,
    'TextField',
    ''
  ),
  createSchema(
    '',
    packageFields.type.name,
    'Select',
    '',
    packageTypes,
    undefined,
    getString('package.selectPlaceholder')
  ),
  createSchema(
    packageFields.startDate.title,
    packageFields.startDate.name,
    'DateTime',
    ''
  ),
  createSchema(
    packageFields.expirationDate.title,
    packageFields.expirationDate.name,
    'DateTime',
    ''
  ),
  createSchema(
    packageFields.insuranceCompanyId.title,
    packageFields.insuranceCompanyId.name,
    'SelectCustomDropdown',
    ''
  ),
  createSchema(
    packageFields.carInsuranceType.title,
    packageFields.carInsuranceType.name,
    'Select',
    '',
    insuranceTypeCollection()
  ),
  createSchema(
    packageFields.oicCode.title,
    packageFields.oicCode.name,
    'Select',
    '',
    OICCollection()
  ),
  createSchema(
    packageFields.carRepairType.title,
    packageFields.carRepairType.name,
    'Radio',
    ''
  ),
  createSchema(
    packageFields.modifiedCarAccepted.title,
    packageFields.modifiedCarAccepted.name,
    'Radio',
    ''
  ),
  createSchema(
    packageFields.hasCctvDiscount.title,
    packageFields.hasCctvDiscount.name,
    'Radio',
    ''
  ),
];

export const mockPackageSchema: IInputProps[] = [
  createSchema('Package Name*', 'packageName', 'TextField'),
  createSchema('Start Date*', 'packageStartDate', 'DateTime'),
  createSchema('Expirations*', 'packageExpiration', 'DateTime'),
  createSchema(
    'Insurance Company*',
    'packageInsuranceCompany',
    'Select',
    '',
    selectCollection()
  ),
  createSchema(
    'Insurance Type*',
    'packageInsuranceType',
    'Select',
    '',
    insuranceTypeCollection()
  ),
  createSchema('OIC Code*', 'packageOICCode', 'Select', '', OICCollection()),
  createSchema('Repair*', 'packageRepair', 'Radio'),
  createSchema(
    'Car Modification Accepted?*',
    'packageCarModification',
    'Radio',
    ''
  ),
  createSchema('Is CCTV discount included?*', 'packageCCTV', 'Radio', ''),
];

export const carAndSumInsuredSchema: IInputProps[] = [
  createSchema(
    packageFields.carAge.title,
    packageFields.carAge.name,
    'Select',
    '',
    carAgeCollection()
  ),
  createSchema(
    packageFields.sumCoverageMax.title,
    packageFields.sumCoverageMax.name,
    'NumberInput',
    '',
    undefined,
    undefined,
    'Max'
  ),
  createSchema(
    packageFields.deductibleAmount.title,
    packageFields.deductibleAmount.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.price.title,
    packageFields.price.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.fireTheftCoverage.title,
    packageFields.fireTheftCoverage.name,
    'Radio'
  ),
  createSchema(
    packageFields.fireTheftCoverageValue.title,
    packageFields.fireTheftCoverageValue.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.floodCoverage.title,
    packageFields.floodCoverage.name,
    'Radio'
  ),
  createSchema(
    packageFields.floodCoverageValue.title,
    packageFields.floodCoverageValue.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.carSubmodels.title,
    packageFields.carSubmodels.name,
    'TextField',
    '',
    undefined,
    undefined,
    '',
    true
  ),
];

export const coverageSchema = (): IInputProps[] => [
  createSchema(
    packageFields.liabilityPerPersonCoverage.title,
    packageFields.liabilityPerPersonCoverage.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.liabilityPerAccidentCoverage.title,
    packageFields.liabilityPerAccidentCoverage.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.liabilityPropertyCoverage.title,
    packageFields.liabilityPropertyCoverage.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.personalAccidentCoverage.title,
    packageFields.personalAccidentCoverage.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.personalAccidentCoverageNo.title,
    packageFields.personalAccidentCoverageNo.name,
    'Select',
    '',
    numberOfPersonCollection()
  ),
  createSchema(
    packageFields.medicalExpensesCoverage.title,
    packageFields.medicalExpensesCoverage.name,
    'NumberInput'
  ),
  createSchema(
    packageFields.medicalExpensesCoverageNo.title,
    packageFields.medicalExpensesCoverageNo.name,
    'Select',
    '',
    numberOfPersonCollection()
  ),
  createSchema(
    packageFields.bailBondCoverage.title,
    packageFields.bailBondCoverage.name,
    'NumberInput'
  ),
  createSchema(
    '',
    packageFields.fixedDriver.name,
    'Select',
    '',
    driverAmount,
    undefined,
    getString('package.selectPlaceholder')
  ),
  createSchema(
    '',
    packageFields.firstDriverDOB.name,
    'DateTime',
    '',
    undefined,
    undefined,
    getString('package.enterDOB'),
    true
  ),
  createSchema(
    '',
    packageFields.secondDriverDOB.name,
    'DateTime',
    '',
    undefined,
    undefined,
    getString('package.enterDOB'),
    true
  ),
];
