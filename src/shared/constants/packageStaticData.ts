import { getString } from 'presentation/theme/localization';
import {
  ICollection,
  IInputProps,
} from 'shared/interfaces/common/lead/package';

export const LIMIT_TIME_SEARCH_PACKAGE = 'LIMIT_TIME';
export const selectCollection = () => [
  { id: '1', value: '1', title: 'Car Insurance' },
  { id: '2', value: '2', title: 'Health Insurance' },
  { id: '3', value: '3', title: 'Life Insurance' },
];

export const statusCollection = () => [
  {
    id: 'ACTIVE',
    title: getString('statusCollection.active'),
    value: 'active',
  },
  {
    id: 'INACTIVE',
    title: getString('statusCollection.inactive'),
    value: 'inactive',
  },
];

export const StatusLeadAll = [
  { id: 1, title: 'New', value: 'LEAD_STATUS_NEW' },
  { id: 2, title: 'Valid', value: 'LEAD_STATUS_VALID' },
  { id: 3, title: 'Contacted', value: 'LEAD_STATUS_CONTACTED' },
  { id: 4, title: 'Interested', value: 'LEAD_STATUS_INTERESTED' },
  { id: 5, title: 'Prospect', value: 'LEAD_STATUS_PROSPECT' },
  { id: 6, title: 'Pending Payment', value: 'LEAD_STATUS_PENDING_PAYMENT' },
  { id: 6, title: 'Purchased', value: 'LEAD_STATUS_PURCHASED' },
  { id: 6, title: 'Cancelled', value: 'LEAD_STATUS_CANCELLED' },
];

export const SearchPackageAll = () => [
  {
    id: 1,
    title: getString('package.importFileName'),
    value: 'PACKAGE_IMPORT_FILE_NAME',
  },
];

export const radioCollection = () => [
  { id: 1, value: 'Yes', title: getString('package.yes') },
  { id: 2, value: 'No', title: getString('package.no') },
];

export const garageDealerCollection = () => [
  { id: '1', value: 'Garage', title: getString('package.garage') },
  { id: '2', value: 'Dealer', title: getString('package.dealer') },
];
export type TInsuranceType = Record<string, string>;
export const insuranceTypeCollection = (): TInsuranceType[] => [
  {
    id: 'Type 1',
    value: 'Type 1',
    title: getString('insuranceTypes.type1'),
    packageValue: 'TYPE_1',
    displayValue: '1',
  },
  {
    id: 'Type 2',
    value: 'Type 2',
    title: getString('insuranceTypes.type2'),
    packageValue: 'TYPE_2',
    displayValue: '2',
  },
  {
    id: 'Type 2+',
    value: 'Type 2+',
    title: getString('insuranceTypes.type2Plus'),
    packageValue: 'TYPE_2_PLUS',
    displayValue: '2+',
  },
  {
    id: 'Type 3',
    value: 'Type 3',
    title: getString('insuranceTypes.type3'),
    packageValue: 'TYPE_3',
    displayValue: '3',
  },
  {
    id: 'Type 3+',
    value: 'Type 3+',
    title: getString('insuranceTypes.type3Plus'),
    packageValue: 'TYPE_3_PLUS',
    displayValue: '3+',
  },
  {
    id: 'Mandatory',
    value: 'Mandatory',
    title: getString('insuranceTypes.mandatory'),
    packageValue: 'MANDATORY',
    displayValue: 'Mandatory',
  },
];

export const OICCollection = () => [
  { id: 110, value: '110', title: '110' },
  { id: 120, value: '120', title: '120' },
  { id: 210, value: '210', title: '210' },
  { id: 220, value: '220', title: '220' },
  { id: 230, value: '230', title: '230' },
  { id: 320, value: '320', title: '320' },
  { id: 730, value: '730', title: '730' },
  { id: 801, value: '801', title: '801' },
];
export const numberOfPersonCollection = (): ICollection[] => {
  return [...Array(16)].map((_, index) => {
    return {
      id: `${index}`,
      value: `${index}`,
      title: `${index}`,
    };
  });
};

export const carAgeCollection = () => {
  return [...Array(31)].map((_, index) => {
    const year = new Date().getFullYear() - index;
    return {
      id: `${index}`,
      value: `${index + 1}`,
      title: `${year}`,
    };
  });
};
export const createSchema = (
  title: string,
  name: string,
  type: string,
  value?: string,
  options?: Array<any>,
  childs?: Array<any>,
  placeholder?: string,
  disable?: boolean,
  column?: number
): IInputProps => {
  return {
    title,
    name,
    type,
    value,
    options,
    childs,
    placeholder,
    disable,
    column,
  };
};
