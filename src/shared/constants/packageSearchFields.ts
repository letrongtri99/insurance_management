import { map, pluck } from 'rxjs/operators';
import LeadDetailRepository from 'data/repository/leadDetail';
import { getString } from 'presentation/theme/localization';
import { findLongInsurerName } from 'presentation/redux/reducers/leads/lead-assignment';
import { statusCollection, insuranceTypeCollection } from './packageStaticData';

const leadDetailRepository = new LeadDetailRepository();
export enum PackageSearchType {
  SELECT = 'Select',
  AUTO_COMPLETE = 'Autocomplete',
  SLIDER = 'Slider',
  BUTTON = 'Button',
  SEARCH = 'Search',

  SEARCH_INPUT = 'SearchInput',
}

export const PackageSearchFieldName = {
  STATUS: 'status',
  INSURER: 'insurer',
  PRICE: 'price',
  CAR_BRAND: 'carBrand',
  CAR_MODEL: 'carModel',
  SUB_MODEL: 'subModel',
  CAR_AGE: 'carAge',
  PROVINCE: 'province',
  INSURANCE_TYPE: 'insuranceType',
  SEARCH: 'search',
  SEARCH_INPUT: 'searchInput',
};

export const PackageSearchFieldNameArr = [
  PackageSearchFieldName.STATUS,
  PackageSearchFieldName.INSURER,
  PackageSearchFieldName.PRICE,
  PackageSearchFieldName.CAR_BRAND,
  PackageSearchFieldName.CAR_MODEL,
  PackageSearchFieldName.SUB_MODEL,
  PackageSearchFieldName.CAR_AGE,
  PackageSearchFieldName.PROVINCE,
  PackageSearchFieldName.INSURANCE_TYPE,
  PackageSearchFieldName.SEARCH,
  PackageSearchFieldName.SEARCH_INPUT,
];

export enum PackageSearchFieldIndex {
  INSURER = 0,
  PRICE = 1,
  CAR_BRAND = 2,
  CAR_MODEL = 3,
  SUB_MODEL = 4,
  CAR_AGE = 5,
  PROVINCE = 6,
  INSURANCE_TYPE = 7,
  SEARCH = 8,
  SEARCH_INPUT = 9,
}

const PackageSearchStatusField = {
  name: PackageSearchFieldName.STATUS,
  type: PackageSearchType.SELECT,
  label: getString('package.statusSearchLabel'),
  options: statusCollection(),
  column: {
    xs: 6,
    sm: 6,
    md: 6,
    xl: 3,
  },
};

export const formatDisplayInsurer = (res: any) => {
  return res.map((item: any) => {
    const newItem = { ...item };
    newItem.displayName = findLongInsurerName(
      newItem.name,
      newItem.displayName
    );
    return newItem;
  });
};

const callbackInsurer = (input: string, callback: any) => {
  return callback(input).pipe(pluck('insurers'), map(formatDisplayInsurer));
};

const PackageSearchInsurerField = {
  name: PackageSearchFieldName.INSURER,
  type: PackageSearchType.AUTO_COMPLETE,
  label: getString('package.insurerSearchLabel'),
  options: statusCollection(),
  lookupFn: callbackInsurer.bind(
    null,
    '100',
    leadDetailRepository.getListInsurer
  ),
  labelField: 'displayName',
  valueField: 'name',
  column: {
    xs: 6,
    sm: 6,
    md: 6,
    xl: 3,
  },
};

const PackageSearchInsuranceTypeField = {
  name: PackageSearchFieldName.INSURANCE_TYPE,
  label: getString('package.insuranceTypeSearchLabel'),
  type: PackageSearchType.AUTO_COMPLETE,
  options: insuranceTypeCollection(),
  column: {
    xs: 6,
    sm: 6,
    md: 6,
    xl: 3,
  },
};

const PackageSearchInput = {
  label: getString('text.searchImportFileName'),
  name: PackageSearchFieldName.SEARCH_INPUT,
  type: PackageSearchType.SEARCH_INPUT,
  column: {
    xs: 6,
    sm: 6,
    md: 6,
    xl: 3,
  },
};

const PackageSearchButton = {
  name: 'searchBtn',
  type: PackageSearchType.BUTTON,
  column: {
    xs: 12,
    sm: 12,
    md: 12,
    xl: 3,
  },
};

export const packageSearchSchema = [
  PackageSearchStatusField,
  PackageSearchInsurerField,
  PackageSearchInsuranceTypeField,
  PackageSearchButton,
  PackageSearchInput,
];

export const packageSearchSchemaMobile = [
  PackageSearchStatusField,
  PackageSearchInsurerField,
  PackageSearchInsuranceTypeField,
  PackageSearchInput,
  PackageSearchButton,
];
