import { FormikValues } from 'formik';
import moment from 'moment';
import { packageFields } from 'shared/constants/packageFormFields';
import { selectCollection } from 'shared/constants/packageStaticData';
import {
  ICreatePackage,
  IInputProps,
  ISelectOptions,
} from 'shared/interfaces/common/lead/package';
import * as yup from 'yup';
import { of } from 'rxjs';
import { customForkJoin } from 'shared/helper/operator';
import LeadDetail from 'data/repository/leadDetail/cloud';
import { getString } from '../../../theme/localization';
import {
  IInsurerFromApi,
  IInsurerItem,
  sortPreferedInsurers,
} from '../leadDetailsPage.helper';

const YESTERDAY_DATE = new Date(new Date().setDate(new Date().getDate() - 1));
export const TRAILING_ZEROES = '0000';
export const LIST_INSURERS_PAGE_SIZE = '100';
export const NUMBER_INPUT_STEP = 10000;
export const YUP_REQUIRED_MSG = () => getString('package.requiredFields');
export const YUP_DATETYPE_ERROR = () => getString('package.invalidDateFormat');
export const YUP_DATE_STARTDATE_MIN_MSG = () => getString('package.minDate');
export const YUP_DATE_MIN_MSG = () =>
  getString('package.expirationDateAndStartDate');

function isValidStep(this: any, message: string) {
  // eslint-disable-next-line func-names
  return this.test(message, function (this: any, value: any) {
    const { path, createError } = this;
    if (value % NUMBER_INPUT_STEP !== 0) {
      return createError({
        path,
        message: message ?? getString('package.stepValidation'),
      });
    }

    return true;
  });
}
yup.addMethod(yup.number, 'isValidStep', isValidStep);

const formatDate = (selectedDate: Date) => {
  const convertedDate = moment(selectedDate).format('yyyy-MM-DD');
  return convertedDate;
};
const floodAndTheftCoverageDefaultValue = (
  carInsuranceType: string,
  value: number
) => {
  // Many Cases in Future
  switch (carInsuranceType) {
    case 'Type 1':
      return value;
    default:
      return 0;
  }
};

export const prepareCreateCustomQuoteData = (
  formData: FormikValues,
  carSubModel: number
): ICreatePackage => {
  const formValue = JSON.parse(JSON.stringify(formData));
  // INFO: Add Trailing Zeroes to THB Number Inputs
  formValue[packageFields.insuranceCompanyId.name] = Number(
    formValue[packageFields.insuranceCompanyId.name]
  );
  formValue[packageFields.startDate.name] = formatDate(
    formValue[packageFields.startDate.name]
  );
  formValue[packageFields.expirationDate.name] = formatDate(
    formValue[packageFields.expirationDate.name]
  );
  // INFO: Car
  // INFO: Transform CarAge Data
  formValue[`${packageFields.carAge.name}_min`] = Number(
    formValue[packageFields.carAge.name]
  );
  formValue[`${packageFields.carAge.name}_max`] = Number(
    formValue[packageFields.carAge.name]
  );
  formValue[packageFields.sumCoverageMin.name] = Number(
    formValue[packageFields.sumCoverageMax.name]
  );
  formValue[packageFields.sumCoverageMax.name] = Number(
    formValue[packageFields.sumCoverageMax.name]
  );
  formValue[packageFields.deductibleAmount.name] = Number(
    formValue[packageFields.deductibleAmount.name]
  );
  formValue[packageFields.price.name] = Number(
    formValue[packageFields.price.name]
  );
  // INFO: Coverage
  formValue[packageFields.liabilityPerAccidentCoverage.name] = Number(
    formValue[packageFields.liabilityPerAccidentCoverage.name]
  );
  formValue[packageFields.liabilityPerPersonCoverage.name] = Number(
    formValue[packageFields.liabilityPerPersonCoverage.name]
  );
  formValue[packageFields.liabilityPropertyCoverage.name] = Number(
    formValue[packageFields.liabilityPropertyCoverage.name]
  );
  formValue[packageFields.personalAccidentCoverage.name] = Number(
    formValue[packageFields.personalAccidentCoverage.name]
  );
  formValue[packageFields.personalAccidentCoverageNo.name] = Number(
    formValue[packageFields.personalAccidentCoverageNo.name]
  );
  formValue[packageFields.medicalExpensesCoverage.name] = Number(
    formValue[packageFields.medicalExpensesCoverage.name]
  );
  formValue[packageFields.medicalExpensesCoverageNo.name] = Number(
    formValue[packageFields.medicalExpensesCoverageNo.name]
  );
  formValue[packageFields.bailBondCoverage.name] = Number(
    formValue[packageFields.bailBondCoverage.name]
  );

  formValue[packageFields.modifiedCarAccepted.name] =
    formValue[packageFields.modifiedCarAccepted.name] === 'Yes';
  formValue[packageFields.hasCctvDiscount.name] =
    formValue[packageFields.hasCctvDiscount.name] === 'Yes';
  formValue[packageFields.fireTheftCoverage.name] =
    formValue[packageFields.fireTheftCoverage.name] === 'Yes'
      ? Number(formValue[packageFields.fireTheftCoverageValue.name])
      : floodAndTheftCoverageDefaultValue(
          formValue[packageFields.carInsuranceType.name],
          Number(formValue[packageFields.fireTheftCoverageValue.name])
        ); // Need to ask
  formValue[packageFields.floodCoverage.name] =
    formValue[packageFields.floodCoverage.name] === 'Yes'
      ? Number(formValue[packageFields.floodCoverageValue.name])
      : floodAndTheftCoverageDefaultValue(
          formValue[packageFields.carInsuranceType.name],
          Number(formValue[packageFields.floodCoverageValue.name])
        ); // Need to ask
  // formValue.provinces = [leadData.registeredProvince];
  formValue.provinces = [];
  formValue.source = 'manual'; // Default value
  formValue.car_submodels = [carSubModel];
  // INFO: Default Hidden Field, ask Banyar to confirm
  formValue.active = true;
  formValue.reuse_manual_package = false;
  formValue.is_linkout = false;
  formValue.is_fixed_premium = true;

  // INFO: Delete Some of Form Value
  delete formValue[packageFields.floodCoverageValue.name];
  delete formValue[packageFields.fireTheftCoverageValue.name];
  delete formValue[packageFields.carAge.name];
  return formValue;
};

