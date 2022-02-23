import { ADD_LEAD_SCHEMA_ID } from 'shared/constants';
import { formatE164 } from 'shared/helper/utilities';
import { ProductTypeFilter } from '../../../config/TypeFilter';

export interface ISelect {
  id?: number;
  title?: string;
  value?: string;
}

export interface IFormValue {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  product: string;
  source: ISelect;
  reference: string;
}
export const PAGE_SIZE_GET_SOURCE = 1000;

export const firstProduct = ProductTypeFilter[0].value;
export const addLeadInitialValue = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  product: firstProduct,
  reference: '',
  source: {},
};

export const inputNumberOnly = (event: KeyboardEvent) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

export const inputAlphaNumericOnly = (event: KeyboardEvent) => {
  if (!/^[a-zA-Z0-9 ]*$/.test(event.key)) {
    event.preventDefault();
  }
};

export enum LEAD_TYPE {
  DEFAULT = 'LEAD_TYPE_UNSPECIFIED',
  NEW = 'LEAD_TYPE_NEW',
  RETAINER = 'LEAD_TYPE_RETAINER',
  RENEWAL = 'LEAD_TYPE_RENEWAL',
}

export const customFormValue = (formValue: IFormValue) => {
  // INFO: after that, need to get schema id from api
  const phoneDefaultStatus = 'unverified';
  return {
    schema: ADD_LEAD_SCHEMA_ID,
    data: {
      customerFirstName: formValue.firstName,
      customerLastName: formValue.lastName,
      customerPhoneNumber: [
        {
          phone: formatE164(formValue.phone),
          status: phoneDefaultStatus,
        },
      ],
      customerEmail: formValue.email ? [formValue.email] : [],
      customerPolicyAddress: [],
      customerShippingAddress: [],
      customerBillingAddress: [],
    },
    type: LEAD_TYPE.NEW,
    reference: formValue.reference,
    source: formValue.source.value,
  };
};
