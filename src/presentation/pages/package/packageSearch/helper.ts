import {
  PackageSearchFieldIndex,
  PackageSearchFieldName,
  PackageSearchFieldNameArr,
} from 'shared/constants/packageSearchFields';
import * as yup from 'yup';
import moment from 'moment';
import {
  IPackageFormValue,
  SEARCH_TYPE,
} from '../../../../shared/interfaces/common/package';
import { getString } from '../../../theme/localization';
import { insuranceTypeCollection } from '../../../../shared/constants/packageStaticData';
import { downloadBlobAsFile } from '../../../../shared/helper/csvImportHelper';

export const initialPackageSearchData: IPackageFormValue = {
  status: '',
  insurer: [],
  insuranceType: [],
  searchInput: '',
};
enum PACKAGE_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export const otherFields = (name: string) => {
  return PackageSearchFieldNameArr.filter((item: string) => item !== name);
};

const isHasAtLeastOneField = (fieldValue: any, index: number) => {
  return (
    ([
      PackageSearchFieldIndex.INSURER,
      PackageSearchFieldIndex.INSURANCE_TYPE,
    ].some((fieldIndex: number) => fieldIndex === index) &&
      fieldValue?.length > 0) ||
    (index === PackageSearchFieldIndex.SEARCH_INPUT && fieldValue)
  );
};

export const packageSearchValidationSchema = yup.object().shape({
  status: yup.string().when(otherFields(PackageSearchFieldName.STATUS), {
    is: (...rest) => {
      return [...rest].some(isHasAtLeastOneField);
    },
    then: yup.string().notRequired(),
    otherwise: yup.string().required('Required'),
  }),
});
export class PackageSearch {
  queryForm = (formValues: IPackageFormValue) => {
    const customValue = {
      ...formValues,
      searchInput: formValues.searchInput,
      insuranceType: formValues.insuranceType.map(
        (item) => `"${item.packageValue}"` || ''
      ),
      insurer: formValues.insurer.map((item) => `"${item.value}"` || ''),
    };
    const queryField = [
      {
        field: 'status',
        type: 'match',
        keyInFormValue: 'status',
      },
      {
        field: 'insurer',
        type: 'in',
        keyInFormValue: 'insurer',
      },
      {
        field: 'carInsuranceType',
        type: 'in',
        keyInFormValue: 'insuranceType',
      },
      {
        field: 'filename',
        type: 'contain',
        keyInFormValue: 'searchInput',
      },
    ];
    const flatFormValue = Object.entries(customValue).map(([key, value]) => {
      const findType = queryField.find((item) => item.keyInFormValue === key);
      if (findType?.type === SEARCH_TYPE.CONTAIN && value) {
        return `${findType?.field}:"${value}"`;
      }
      if (findType?.type === SEARCH_TYPE.IN && value.length) {
        return `${findType?.field} in (${value})`;
      }
      if (findType?.type === SEARCH_TYPE.MATCH && value) {
        return `${findType?.field}="${value}"`;
      }
      return '';
    });

    return flatFormValue.filter((item) => !!item).join(' ');
  };

  convertBoolean = (value: boolean) => {
    return value ? getString('package.yes') : getString('package.no');
  };

  getArrayIds = (arrayValues: string[]) => {
    return arrayValues
      .map((item) => {
        const splitItem = item.split('/');
        if (splitItem.length) {
          return splitItem[splitItem.length - 1];
        }
        return '';
      })
      .join(', ');
  };

  convertPrice = (price: number) => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  convertDate = (date: string) => {
    return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
  };

  convertInsuranceType = (type: string) => {
    const findType = insuranceTypeCollection().find(
      (item) => item.packageValue === type
    );
    if (findType) {
      return findType.displayValue;
    }
    return '';
  };

  convertOicCode = (code: string) => {
    const splitCode = code.split('_');
    return splitCode?.length ? splitCode[1] : '';
  };

  convertInsurerId = (insurerId: string) => {
    const splitCode = insurerId.split('/');
    return splitCode?.length ? splitCode[1] : '';
  };

  getPackageRows = (packages: any[]) => {
    const columns = [
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
    ];
    const csvData = packages.map((item) => {
      return [
        item.code,
        item.insurerPackageCode,
        this.convertInsurerId(item.insurer),
        this.convertOicCode(item.oicCode),
        item.displayName,
        this.convertDate(item.startTime),
        this.convertDate(item.expireTime),
        this.convertInsuranceType(item.carInsuranceType),
        this.convertPrice(item.price),
        this.convertPrice(item.sumCoverageMin),
        this.convertPrice(item.sumCoverageMax),
        item.carAgeMin,
        item.carAgeMax,
        item.deductibleAmount,
        item.carRepairType,
        this.convertPrice(item.fireTheftCoverage),
        this.convertPrice(item.floodCoverage),
        '', // EngineSize,
        this.convertBoolean(item.modifiedCarAccepted),
        this.convertPrice(item.personalAccidentCoverage),
        item.personalAccidentCoverageNo,
        this.convertPrice(item.medicalExpensesCoverage),
        item.medicalExpensesCoverageNo,
        this.convertPrice(item.bailBondCoverage),
        this.convertPrice(item.liabilityPropertyCoverage),
        this.convertPrice(item.liabilityPerPersonCoverage),
        this.convertPrice(item.liabilityPerAccidentCoverage),
        item.carGroup,
        this.getArrayIds(item.carSubmodels),
        item.termsTh,
        item.termsEn,
        this.getArrayIds(item.provinces),
        this.convertBoolean(item.hasCctvDiscount),
        item.minAge,
        item.maxAge,
        this.convertBoolean(item.isLowCost),
        item.status === PACKAGE_STATUS.ACTIVE
          ? getString('statusCollection.active')
          : getString('statusCollection.inactive'),
        this.convertDate(item.createTime),
        '', // create by,
        item.filename,
      ];
    });
    return {
      data: csvData,
      fields: columns,
    };
  };

  downloadPackages = (packages: any[]) => {
    downloadBlobAsFile(
      this.getPackageRows(packages) as any,
      `${getString('package.packages')}.csv`
    );
  };
}
