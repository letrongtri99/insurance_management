import { LEAD_TYPE } from '../../../modules/addLead/addLead.helper';

enum TABLE_LEAD_TYPE {
  LEAD_ALL = 'LEAD_ALL',
  LEAD_ASSIGNMENT = 'LEAD_ASSIGNMENT',
  LEAD_REJECTION = 'LEAD_REJECTION',
}

export const SearchFieldLeadAll = [
  { id: 1, title: 'text.select', value: '' },
  { id: 2, title: 'searchFieldLeadOption.customerName', value: 'customerName' },
  {
    id: 3,
    title: 'searchFieldLeadOption.customerPhone',
    value: 'customerPhone',
  },
  {
    id: 4,
    title: 'searchFieldLeadOption.customerEmail',
    value: 'customerEmail',
  },
  { id: 5, title: 'searchFieldLeadOption.id', value: 'id' },
];

export const SelectDateTypeLeadAll = [
  { id: 1, title: 'text.select', value: '' },
  { id: 2, title: 'dateTypeLeadOption.createOn', value: 'createTime' },
  { id: 3, title: 'dateTypeLeadOption.updateOn', value: 'updateTime' },
  { id: 4, title: 'dateTypeLeadOption.assignOn', value: 'assignTime' },
  { id: 5, title: 'dateTypeLeadOption.rejectOn', value: 'rejectTime' },
  {
    id: 6,
    title: 'dateTypeLeadOption.policyStartOn',
    value: 'policyStartTime',
  },
  {
    id: 7,
    title: 'dateTypeLeadOption.policyExpiryOn',
    value: 'policyExpiryTime',
  },
];

export const StatusLeadAll = [
  { id: 1, title: 'leadStatus.new', value: 'LEAD_STATUS_NEW' },
  { id: 2, title: 'leadStatus.valid', value: 'LEAD_STATUS_VALID' },
  { id: 3, title: 'leadStatus.contacted', value: 'LEAD_STATUS_CONTACTED' },
  { id: 4, title: 'leadStatus.interested', value: 'LEAD_STATUS_INTERESTED' },
  { id: 5, title: 'leadStatus.prospect', value: 'LEAD_STATUS_PROSPECT' },
  {
    id: 6,
    title: 'leadStatus.pendingPayment',
    value: 'LEAD_STATUS_PENDING_PAYMENT',
  },
  { id: 6, title: 'leadStatus.purchased', value: 'LEAD_STATUS_PURCHASED' },
  { id: 6, title: 'leadStatus.cancelled', value: 'LEAD_STATUS_CANCELLED' },
];

export const LeadType = [
  { id: 1, title: 'leadTypeFilter.new', value: LEAD_TYPE.NEW },
  { id: 2, title: 'leadTypeFilter.retainer', value: LEAD_TYPE.RETAINER },
  { id: 3, title: 'leadTypeFilter.renewal', value: LEAD_TYPE.RENEWAL },
];

export default TABLE_LEAD_TYPE;

export const INITIAL_VALUES = {
  search: { key: '', value: '' },
  date: {
    startDate: {
      criteria: '',
      range: { startDate: null, endDate: null },
    },
    endDate: {
      criteria: '',
      range: { startDate: null, endDate: null },
    },
  },
  source: [],
  leadStatus: [],
  score: [],
  carBrand: [],
  leadType: [],
  assignToUser: [],
  assignToTeam: [],
  sumInsured: [0, 0],
  lastPremium: [0, 0],
};

export const DEFAULT_PER_PAGE = 15;
