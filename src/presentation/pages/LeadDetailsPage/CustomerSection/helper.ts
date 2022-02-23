import { v4 } from 'uuid';
import moment from 'moment';
import { isInvalidCharacters } from 'shared/helper/utilities';
import { getString } from 'presentation/theme/localization';
import { StatusLeadAll } from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export interface ILeadData {
  customerFirstName: string;
  customerLastName: string;
  status: string;
  gender: string;
  customerDob: string;
  age: string;
  customerProvince: string;
  customerCity: string;
  customerReference: string;
  leadType: string;
  leadReference: string;
  leadParent: string;
  name: string;
  isRejected: boolean;
  reference?: string;
}

export interface ICustomerHistory {
  numOrders: number;
  numLeads: number;
  previousLeadDate: string;
  previousVisitDate: string;
}

export interface ICustomerData {
  lead: ILeadData;
  customer?: any;
  policyHolder?: any;
  leadInfo?: any;
}

export interface ICustomerSectionProps {
  data: ICustomerData;
}

export const INITIAL_STATUS_VALUE = null;
export const dateOfBirth = new Date('1989-02-02T17:00:00.000Z');

export enum EDIT_TYPE {
  INPUT = 'input',
  SELECT = 'select',
  DATE = 'date',
  DATE_PICKER = 'date picker',
}

export interface IFieldValue {
  value: string;
  isEdit: boolean;
  isEditable: boolean;
  editType: EDIT_TYPE;
  title: string;
  id: string;
  isError: boolean;
  options?: any[];
  typeSelect?: string;
}

export const formValue = {
  customer: {
    firstName: {
      value: '',
      isEdit: false,
      isEditable: true,
      editType: EDIT_TYPE.INPUT,
      title: 'First Name',
      id: v4(),
      isError: false,
    },
    lastName: {
      value: '',
      isEdit: false,
      isEditable: true,
      editType: EDIT_TYPE.INPUT,
      title: 'Last Name',
      id: v4(),
      isError: false,
    },
    gender: {
      value: '1',
      isEdit: false,
      isEditable: true,
      editType: EDIT_TYPE.SELECT,
      title: 'Gender',
      id: v4(),
      isError: false,
      typeSelect: 'Gender',
    },
    latestLead: {
      value: '02/08/2020(2560) (5:13:39PM)',
      isEdit: false,
      isEditable: true,
      editType: EDIT_TYPE.DATE,
      title: 'Latest lead',
      id: v4(),
      isError: false,
    },
    latestOrder: {
      isEdit: false,
      isEditable: true,
      value: '02/08/2020(2560) (5:13:39PM)',
      editType: EDIT_TYPE.DATE,
      title: 'Latest order',
      id: v4(),
      isError: false,
    },
  },
  policyHolder: {
    title: {
      value: '0',
      isEdit: false,
      isEditable: true,
      editType: EDIT_TYPE.SELECT,
      title: 'Title',
      id: v4(),
      isError: false,
      typeSelect: 'Title',
    },
    firstName: {
      value: 'Siriwan',
      isEdit: false,
      editType: EDIT_TYPE.INPUT,
      isEditable: true,
      title: 'First Name',
      id: v4(),
      isError: false,
    },
    lastName: {
      value: 'Tongkeang',
      isEdit: false,
      isEditable: true,
      editType: EDIT_TYPE.INPUT,
      title: 'Last Name',
      id: v4(),
      isError: false,
    },
    DOB: {
      isEdit: false,
      isEditable: true,
      editType: EDIT_TYPE.DATE_PICKER,
      title: 'DOB',
      id: v4(),
      isError: false,
    },
    age: {
      value: 30,
      title: 'Age',
      isEdit: false,
      isEditable: false,
      id: v4(),
      isError: false,
    },
    province: {
      value: 'krabi',
      isEdit: false,
      isEditable: false,
      editType: EDIT_TYPE.INPUT,
      title: 'Province',
      id: v4(),
      isError: false,
    },
    city: {
      value: 'Ao luk',
      isEdit: false,
      isEditable: false,
      editType: EDIT_TYPE.INPUT,
      title: 'City',
      id: v4(),
      isError: false,
    },
  },
  leadInfo: {
    agentName: {
      value: 'Siriwan',
      isEdit: false,
      isEditable: false,
      title: 'Agent Name',
      id: v4(),
      isError: false,
      editType: EDIT_TYPE.INPUT,
    },
    id: {
      value: 'Rabbit2020',
      title: 'Lead ID',
      isEdit: false,
      isEditable: false,
      id: v4(),
      isError: false,
      editType: EDIT_TYPE.INPUT,
    },
    type: {
      value: 'Renewal',
      isEdit: false,
      isEditable: false,
      title: 'Lead type',
      id: v4(),
      isError: false,
      editType: EDIT_TYPE.INPUT,
    },
  },
};

export const getAgeByDOB = (date: Date | string): string | number => {
  if (date) {
    return moment().diff(moment(new Date(date), 'YYYYMMDD'), 'years');
  }
  return '';
};

export const updateStateChange = (event: any, state: any) => {
  const { value } = event.target;
  const newState = { ...state };
  const maxLength = 40;
  if (isInvalidCharacters(value)) {
    newState.isError = true;
    newState.error = getString('text.inputInvalid');
  }
  if (value.length > maxLength) {
    newState.isError = true;
    newState.error = getString('text.inputMaxLength', { length: maxLength });
  }
  if (!(isInvalidCharacters(value) || value.length > maxLength)) {
    newState.isError = false;
    newState.error = '';
  }
  return newState;
};

export const mappingFiledValue = (form: any, data: any) => {
  const newFormValue = { ...form } as any;
  Object.keys(newFormValue).forEach((key) => {
    Object.keys(newFormValue[key]).forEach((childKey) => {
      newFormValue[key][childKey].value = (data as any)?.[key][childKey];
    });
  });
  const DOB = newFormValue?.policyHolder?.DOB?.value;
  if (DOB) {
    newFormValue.policyHolder.age.value = getAgeByDOB(DOB);
  }
  return newFormValue;
};

export const mappingCustomerStatus = (status: string) => {
  let customerStatus = '';
  StatusLeadAll.forEach((item) => {
    if (status === item.value) {
      customerStatus = item.title;
    }
  });
  return getString(customerStatus);
};

export const getStatusColor = (
  isPending: boolean | null,
  classes: ClassNameMap
) => {
  if (isPending !== INITIAL_STATUS_VALUE) {
    const result = isPending ? classes.statusOrange : classes.statusGreen;
    return result;
  }
  return '';
};

export const getPendingRejection = (response: any) => {
  let isPending = false;
  if (response?.rejections?.length) {
    isPending = response.rejections.find(
      (item: any) => item.decideTime === INITIAL_STATUS_VALUE
    );
  }
  return Boolean(isPending);
};

export const calculateDOBHelper = (schema: any, value: string | Date) => {
  const newDataSchema = { ...schema };
  newDataSchema.policyHolder.age.value = getAgeByDOB(value);
  return newDataSchema;
};

export const renderInputType = (objState: IFieldValue) => {
  if (objState.editType === EDIT_TYPE.INPUT) {
    return 1;
  }
  if (objState.editType === EDIT_TYPE.SELECT) {
    return 2;
  }
  if (objState.editType === EDIT_TYPE.DATE_PICKER) {
    return 3;
  }
  return 4;
};

export const getClassFieldItem = (keyValue: IFieldValue) => {
  return `field-item ${keyValue.isEdit ? 'active' : ''}`;
};
