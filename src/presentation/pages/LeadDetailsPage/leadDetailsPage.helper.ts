import { IInsurer, ISelection } from 'presentation/models/lead/insurer';
import { countingAgeToPresent, mappingLeadType } from 'shared/helper/utilities';
import { UserRoles } from 'config/constant';
import { customForkJoin } from 'shared/helper/operator';
import LeadDetail from 'data/repository/leadDetail/cloud';
import { of, Subject } from 'rxjs';
import LocalStorage, { LOCALSTORAGE_KEY } from 'shared/helper/LocalStorage';
import { takeUntil } from 'rxjs/operators';
import { getString } from 'presentation/theme/localization';
import { ICustomerData } from './CustomerSection/helper';

const localStorageService = new LocalStorage();

export const LIST_INSURERS_PAGE_SIZE = '100';
const FIXED_LIST = [7, 27, 28, 35, 23, 19, 5, 33, 11];

export const fakeInsurerObject = {
  currentInsurer: 'Bangkok Insurance',

  preferredInsurer: 1,

  preferredType: [
    {
      title: 'Type 1',
      value: 'type_1',
    },
  ],

  preferredSumInsured: 0,

  mandatory: false,

  expiryDate: '2025-11-16',

  startDate: '2020-11-16',

  youngestDriverDob: '1997-12-16',
};