export const validationSchema = yup.object().shape({
  // INFO:Package Validation
  [packageFields.name.name]: yup.string().required(YUP_REQUIRED_MSG),
  [packageFields.type.name]: yup.string().required(YUP_REQUIRED_MSG),
  [packageFields.startDate.name]: yup
    .date()
    .required(YUP_REQUIRED_MSG)
    .nullable()
    .typeError(YUP_DATETYPE_ERROR)
    .min(YESTERDAY_DATE, YUP_DATE_STARTDATE_MIN_MSG),
  [packageFields.expirationDate.name]: yup
    .date()
    .when(packageFields.startDate.name, (value: any) => {
      if (value && !Number.isNaN(value.getTime())) {
        return yup
          .date()
          .required(YUP_REQUIRED_MSG)
          .nullable()
          .typeError(YUP_DATETYPE_ERROR)
          .min(value, YUP_DATE_MIN_MSG);
      }
      return yup
        .date()
        .required(YUP_REQUIRED_MSG)
        .nullable()
        .typeError(YUP_DATETYPE_ERROR);
    }),
  [packageFields.insuranceCompanyId.name]: yup
    .string()
    .required(YUP_REQUIRED_MSG),
  [packageFields.carInsuranceType.name]: yup
    .string()
    .required(YUP_REQUIRED_MSG),
  [packageFields.oicCode.name]: yup.string().required(YUP_REQUIRED_MSG),
  // INFO: Car And Sumred Validation
  [packageFields.carAge.name]: yup.number().required(YUP_REQUIRED_MSG),
  [packageFields.sumCoverageMax.name]: (
    yup.number().required(YUP_REQUIRED_MSG) as any
  ).isValidStep(),
  [packageFields.deductibleAmount.name]: yup
    .number()
    .required(YUP_REQUIRED_MSG),
  [packageFields.fireTheftCoverageValue.name]: (yup.number() as any).when(
    packageFields.fireTheftCoverage.name,
    (value: any) => {
      if (value === 'Yes') {
        return (yup.number() as any).isValidStep();
      }
      return yup.number();
    }
  ),
  [packageFields.floodCoverageValue.name]: (yup.number() as any).when(
    packageFields.floodCoverage.name,
    (value: any) => {
      if (value === 'Yes') {
        return (yup.number() as any).isValidStep();
      }
      return yup.number();
    }
  ),

  [packageFields.price.name]: yup.number().required(YUP_REQUIRED_MSG),

  // INFO: Car And Sumred Schema
  [packageFields.liabilityPerPersonCoverage.name]: (
    yup.number().required(YUP_REQUIRED_MSG) as any
  ).isValidStep(),
  [packageFields.liabilityPerAccidentCoverage.name]: (
    yup.number().required(YUP_REQUIRED_MSG) as any
  ).isValidStep(),
  [packageFields.liabilityPropertyCoverage.name]: (
    yup.number().required(YUP_REQUIRED_MSG) as any
  ).isValidStep(),
  [packageFields.personalAccidentCoverage.name]: (
    yup.number().required(YUP_REQUIRED_MSG) as any
  ).isValidStep(),
  [packageFields.personalAccidentCoverageNo.name]: yup
    .string()
    .required(YUP_REQUIRED_MSG),
  [packageFields.medicalExpensesCoverage.name]: (
    yup.number().required(YUP_REQUIRED_MSG) as any
  ).isValidStep(),
  [packageFields.medicalExpensesCoverageNo.name]: yup
    .string()
    .required(YUP_REQUIRED_MSG),
  [packageFields.bailBondCoverage.name]: yup
    .number()
    .required(YUP_REQUIRED_MSG),
  [packageFields.fixedDriver.name]: yup.number(),
  [packageFields.firstDriverDOB.name]: yup.string(),
  [packageFields.secondDriverDOB.name]: yup.string(),
});

