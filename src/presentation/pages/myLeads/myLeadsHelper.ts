import { Observable, of } from 'rxjs';
import { delayWhen, map, pluck } from 'rxjs/operators';
import * as uuid from 'uuid';
import LeadDetailRepository from '../../../data/repository/leadDetail';
import { delayLoading } from '../../../shared/helper/operator';
import {
  formatDDMMYYYY,
  formatDDMMYYYYHHMMSS,
  modelValidationField,
} from '../../../shared/helper/utilities';
import { StatusLeadAll } from '../leads/LeadDashBoard/LeadDashBoard.helper';
import { getString } from '../../theme/localization';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: any;
  noTooltip?: boolean;
  breakSpace?: boolean;
  sorting?: 'none' | 'asc' | 'desc';
  field?: string;
  sortingField?: string;
}

export const columns: Column[] = [
  {
    id: 'name',
    field: 'name',
    label: 'text.name',
    minWidth: 150,
    sorting: 'none',
    sortingField: 'insuree.firstName',
  },
  {
    id: 'sumInsured',
    field: 'sumInsured',
    label: 'text.sumInsuredLabel',
    minWidth: 150,
    sorting: 'none',
    sortingField: 'insurance.sumInsured',
  },
  {
    id: 'leadStatus',
    field: 'leadStatus',
    label: 'text.leadStatus',
    minWidth: 150,
    breakSpace: true,
    sorting: 'none',
    sortingField: 'lead.status',
  },
  // INFO: no data for remark, need to hiden is for now
  // {
  //   id: 'remark',
  //   field: 'remark',
  //   label: 'text.remark',
  //   minWidth: 100,
  //   noTooltip: true,
  //   sorting: 'none',
  //   sortingField: '',
  // },
  {
    id: 'policyStartDate',
    field: 'policyStartDate',
    label: 'text.policyStartDate',
    format: 'date',
    minWidth: 200,
    sorting: 'none',
    sortingField: 'lead.data.policyStartDate',
  },
  {
    id: 'appointmentDate',
    field: 'appointmentDate',
    label: 'text.appointmentDate',
    format: 'date',
    minWidth: 200,
    sorting: 'none',
    sortingField: 'appointments.startTime',
  },
  {
    id: 'paymentCall',
    field: 'paymentCall',
    label: 'text.paymentCall',
    minWidth: 150,
    noTooltip: true,
    sorting: 'none',
    sortingField: '',
  },
  {
    id: 'connectedDials',
    field: 'connectedDials',
    label: 'text.connectDials',
    minWidth: 150,
    noTooltip: true,
    sorting: 'none',
    sortingField: '',
  },
  {
    id: 'failedDials',
    field: 'failedDials',
    label: 'text.failedDials',
    minWidth: 150,
    noTooltip: true,
    sorting: 'none',
    sortingField: '',
  },
  {
    id: 'totalDials',
    field: 'totalDials',
    label: 'text.totalDials',
    minWidth: 150,
    noTooltip: true,
    sorting: 'none',
    sortingField: '',
  },
  {
    id: 'leadId',
    field: 'leadId',
    label: 'text.leadId',
    minWidth: 120,
    sorting: 'none',
    sortingField: 'lead.humanId',
  },
  {
    id: 'renewalId',
    field: 'renewalId',
    label: 'text.renewalId',
    minWidth: 150,
    sorting: 'none',
    sortingField: '',
  },
  {
    id: 'licensePlate',
    field: 'licensePlate',
    label: 'text.licensePlate',
    minWidth: 150,
    sorting: 'none',
    sortingField: 'car.licensePlate',
  },
  {
    id: 'customerId',
    field: 'customerId',
    label: 'text.customerId',
    minWidth: 150,
    sorting: 'none',
    sortingField: 'customer.humanId',
  },
  {
    id: 'createdOn',
    field: 'createdOn',
    label: 'text.createdOn',
    format: 'date',
    minWidth: 150,
    breakSpace: true,
    sorting: 'none',
    sortingField: 'lead.createTime',
  },
  {
    id: 'updatedOn',
    field: 'updatedOn',
    label: 'text.updatedOn',
    format: 'date',
    minWidth: 150,
    breakSpace: true,
    sorting: 'none',
    sortingField: 'lead.updateTime',
  },
  {
    id: 'assignedOn',
    field: 'assignedOn',
    label: 'text.assignOn',
    format: 'date',
    minWidth: 150,
    breakSpace: true,
    sorting: 'none',
    sortingField: 'assigned.createTime',
  },
  {
    id: 'lastVisitedOn',
    field: 'lastVisitedOn',
    label: 'text.lastVisitedOn',
    format: 'date',
    minWidth: 200,
    breakSpace: true,
    sorting: 'none',
    sortingField: '',
  },
  {
    id: 'carBrand',
    field: 'carBrand',
    label: 'text.carBrand',
    minWidth: 150,
    sorting: 'none',
    sortingField: 'car.brand',
  },
  {
    id: 'carModel',
    field: 'carModel',
    label: 'text.carModel',
    minWidth: 150,
    sorting: 'none',
    sortingField: 'car.model',
  },
  {
    id: 'carYear',
    field: 'carYear',
    label: 'text.carYear',
    minWidth: 150,
    sorting: 'none',
    sortingField: 'car.year',
  },
];
export interface IPageState {
  currentPage?: number;
  perPage?: number;
  pageSize?: number;
  pageToken?: string;
  showDeleted?: boolean;
  filter?: string;
  orderBy?: string;
}
export const INITIAL_ITEM_PER_PAGE = 15;