export const fakeInsurers = [
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

export const fakeTypes = [
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

export default interface ICarInfo {
  year: number;
  brand: string;
  model: string;
  engineSize: number;
  transmission: string;
  dashCam: boolean;
  purpose: string;
  province: string;
  modification: boolean;
  licensePlate: string;
  noOfDoor: string;
  cabType: string;
}

export const formatCarInfo = (customerInfo: any, carInfoGeneral: any) => {
  const carInfo: ICarInfo = {
    year: carInfoGeneral.year || 0,
    brand: carInfoGeneral.brand || '',
    model: carInfoGeneral.model || '',
    engineSize: carInfoGeneral.engineSize || 0,
    transmission: carInfoGeneral.transmissionType || '',
    noOfDoor: carInfoGeneral?.noOfDoor ?? '',
    cabType: carInfoGeneral?.cabType
      ? carInfoGeneral.cabType.replace('_', ' ')
      : '',
    dashCam: customerInfo?.data?.carDashCam || false,
    purpose: customerInfo?.data?.carUsageType || '',
    province: carInfoGeneral.carProvince || '',
    modification: customerInfo?.data?.carModified || false,
    licensePlate: customerInfo?.data?.carLicensePlate,
  };
  return carInfo;
};

const formatPreferredType = (types: string[]) => {
  let newTypeArr;
  if (types) {
    newTypeArr = types.map((type) => {
      return fakeTypes.find((fakeType) => fakeType.value === type);
    });
  }
  return newTypeArr as ISelection[];
};

export interface IInsurerItem {
  name: string;
  displayName: string;
  order: number;
  id: number;
}

export interface IInsurerFromApi {
  insurers: IInsurerItem[];
  nextPageToken: string;
  responseTimes: number;
}

const getInsurerFromList = (insurerId: number, listInsurer: IInsurerItem[]) => {
  let insurerName;
  const newInsurerId = `insurers/${insurerId}`;

  listInsurer.forEach((insurer) => {
    if (insurer.name === newInsurerId) {
      insurerName = insurer.displayName;
    }
  });

  return insurerName || '';
};

export const convertMandatory = (mandatory: string) => {
  if (mandatory === 'mandatory' || mandatory === 'both') return 'Yes';
  if (mandatory === 'voluntary') return 'No';
  return '';
};

export const formatInsurerInfo = (
  customerInfo: any,
  listInsurer: IInsurerFromApi
) => {
  let insurerInfo;
  if (customerInfo) {
    insurerInfo = {
      currentInsurer: getInsurerFromList(
        customerInfo?.data?.currentInsurer,
        listInsurer.insurers
      ),
      preferredInsurer: customerInfo?.data?.preferredInsurer,
      preferredType: formatPreferredType(
        customerInfo?.data?.voluntaryInsuranceType
      ),
      preferredSumInsured: customerInfo?.data?.preferredSumInsured || 0,
      mandatory: convertMandatory(customerInfo?.data?.insuranceKind) || '',
      expiryDate: customerInfo?.data?.policyExpiryDate,
      startDate: customerInfo?.data?.policyStartDate,
      youngestDriverDob: customerInfo?.data?.youngestDriverDOB || '',
      coupon: customerInfo?.data?.checkout?.voucher || '',
      status: customerInfo?.status || '',
      paymentSchedule: customerInfo?.data?.checkout?.installments || 0,
    };
  }
  return insurerInfo as IInsurer;
};

export const getProvinceNameByLanguage = (response: IProvince) => {
  let result = '';
  if (response) {
    result =
      localStorageService.getItemByKey(LOCALSTORAGE_KEY.LOCALE) === 'en'
        ? response.nameEn
        : response.nameTh;
  }
  return result;
};

export const formatCustomerInfo = (
  customerInfo: any,
  customerCityName: IProvince[]
) => {
  const [province, city] = customerCityName;

  let customerInfoFormated;
  if (customerInfo) {
    customerInfoFormated = {
      lead: {
        customerFirstName: customerInfo?.data?.customerFirstName || '',
        customerLastName: customerInfo?.data?.customerLastName || '',
        status: customerInfo?.status || '',
        gender: customerInfo?.data?.customerGender || '',
        customerDob: customerInfo?.data?.customerDOB || '',
        age: countingAgeToPresent(customerInfo?.data?.customerDOB) || '',
        customerProvince: getProvinceNameByLanguage(province) || '',
        customerCity: getProvinceNameByLanguage(city) || '',
        customerReference: '',
        leadType: mappingLeadType(customerInfo?.type) || '',
        leadReference: customerInfo?.humanId || '',
        leadParent: '',
        name: customerInfo?.name || '',
        isRejected: customerInfo?.isRejected || false,
        reference:
          customerInfo?.reference && customerInfo.reference !== ''
            ? customerInfo.reference
            : null,
        // INFO: just for mock date
        agentName: 'Siriwan',
      },
      customer: {
        firstName: customerInfo?.data?.customerFirstName || '',
        lastName: customerInfo?.data?.customerLastName || '',
        gender: customerInfo?.data?.customerGender || '',
        latestLead: '02/08/2020(2560) (5:13:39PM)',
        latestOrder: '02/08/2020(2560) (5:13:39PM)',
      },
      policyHolder: {
        title: 'Mr',
        firstName: customerInfo?.data?.policyHolderFirstName || 'Siriwan',
        lastName: customerInfo?.data?.policyHolderLastName || 'Siriwan',
        DOB: '12/12/1996',
        age: '',
        province: 'krabi',
        city: 'Ao luk',
      },
      leadInfo: {
        agentName: 'Siriwan',
        id: customerInfo?.humanId || '',
        type: getString(mappingLeadType(customerInfo?.type)),
      },
    };
  }

  return customerInfoFormated as any;
};

export const initialCarData = {
  year: '',
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
  licensePlate: '',
  provinceOICCode: '',
};

export const initialInsurerData = {
  currentInsurer: '',
  preferredInsurer: 0,
  preferredType: [],
  preferredSumInsured: 0,
  mandatory: '',
  expiryDate: '',
  startDate: '',
  youngestDriverDob: '',
  coupon: '',
  status: '',
};

export const initialCustomerData = {
  lead: {
    customerFirstName: '',
    customerLastName: '',
    status: '',
    gender: '',
    customerDob: '',
    age: '',
    customerProvince: '',
    customerCity: '',
    customerReference: '',
    leadType: '',
    leadReference: '',
    leadParent: '',
    name: '',
    isRejected: false,
  },
  customerHistory: {
    numOrders: 0,
    numLeads: 0,
    previousLeadDate: '',
    previousVisitDate: '',
  },
};

export enum UpdateLeadDetailsType {
  Installment = 'Installment',
  PreferredInsurer = 'preferredInsurer',
  PreferredSumInsured = 'preferredSumInsured',
  VoluntaryInsuranceType = 'voluntaryInsuranceType',
}

export interface IVoluntaryInsuranceType {
  title: string;
  value: string;
}

export const getValueVoluntaryInsuranceType = (
  value: IVoluntaryInsuranceType[]
) => {
  return value.map((type) => type.value);
};

export const canViewLead = (user: any, lead: any): boolean => {
  if (!user || !lead) return false;
  if (
    user.role === UserRoles.ADMIN_ROLE ||
    user.role === UserRoles.MANAGER_ROLE ||
    user.role === UserRoles.INBOUND_ROLE ||
    user.role === UserRoles.SUPERVISOR_ROLE
  ) {
    return true;
  }
  if (user.role === UserRoles.SALE_ROLE) {
    return lead.assignedTo === user.name;
  }
  return false;
};

export interface ICheckoutPackage {
  package: string;
}

export interface IProvince {
  name: string;
  nameEn: string;
  nameTh: string;
}

export const getCarDescription = (res: any) => {
  return {
    subModel: res.name.substring(0, res.name.indexOf('/years')),
    model: res.name.substring(0, res.name.indexOf('/submodels')),
    brand: res.name.substring(0, res.name.indexOf('/models')),
  };
};

export const clearSub$ = new Subject();
export const leadDetailCarForkJoin = (res: any, registeredProvince: string) => {
  const { brand, model, subModel } = getCarDescription(res);
  return customForkJoin(
    LeadDetail.getCarSubModel(subModel),
    LeadDetail.getCarModel(model),
    LeadDetail.getCarBrand(brand),
    LeadDetail.getProvinceById(registeredProvince),
    of(res)
  ).pipe(takeUntil(clearSub$));
};

export const customCarGeneral = ([
  carSubModel,
  carModel,
  carBrand,
  carProvince,
  carYear,
]: any[]) => {
  return {
    year: carYear.year,
    brand: carBrand.displayName,
    model: carModel.displayName,
    engineSize: carSubModel.engineDescription,
    transmissionType: carSubModel.transmissionType,
    sumInsuredMax: carYear.sumInsuredMax,
    carProvince: getProvinceNameByLanguage(carProvince),
    carProvinceOIC: carProvince,
    noOfDoor: carSubModel.doors,
    cabType: carSubModel.cabType,
  };
};
export const getCityProvinceName = (province: string, city: string) => {
  return {
    province: province || '',
    districts: city || '',
  };
};

export const leadDetailCityProvinceForkJoin = (
  provinceNumber: string,
  cityNumber: string
) => {
  const districtsPayload = getCityProvinceName(provinceNumber, cityNumber);
  return customForkJoin(
    LeadDetail.getProvinceById(provinceNumber),
    LeadDetail.getDistrictById(districtsPayload)
  ).pipe(takeUntil(clearSub$));
};

export const camelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s(.)/g, (charAfterSpace) => {
      return charAfterSpace.toUpperCase();
    })
    .replace(/\s/g, '');
};

export const getFieldTitle = (title: string) => {
  const titleKey = title ? camelCase(title) : '';

  return titleKey ? getString(`leadDetailFields.${titleKey}`) : '';
};

export const sortPreferedInsurers = (insurers: IInsurerItem[]) => {
  const fixed: Array<IInsurerItem> = [];
  const rest: Array<IInsurerItem> = [];
  insurers.map((item: IInsurerItem) => {
    if (FIXED_LIST.includes(item?.id)) {
      fixed[FIXED_LIST.indexOf(item?.id)] = item;
      return fixed;
    }
    return rest.push(item);
  });
  return fixed.concat(
    rest.sort((a, b) => a.displayName.localeCompare(b.displayName))
  );
};