export const isMaxAge = (date: string) => {
  const maxYear = 100;
  const years = moment().diff(date, 'years');
  return years > maxYear;
};

export const isMinAge = (date: string) => {
  const minYear = 18;
  const years = moment().diff(date, 'years');
  return years < minYear;
};

export const validate = (values: any) => {
  const error: Record<string, string> = {};
  if (values.firstDriverDOB && isMaxAge(values.firstDriverDOB)) {
    error.firstDriverDOB = getString('package.policyDOBMaxThan100');
  }
  if (values.firstDriverDOB && isMinAge(values.firstDriverDOB)) {
    error.firstDriverDOB = getString('package.policyDOBLessThan18');
  }
  if (values.secondDriverDOB && isMaxAge(values.secondDriverDOB)) {
    error.secondDriverDOB = getString('package.policyDOBMaxThan100');
  }
  if (values.secondDriverDOB && isMinAge(values.secondDriverDOB)) {
    error.secondDriverDOB = getString('package.policyDOBLessThan18');
  }
  return error;
};

export const addSelectInsurersCompanyOptions = (
  data: IInputProps[],
  objName: string,
  newOptions: ISelectOptions[]
) => {
  return data.map((item) => {
    const temp = { ...item };
    if (temp.name === objName) {
      temp.options = newOptions;
    }
    return temp;
  });
};
export const cookInsuranceCompanyCollection = (data: IInsurerItem[]) => {
  if (data?.length) {
    const customDataCollection = data.map((row: IInsurerItem) => {
      return {
        id: row.id,
        title: row.displayName,
        value: row.name,
      };
    });
    return customDataCollection;
  }
  return selectCollection();
};
export const customSelectInsurersCompany = (data: IInsurerFromApi) => {
  const selectInsurersCompanyData = data?.insurers?.length
    ? JSON.parse(JSON.stringify(data.insurers))
    : [];
  return cookInsuranceCompanyCollection(
    sortPreferedInsurers(selectInsurersCompanyData)
  );
};

export const getCarSubModel = (data: any) => {
  let carSubModel;
  if (data.name) {
    carSubModel = data.name.substring(
      data.name.indexOf('/submodels'),
      data.name.length
    );
    carSubModel = carSubModel.substring(
      carSubModel.lastIndexOf('/') + 1,
      carSubModel.length
    );
    carSubModel = Number(carSubModel);
    return carSubModel;
  }
  return 0;
};

export const getTitle = (schema: any[]) => {
  return schema.map((item) => {
    const temp = { ...item };
    temp.title = getString(`package.${item.name}`);
    return temp;
  });
};

export const initialCustomQuoteFormData = {
  // INFO: Package
  name: '',
  package_type: '',
  start_date: new Date(),
  expiration_date: null,
  insurance_company_id: '',
  car_insurance_type: '',
  oic_code: 110,
  car_repair_type: 'Dealer',
  modified_car_accepted: 'Yes',
  has_cctv_discount: 'Yes',

  // INFO: Car And Sum Insured
  car_age: '',
  sum_coverage_min: '',
  sum_coverage_max: '',
  deductible_amount: '',
  price: '',
  fire_theft_coverage: 'No',
  flood_coverage: 'No',
  car_submodels: '',

  // INFO: Coverage
  liability_per_person_coverage: '',
  liability_per_accident_coverage: '',
  liability_property_coverage: '',
  personal_accident_coverage: '',
  personal_accident_coverage_no: '',
  medical_expenses_coverage: '',
  medical_expenses_coverage_no: '',
  bail_bond_coverage: '',
  fixedDriver: '',
  firstDriverDOB: '',
  secondDriverDOB: '',
};

// Use for sample validate
export const mockCustomQuoteFormData = {
  // Info
  name: 'Duy nt 1',
  start_date: '2022-01-02',
  expiration_date: '2022-01-03',
  insurance_company_id: 1,
  car_insurance_type: 'Type 1',
  oic_code: 110,
  car_repair_type: 'Dealer',
  modified_car_accepted: 'Yes',
  has_cctv_discount: 'Yes',
  // Car
  car_age: 3,
  sum_coverage_min: 1,
  sum_coverage_max: 1,
  deductible_amount: 100,
  price: 1,
  fire_theft_coverage: 'No',
  flood_coverage: 'No',
  car_submodels: '',
  // Coverage
  liability_per_person_coverage: 20000,
  liability_per_accident_coverage: 30000,
  liability_property_coverage: 10000,
  personal_accident_coverage: 10000,
  personal_accident_coverage_no: 1,
  medical_expenses_coverage: 10000,
  medical_expenses_coverage_no: 10000,
  bail_bond_coverage: 10000,
};
// INFO: Use for validation
// setTimeout(() => {
//   validationSchema.validate(mockData).catch(function (err) {
//     console.log('err', err)
//   });
// }, 5000);
export const getCarAgeAndSubModel = (res: any) => {
  const subModel = res.name.substring(0, res.name.indexOf('/years'));
  return customForkJoin(LeadDetail.getCarSubModel(subModel), of(res));
};
