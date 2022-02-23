import { getString } from 'presentation/theme/localization';
import { getLeadIdFromPath } from 'presentation/redux/epics/leadDetail/scheduleModal/scheduleModal.helper';
import { isInvalidCharacters } from 'shared/helper/utilities';

export enum AddressUsage {
  POLICY = 'policy',
  SHIPPING = 'shipping',
  BILLING = 'billing',
}

export enum AddressType {
  PERSONAL = 'personal',
  COMPANY = 'company',
  OTHER = 'other',
}
export const AddressUsageList = [
  { id: 1, value: AddressUsage.POLICY, label: getString('text.policy') },
  { id: 2, value: AddressUsage.SHIPPING, label: getString('text.shipment') },
  { id: 3, value: AddressUsage.BILLING, label: getString('text.billing') },
];

export interface IFormData {
  addressUsage: string[];
  addressType: string;
  address: string;
  province: any;
  district: any;
  subDistrict: any;
  postCode: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  taxId?: string;
}

export const initialFormData: IFormData = {
  addressUsage: [],
  addressType: AddressType.PERSONAL,
  address: '',
  province: '',
  district: '',
  subDistrict: '',
  postCode: '',
  firstName: '',
  lastName: '',
};
const limitLength = 40;

export const validate = (values: any) => {
  const error: Record<string, string> = {};
  if (isInvalidCharacters(values.firstName)) {
    error.firstName = getString('text.inputFirstNameValid');
  }
  if (values.firstName?.length > limitLength) {
    error.firstName = getString('text.inputMaxLength', { length: limitLength });
  }
  if (isInvalidCharacters(values.lastName)) {
    error.lastName = getString('text.inputLastNameValid');
  }
  if (values.lastName?.length > limitLength) {
    error.lastName = getString('text.inputMaxLength', { length: limitLength });
  }
  return error;
};

export const isValidateName = (value: string) => {
  return !isInvalidCharacters(value) && value && value?.length <= limitLength;
};

export const validateForm = (values: IFormData) => {
  const base =
    values.address &&
    values.addressType &&
    values.addressUsage?.length &&
    values.district &&
    values.postCode &&
    values.province &&
    values.subDistrict;
  if (values.addressType === AddressType.COMPANY) {
    return Boolean(base && values.companyName && values.taxId);
  }
  return Boolean(
    base &&
      isValidateName(values.firstName as string) &&
      isValidateName(values.lastName as string)
  );
};

export const getID = (value: string) => {
  if (value) {
    return +value.split('/')[value.split('/').length - 1];
  }
  return '';
};

export const setInitialName = (
  addressUsage: string[],
  firstName = '',
  lastName = '',
  fromApi = false
) => {
  if (addressUsage.includes(AddressUsage.POLICY)) {
    if (firstName && lastName && fromApi) {
      return {
        firstName: {
          value: firstName,
          disabled: true,
        },
        lastName: {
          value: lastName,
          disabled: true,
        },
      };
    }
    const value = {
      firstName: {
        disabled: false,
        value: '',
      },
      lastName: {
        disabled: false,
        value: '',
      },
    };
    if (firstName) {
      value.firstName = {
        ...value.firstName,
        value: firstName,
      };
    }
    if (lastName) {
      value.lastName = {
        ...value.lastName,
        value: lastName,
      };
    }
    return value;
  }
  return {
    firstName: {
      disabled: false,
      value: firstName,
    },
    lastName: {
      disabled: false,
      value: lastName,
    },
  };
};

export const getSubmitBody = (formVal: any) => {
  const requestPayload: Partial<IFormData & { id: string }> = {
    ...formVal,
    id: getLeadIdFromPath(),
    province: getID(formVal.province?.name || ''),
    district: getID(formVal.district?.name || ''),
    subDistrict: getID(formVal.subDistrict?.name || ''),
  };
  if (requestPayload.addressType === AddressType.COMPANY) {
    delete requestPayload.firstName;
    delete requestPayload.lastName;
  }
  return requestPayload;
};

export const getNameValue = (
  addressUsage: string[],
  apiName: string,
  formikName: string
) => {
  return addressUsage.includes(AddressUsage.POLICY)
    ? apiName || formikName
    : formikName;
};

export const isNameFromApi = (
  firstName: string | undefined,
  lastName: string | undefined
) => {
  return Boolean(firstName && lastName);
};

export const getNameFromApi = (leadData: any) => {
  const firstName = leadData?.data?.policyHolderFirstName;
  const lastName = leadData?.data?.policyHolderLastName;
  return {
    policyFirstName: firstName || '',
    policyLastName: lastName || '',
  };
};
