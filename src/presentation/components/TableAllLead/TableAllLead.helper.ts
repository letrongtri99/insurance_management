import { IPageState } from 'shared/interfaces/common/table';
import { DELAY_SCROLL_BOTTOM } from '../../HOCs/WithTableListHelper';
import { leadRejectionColumn } from './TableRejectionLead.helper';
import TABLE_LEAD_TYPE from '../../pages/leads/LeadDashBoard/LeadDashBoard.helper';

const RELATIVE_POSITION = 65;
export interface Column {
  id: string;
  field?: string;
  label: string;
  align?: 'right' | 'center' | 'left';
  format?: any;
  sorting?: 'none' | 'asc' | 'desc';
  noTooltip?: boolean;
  minWidth?: number;
  sortingField?: string;
  isNotSorting?: boolean;
}
export const agentNameList = [
  { id: 1, title: 'Agent name 1', value: 'team-1' },
  { id: 2, title: 'Agent name 2', value: 'team-2' },
  { id: 3, title: 'Agent name 3', value: 'team-3' },
];

export const ITEM_PER_PAGE_LIST = [15, 25, 50, 75, 100];

export const tableAllLeadSetting: Column[] = [
  {
    id: 'teamName',
    label: 'text.team',
    sorting: 'none',
    minWidth: 80,
    sortingField: 'team.displayName',
  },
  {
    id: 'user',
    label: 'text.user',
    sorting: 'none',
    minWidth: 80,
    sortingField: 'assigned.firstName',
  },
  {
    id: 'name',
    label: 'text.name',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insuree.fullName',
  },
  {
    id: 'expiryDate',
    label: 'text.expiryDate',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.policyExpiryDate',
  },
  {
    id: 'leadType',
    label: 'text.leadType',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.type',
  },
  {
    id: 'leadStatus',
    label: 'text.leadStatus',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.status',
  },
  {
    id: 'leadScore',
    label: 'text.leadScore',
    sorting: 'none',
    minWidth: 150,
    sortingField: '',
    isNotSorting: true,
  },
  {
    id: 'sumInsured',
    label: 'text.sumInsuredLabel',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.sumInsured',
  },
  {
    id: 'appointmentDate',
    label: 'text.appointmentDate',
    sorting: 'none',
    minWidth: 180,
    sortingField: 'appointments.startTime',
  },
  {
    id: 'leadId',
    label: 'text.leadId',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'lead.humanId',
  },
  {
    id: 'phoneNumber',
    label: 'text.phoneNumber',
    sorting: 'none',
    minWidth: 150,
    isNotSorting: true,
  },
  {
    id: 'licensePlate',
    label: 'text.licensePlate',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.licensePlate',
  },
  {
    id: 'leadSource',
    label: 'text.leadSource',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'source.source',
  },
  {
    id: 'customerId',
    label: 'text.customerId',
    sorting: 'none',
    minWidth: 150,
    isNotSorting: true,
  },
  {
    id: 'createdOn',
    label: 'text.createdOn',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'lead.createTime',
  },
  {
    id: 'updatedOn',
    label: 'text.updatedOn',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'lead.updateTime',
  },
  {
    id: 'assignedOn',
    label: 'text.assignOn',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'assigned.createTime',
  },
  {
    id: 'dob',
    label: 'text.dob',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.dateOfBirth',
  },
  {
    id: 'gender',
    label: 'text.gender',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.gender',
  },
  {
    id: 'age',
    label: 'text.age',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.age',
  },
  {
    id: 'email',
    label: 'text.email',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.email',
  },
  {
    id: 'marketingConsent',
    label: 'text.marketingConsent',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.data.marketingConsent',
  },
  {
    id: 'carBranch',
    label: 'text.carBrand',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.brand',
  },
  {
    id: 'carModel',
    label: 'text.carModel',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.model',
  },
  {
    id: 'carYear',
    label: 'text.carYear',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.year',
  },
  {
    id: 'carEngineSize',
    label: 'text.carEngineSize',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.engineSize',
  },
  {
    id: 'carTransmission',
    label: 'text.carTransmission',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.transmission',
  },
  {
    id: 'carDashcam',
    label: 'text.carDashcam',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.dashcam',
  },
  {
    id: 'carUsage',
    label: 'text.carUsage',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.usage',
  },
  {
    id: 'carRegisteredProvince',
    label: 'text.carRegisteredProvince',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'car.registeredProvince',
  },
  {
    id: 'carModification',
    label: 'text.carModification',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.modified',
  },
  {
    id: 'currentInsurer',
    label: 'text.currentInsurer',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.currentInsurer',
  },
  {
    id: 'lastInsurer',
    label: 'text.lastInsurer',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.preferredInsurer',
  },
  {
    id: 'policyStartDate',
    label: 'text.policyStartDate',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.data.policyStartDate',
  },
  {
    id: 'policyPreferredType',
    label: 'text.policyPreferredType',
    sorting: 'none',
    minWidth: 170,
    sortingField: 'insurance.voluntaryInsuranceType',
  },
];

export const returnTableAllLeadSetting = (
  tableType: string,
  tableAllLeadSettings: Column[]
) => {
  let setting: Column[] = [];
  setting = JSON.parse(JSON.stringify(tableAllLeadSettings));
  if (tableType === 'LEAD_REJECTION') {
    leadRejectionColumn.forEach((column: Column) => {
      setting.unshift(column);
    });
    return setting;
  }
  if (tableType === TABLE_LEAD_TYPE.LEAD_ALL) {
    setting = setting.map((item) => ({
      ...item,
      ...(item.id === 'createdOn' && { sorting: 'desc' }),
    }));
  }
  return setting;
};

