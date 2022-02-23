import * as CONSTANTS from 'shared/constants';
import { IResource } from 'shared/interfaces/common/resource';
import Type from '../../type';
import { IPayLoad, queryString } from '../../helper/queryString.helper';
import { buildFilter, getQueryParts } from '../leadSearch';

const GetLeadSources = (
  payload: IPayLoad & { orderBy?: string[] }
): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.lead.list}?${queryString(payload)}`,
});

const GetUtmMedium = (
  payload: IPayLoad & { orderBy?: string[] }
): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.lead.mediumEndpoint}?${queryString(payload)}${
    payload.orderBy || ''
  }`,
});

const GetUtmCampaign = (
  payload: IPayLoad & { orderBy?: string[] }
): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.lead.campaignEndpoint}?${queryString(payload)}${
    payload.orderBy || ''
  }`,
});

const GetFullLeadSources = (
  payload: IPayLoad & { orderBy?: string[] }
): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiEndpoint.fullLeadSourcesEndpoint}?${queryString(
    payload
  )}${payload.orderBy || ''}`,
});

interface GetCommentParams {
  pageSize: number;
  pageToken: string;
  showDeleted: boolean;
  filter: string;
  orderBy: string;
}

const CreateLeadSources = (): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.lead.create}`,
});

const CreateLeadSourcesScore = (): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.lead.createScore}`,
});

const GetLeadSourcesScore = (scoreName: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.scoreEndpoint}/${scoreName}`,
});

const UpdateLeadSourcesScore = (scoreName: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.scoreEndpoint}/${scoreName}`,
});

const UpdateLeadSources = (name: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${name}`,
});

const GetLeads = (pageSize: number): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/leads?pageSize=${pageSize}`,
});

const GetComment = (
  {
    pageSize = 5,
    pageToken = '',
    showDeleted = false,
    filter = '',
    orderBy = '',
  }: GetCommentParams,
  name?: string
): IResource => {
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${name}comments?pageSize=${pageSize}&pageToken=${pageToken}&filter=${filter}&orderBy=${orderBy}&showDeleted=${showDeleted}`,
  };
};

const CreateComment = (name: string) => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${name}/comments`,
  // INFO: Lead Detail
});

const GetSingleComment = (returnURL: string) => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${returnURL}`,
});

const CreateRejection = (parent: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.rejectionEndpoint}/${parent}${CONSTANTS.apiUrl.rejection.create}`,
});

