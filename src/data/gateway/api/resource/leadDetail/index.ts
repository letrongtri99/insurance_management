import * as CONSTANTS from 'shared/constants';
import Type from '../../type';
import { IResource } from '../../../../../shared/interfaces/common/resource';
import { buildFilter, getQueryParts } from '../leadSearch';
import { filterMap } from '../lead';
import { queryString } from '../../helper/queryString.helper';

const PushComment = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.createComment}/${leadId}/comments`,
});

const SendEmail = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.sendEmail}/${leadId}/mails`,
});

const getListEmail = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.sendEmail}/${leadId}/mails?pageSize=${CONSTANTS.ATTACHMENT_PAGE_SIZE}`,
});

const AddPhone = (leadId: string): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.leadDetail.addPhone}/${leadId}/phone`,
});

const AddCoupon = (leadId: string): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.leadDetail.addCoupon}/${leadId}/voucher`,
});

const SendSms = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.sendSms}/${leadId}/sms`,
});

const SaveAppointment = (userId: string): IResource => {
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiUrl.leadDetail.saveAppointment}/${userId}/events`,
  };
};

const GetAppointment = (payload: {
  startDate: string;
  filter: string;
}): IResource => {
  return {
    Type: Type.Nest,
    Path: `/${CONSTANTS.apiUrl.leadDetail.getAppointment}?${queryString(
      payload
    )}&days=6`,
    // INFO: get appointment APi always get a full week of working day => days always 6.
  };
};

const getAttachment = (payload: string): IResource => {
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiUrl.leadDetail.getAttachment}/${payload}/attachments?pageSize=${CONSTANTS.ATTACHMENT_PAGE_SIZE}`,
  };
};

const createAttachment = (leadId: string, payload: string): IResource => {
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiUrl.leadDetail.createAttachment}/${leadId}/mails/${payload}/attachments`,
  };
};

const createCustomQuote = (lead: string): IResource => {
  return {
    Type: Type.Nest,
    Path: `/${CONSTANTS.apiUrl.leadDetail.createCustomQuote(lead)}`,
  };
};

const uploadAttachment = (payload: string): IResource => {
  return {
    Type: Type.Attachment,
    Path: payload,
  };
};

const AddEmail = (leadId: string): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.leadDetail.addEmail}/${leadId}/email`,
});

const AddAddressToLeads = (leadId: string): IResource => {
  return {
    Type: Type.Nest,
    Path: `/${CONSTANTS.apiUrl.leadDetail.addAddressToLeads}/${leadId}/address`,
  };
};

const GetCommunications = (leadId: string): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getCommunication}/${leadId}/communication`,
});

const AddLead = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.addLead}`,
});

const GetAgent = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getAgent}/${leadId}`,
});

const GetProvince = (): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getProvinces}/provinces`,
});

const GetProvinceById = (provinceId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getProvinces}/provinces/${provinceId}`,
});

const GetDistrict = (province: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getProvinces}/${province}/districts`,
});

const GetDistrictById = (payload: any): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getProvinces}/provinces/${payload.province}/districts/${payload.districts}`,
});

const GetSubDistrict = (payload: any): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getProvinces}/${payload}/subdistricts`,
});

const getCarBySubModel = (subModelYear: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getCarBySubModel}/${subModelYear}`,
});

const getCarSubModel = (subModel: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getCarGeneral}/${subModel}`,
});
const getCarModel = (subModel: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getCarGeneral}/${subModel}`,
});
const getCarBrand = (subModel: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getCarGeneral}/${subModel}`,
});

const GetListInsurer = (pageSize: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getListInsurer}?pageSize=${pageSize}`,
});

const getPaymentOptions = (leadId: string): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getPaymentOptions(leadId)}`,
});

const getLeadToken = (lead: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.createLeadToken(lead)}`,
});

const UpdateLeadData = (name: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.leadEndpoint}/${name}`,
});

const UpdateLeadStatus = (name: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.updateLeadEndPoint}/${name}:updateStatus`,
});

const PostLeadRejection = (name: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.rejectionEndpoint}/leads/${name}/rejections`,
});

const GetMyLeads = (productType: string, pageState: any): IResource => {
  const filters = buildFilter(pageState, filterMap(), []);
  filters.push(`lead.assignedTo in ("${pageState.assignedTo}")`);
  const queryParts = getQueryParts(
    productType,
    filters,
    pageState.pageSize,
    pageState.currentPage,
    pageState.orderBy
  );
  return {
    Type: Type.Public,
    Path: `/${CONSTANTS.apiEndpoint.myLeads}?${queryParts.join('&')}`,
  };
};

const LeadBulkImportant = (): IResource => {
  return {
    Type: Type.Nest,
    Path: `/${CONSTANTS.apiEndpoint.bulkImportant}`,
  };
};

const GetLeadRejectionById = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.rejectionEndpoint}/${leadId}/rejections`,
});

const GetLeadDetailById = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getLeadDetail}/${leadId}`,
});

const GetLeadPackage = (leadId: string): IResource => ({
  Type: Type.Nest,
  Path: `/${CONSTANTS.apiUrl.leadDetail.getLeadPackage(leadId)}`,
});

const CreatePaySlip = (leadId: string): IResource => ({
  Type: Type.Nest,
  Path: `${
    process.env.REACT_APP_GATEWAY_ENDPOINT
  }/${CONSTANTS.apiUrl.leadDetail.createPaySlit(leadId)}`,
});

const UpdateLead = (leadId: string): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.leadDetail.updateLead}/${leadId}:patchData`,
});

export default {
  getPaymentOptions,
  PushComment,
  SaveAppointment,
  GetAppointment,
  SendEmail,
  SendSms,
  getListEmail,
  AddEmail,
  AddAddressToLeads,
  AddPhone,
  getAttachment,
  uploadAttachment,
  createAttachment,
  GetCommunications,
  AddLead,
  GetAgent,
  GetProvince,
  GetDistrict,
  GetSubDistrict,
  getCarBySubModel,
  GetListInsurer,
  getCarSubModel,
  getCarModel,
  getCarBrand,
  GetProvinceById,
  getLeadToken,
  UpdateLeadData,
  UpdateLeadStatus,
  PostLeadRejection,
  GetDistrictById,
  GetMyLeads,
  LeadBulkImportant,
  GetLeadRejectionById,
  AddCoupon,
  GetLeadDetailById,
  createCustomQuote,
  GetLeadPackage,
  CreatePaySlip,
  UpdateLead,
};