export enum SORT_TABLE_TYPE {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}

export const DEFAULT_PER_PAGE_TABLE = 15;

export const changeSortStatus = (status: SORT_TABLE_TYPE) => {
  if (status === SORT_TABLE_TYPE.NONE) return SORT_TABLE_TYPE.ASC;
  if (status === SORT_TABLE_TYPE.ASC) return SORT_TABLE_TYPE.DESC;
  return SORT_TABLE_TYPE.NONE;
};

export const initialPageState: IPageState = {
  currentPage: 1,
  pageSize: 15,
};

export const listToken = [
  { token: '1', page: 1 },
  { token: '2', page: 2 },
  { token: '', page: 3 },
];

export interface IToken {
  page: number;
  token: string;
}

export interface IRowLeadAssignment {
  teamName: string;
  user: string;
  name: string;
  expiryDate: string;
  totalDials: string;
  connectDials: string;
  failedDials: string;
  leadStatus: string;
  leadScore: string;
  sumInsured: number;
  paymentDate: string;
  appointmentDate: string;
  leadId: string;
  renewalId: string;
  phoneNumber: string;
  licensePlate: string;
  leadSource: string;
  customerId: string;
  createdOn: string;
  updatedOn: string;
  assignedOn: string;
  lastVisitedOn: string;
  dob: string;
  gender: string;
  age: number;
  email: string;
  marketingConsent: boolean;
  carBranch: string;
  carModel: string;
  carYear: number;
  carEngineSize: string;
  carTransmission: string;
  carDashcam: string;
  carUsage: string;
  carRegisteredProvince: string;
  carModification: boolean;
  currentInsurer: string;
  lastInsurer: string;
  policyStartDate: string;
  policyPreferredType: string;
  isChecked: boolean;
  isAssigned: boolean;
  id: number;
}

export const leadFields = [
  'teamName',
  'user',
  'name',
  'expiryDate',
  'totalDials',
  'connectDials',
  'failedDials',
  'leadStatus',
  'leadScore',
  'sumInsured',
  'paymentDate',
  'appointmentDate',
  'leadId',
  'renewalId',
  'phoneNumber',
  'licensePlate',
  'leadSource',
  'customerId',
  'createdOn',
  'updatedOn',
  'assignedOn',
  'lastVisitedOn',
  'dob',
  'gender',
  'age',
  'email',
  'marketingConsent',
  'carBranch',
  'carModel',
  'carYear',
  'carEngineSize',
  'carTransmission',
  'carDashcam',
  'carUsage',
  'carRegisteredProvince',
  'carModification',
  'currentInsurer',
  'lastInsurer',
  'policyStartDate',
  'policyPreferredType',
];

export interface ILeadAssignmentData {
  page: number;
  nextPageToken: string;
  data: IRowLeadAssignment[];
}

export enum TypeAssign {
  ASSIGN = 'ASSIGN',
  UNASSIGN = 'UNASSIGN',
}

export const checkRowAssigned = (countAdd: number, countRemove: number) => {
  let disableStarHandleBtn = {
    assign: true,
    unAssign: true,
  };

  if (countAdd > 0 && countRemove > 0) {
    disableStarHandleBtn = {
      assign: false,
      unAssign: false,
    };
    return disableStarHandleBtn;
  }
  if (countAdd > 0 && countRemove < 1) {
    disableStarHandleBtn = {
      assign: false,
      unAssign: true,
    };
    return disableStarHandleBtn;
  }
  if (countAdd < 1 && countRemove > 0) {
    disableStarHandleBtn = {
      assign: true,
      unAssign: false,
    };
    return disableStarHandleBtn;
  }
  return disableStarHandleBtn;
};

export const shimmerArray = (pageSize: number) => {
  const SHIMMER = [];
  for (let i = 0; i < pageSize; i += 1) {
    const newShimmer: any = {};
    leadFields.forEach((item) => {
      newShimmer[item] = '';
    });
    SHIMMER.push(newShimmer);
  }
  return SHIMMER;
};
export const scrollBottom = (offsetTop: number) => {
  setTimeout(() => {
    window.scroll({
      top: offsetTop - RELATIVE_POSITION,
      left: 0,
      behavior: 'smooth',
    });
  }, DELAY_SCROLL_BOTTOM);
};

export const getOrderLead = (field: string, status?: SORT_TABLE_TYPE) => {
  if (!field) {
    return '';
  }
  if (status === SORT_TABLE_TYPE.NONE) return '';
  if (status === SORT_TABLE_TYPE.ASC) return `order_by=${field}`;
  return `order_by=${field} desc`;
};

export const RECORDING_ERROR_CODE = 400;

export const RECORDING_ERROR_MESSAGE = 'call ongoing';

export enum TableAllLeadButtonRow {
  ASSIGN_BUTTON_ENGLISH_COL = 6,
  ASSIGN_BUTTON_THAI_COL = 4,
  LEAD_ALL_BUTTON_COL = 12,

  ASSIGN_PAGING_LG = 12,
  ASSIGN_PAGING_XL = 7,
  REJECT_PAGING_LG = 8,
  REJECT_PAGING_XL = 7,
  FULL_PAGING = 12,
}