export const initialPageState: IPageState = {
  currentPage: 1,
  pageSize: 15,
  pageToken: '',
  showDeleted: true,
  orderBy: '',
  filter: '',
};

export interface IToken {
  page: number;
  token: string;
}

export const listToken = [
  { token: '1', page: 1 },
  { token: '2', page: 2 },
  { token: '', page: 3 },
];

export interface IRowMyLead {
  id: number;
  important: boolean;
  detailLead: boolean;
  name: string;
  sumInsured: number;
  leadStatus: string;
  remark: string;
  policyStartDate: string;
  appointmentDate: string;
  paymentCall: string;
  connectedDials: number;
  failedDials: number;
  totalDials: number;
  leadId: string;
  renewalId: string;
  licensePlate: string;
  customerId: string;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
  assignedOn: string;
  lastVisitedOn: string;
  carBrand: string;
  carModel: string;
  carYear: number;
  isChecked?: boolean;
}

export interface IMyLeadData {
  page: number;
  nextPageToken: string;
  data: IRowMyLead[];
}

export const checkRowImportant = (countAdd: number, countRemove: number) => {
  let disableStarHandleBtn = {
    addStar: true,
    removeStar: true,
  };

  if (countAdd > 0 && countRemove > 0) {
    disableStarHandleBtn = {
      addStar: false,
      removeStar: false,
    };
    return disableStarHandleBtn;
  }
  if (countAdd > 0 && countRemove < 1) {
    disableStarHandleBtn = {
      addStar: false,
      removeStar: true,
    };
    return disableStarHandleBtn;
  }
  if (countAdd < 1 && countRemove > 0) {
    disableStarHandleBtn = {
      addStar: true,
      removeStar: false,
    };
    return disableStarHandleBtn;
  }
  return disableStarHandleBtn;
};

export enum TypeStar {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export enum TypeShowImportantStar {
  STAR = 'STAR',
  ALL = 'ALL',
}

export const IS_ADD_STAR = true;

export enum SORT_TABLE_TYPE {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}

export const changeSortStatus = (status: SORT_TABLE_TYPE) => {
  if (status === SORT_TABLE_TYPE.NONE) return SORT_TABLE_TYPE.ASC;
  if (status === SORT_TABLE_TYPE.ASC) return SORT_TABLE_TYPE.DESC;
  return SORT_TABLE_TYPE.NONE;
};

const customerLeadStatus = (status: string) => {
  const findLeadStatus = StatusLeadAll.find((item) => item.value === status);
  return findLeadStatus?.title || '';
};

export const formatMyLeads = (leadData: any[]) => {
  const data = leadData.map((item) => {
    return {
      leadDetailId: item?.lead?.name
        ? item.lead.name.replace('leads/', '')
        : '',
      fullLeadId: modelValidationField(item?.lead?.name),
      paymentCall: '',
      remark: '',
      name: `${modelValidationField(
        item?.lead?.data?.customerFirstName
      )} ${modelValidationField(item?.lead?.data?.customerLastName)}`,
      leadStatus: getString(customerLeadStatus(item?.lead.status)),
      createdOn: formatDDMMYYYYHHMMSS(item?.lead?.createTime),
      updatedOn: formatDDMMYYYYHHMMSS(item?.lead?.updateTime),
      assignedOn: formatDDMMYYYYHHMMSS(item?.assigned?.createTime),
      policyStartDate: formatDDMMYYYY(item?.insurance?.policyStartDate),
      teamName: modelValidationField(item?.team?.displayName),
      sumInsured: modelValidationField(item?.insurance?.sumInsured),
      appointmentDate: modelValidationField(item?.appointments?.startTime),
      leadId: modelValidationField(item.lead.humanId),
      licensePlate: modelValidationField(item?.car?.licensePlate),
      customerId: modelValidationField(item?.customer?.humanId),
      carBrand: modelValidationField(item?.car?.brand),
      carModel: modelValidationField(item?.car?.model),
      carYear: modelValidationField(item?.car?.year),
      isChecked: false,
      failedDials: '',
      connectedDials: '',
      totalDials: '',
      renewalId: '',
      lastVisitedOn: '',
      important: item?.lead?.important ?? false,
    };
  });
  // INFO: Auto add fake id
  return data.map((item) => {
    return {
      ...item,
      id: uuid.v4(),
    };
  });
};

export const getTeamId = (teamByUser: any) => {
  return teamByUser.members?.length
    ? teamByUser.members[0].name.substring(
        0,
        teamByUser.members[0].name.indexOf('/members')
      )
    : '';
};
export const getMyLeadsApi = (
  product: string,
  pageState?: IPageState & { assignedTo: string }
): Observable<any> => {
  const leadDetailRepository = new LeadDetailRepository();
  const productType = product || 'products/car-insurance';
  if (productType) {
    return leadDetailRepository
      .getMyLeads(productType.replace('products/', ''), pageState)
      .pipe(
        pluck('data'),
        delayWhen(delayLoading),
        map((res: any) => {
          return {
            data: formatMyLeads(res.leads),
            totalItem: res.total,
          };
        })
      );
  }
  return of({
    data: [],
    totalItem: 0,
  });
};