const CreateLead = (): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.importLeadEndPoint}`,
});

export const filterMap = (body?: any) => [
  {
    filter: 'search.customerName',
    type: 'contain',
    field: 'insuree.fullName',
    escape: true,
  },
  {
    filter: 'search.customerPhone',
    type: 'match',
    field: 'insuree.phone',
    escape: true,
  },
  {
    filter: 'search.customerEmail',
    type: 'match',
    field: 'insuree.email',
    escape: true,
  },
  {
    filter: 'search.id',
    type: 'match',
    field: 'lead.humanId',
  },
  // // INFO : add more filed for search my leads
  {
    filter: 'search.licensePlate',
    type: 'match',
    field: 'car.licensePlate',
  },
  {
    filter: 'searchStar',
    type: 'match',
    field: 'lead.important',
  },
  // INFO : end of add field for search my leads
  {
    filter: 'date',
    type: 'choiceDate',
    options: [
      { filter: 'createTime', field: 'lead.createTime' },
      { filter: 'updateTime', field: 'lead.updateTime' },
      { filter: 'assignTime', field: 'assigned.createTime' },
      { filter: 'rejectTime', field: 'lead.rejectTime' },
      { filter: 'policyStartTime', field: 'insurance.policyStartDate' },
      { filter: 'policyExpiryTime', field: 'insurance.policyExpiryDate' },
      { filter: 'appointmentTime', field: 'appointments.startTime' },
      { filter: 'lastVisitedTime', field: 'appointments.lastVisitedTime' },
    ],
  },
  {
    filter: 'date2',
    type: 'choiceDate',
    options: [
      { filter: 'createTime', field: 'lead.createTime' },
      { filter: 'updateTime', field: 'lead.updateTime' },
      { filter: 'assignTime', field: 'assigned.createTime' },
      { filter: 'rejectTime', field: 'lead.rejectTime' },
      { filter: 'policyStartTime', field: 'insurance.policyStartTime' },
      { filter: 'policyExpiryTime', field: 'insurance.policyExpiryTime' },
      { filter: 'appointmentTime', field: 'appointments.startTime' },
      { filter: 'lastVisitedTime', field: 'appointments.lastVisitedTime' },
    ],
  },
  {
    filter: 'source',
    type: 'multi',
    field: 'lead.source',
    callback: (source: { [key: string]: string }) => {
      return source.name;
    },
  },
  {
    filter: 'leadStatus',
    type: 'multi',
    field: 'lead.status',
    callback: (status: { [key: string]: string }) => {
      return status.value;
    },
  },
  {
    filter: 'score',
    type: 'multi',
    field: 'lead.score',
    callback: (score: { [key: string]: string }) => {
      return score.id;
    },
  },
  {
    filter: 'sumInsured',
    type: 'range',
    field: 'insurance.sumInsured',
  },
  {
    filter: 'carBrand',
    type: 'multi',
    field: 'car.brand',
    callback: (car: { [key: string]: string }) => {
      return car.displayName;
    },
  },
  {
    filter: 'leadType',
    type: 'multi',
    field: 'lead.type',
    callback: (leadType: { [key: string]: string }) => {
      return leadType.value;
    },
  },
  {
    filter: 'assignToUser',
    type: 'multi',
    field: 'lead.assignedTo',
    callback: (user: { [key: string]: string }) => {
      return user.name;
    },
  },
  {
    filter: 'assignToTeam',
    type: 'multi',
    field: 'team.name',
    callback: (team: { [key: string]: string }) => {
      return team.name;
    },
  },
  {
    filter: 'lastInsurer',
    type: 'multi',
    field: 'insurance.currentInsurer',
    callback: (user: { [key: string]: string }) => {
      return user.name;
    },
  },
];

const getLeadAssignment = (body: any, productName: string): IResource => {
  const name = productName?.replace('products/', '') || 'car-insurance';
  const filters = buildFilter(body, filterMap(body), []);
  const queryParts = getQueryParts(
    name,
    filters,
    body.pageSize,
    body.currentPage,
    body.orderBy
  );
  const path = `/${CONSTANTS.apiEndpoint.leadAssignment}?${queryParts.join(
    '&'
  )}`;

  return {
    Type: Type.Public,
    Path: path,
  };
};

const GetImportLeadList = (
  payload: IPayLoad & { orderBy?: string[] }
): IResource => ({
  Type: Type.Public,
  Path: `/${
    CONSTANTS.apiUrl.lead.importList
  }?filter=status!=%22WAITING_UPLOAD%22%20importType=%22LEAD%22&${queryString(
    payload
  )}${payload.orderBy || ''}`,
  /* 
    TODO:
    Hardcoding the above filter as default as import listing doesnt support it right now.
    Have to delete it later in future when import listing supports.
   */
});

const assignLeads = (): IResource => {
  return {
    Type: Type.Nest,
    Path: `/${CONSTANTS.apiEndpoint.assignLeads}`,
  };
};

const rejectLeads = (): IResource => {
  return {
    Type: Type.Nest,
    Path: `/${CONSTANTS.apiEndpoint.rejectLeads}`,
  };
};

const transformPlaceholders = (lead: string): IResource => {
  return {
    Type: Type.Nest,
    Path: `/${CONSTANTS.apiEndpoint.transformPlaceholders(lead)}`,
  };
};

const GetLeadParticipants = (payload: IPayLoad & { orderBy?: string[] }) => ({
  Type: Type.Public,
  Path: `/${
    CONSTANTS.apiEndpoint.call
  }/calls/-/participants?showDeleted=true&${queryString(payload)}${
    payload.orderBy || ''
  }`,
});

const GetLeadRecording = (payload: IPayLoad) => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.call}/${payload}/recording`,
});

const CreateLeadDocument = (parents: string): IResource => {
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${parents}/documents`,
  };
};

const DeleteLeadDocument = (document: string): IResource => {
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${document}`,
  };
};

const GetUploadedLeadDocuments = (parent: string): IResource => {
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${parent}/documents`,
  };
};

export default {
  CreateLeadSources,
  UpdateLeadSources,
  GetComment,
  GetSingleComment,
  CreateComment,
  GetLeads,
  CreateLeadSourcesScore,
  GetLeadSources,
  CreateRejection,
  GetLeadSourcesScore,
  UpdateLeadSourcesScore,
  GetFullLeadSources,
  GetUtmMedium,
  GetUtmCampaign,
  CreateLead,
  getLeadAssignment,
  GetImportLeadList,
  assignLeads,
  rejectLeads,
  transformPlaceholders,
  GetLeadParticipants,
  GetLeadRecording,
  CreateLeadDocument,
  DeleteLeadDocument,
  GetUploadedLeadDocuments,
};
