import { Observable } from 'rxjs';
import ApiGateway from 'data/gateway/api';
import { RabbitResource } from 'data/gateway/api/resource';
import getConfig from 'data/setting';
import {
  ILeadDetail,
  ISaveAppointment,
  IUpdateLead,
  ILicensePlate,
  IUpdateLeadStatus,
  ICreateComment,
} from 'shared/interfaces/common/lead/detail';
import { ICreatePackage } from 'shared/interfaces/common/lead/package';
import LeadDetailCloud from './cloud';

const apiGateway = ApiGateway.createAPIConnection(getConfig());

export default class LeadDetailRepository {
  /**
   *
   * @param user
   * @returns {Promise<ResponseModel<any>>}
   */
  pushComment = (payload: ILeadDetail) => {
    return LeadDetailCloud.pushComment(payload);
  };

  getListEmail = (payload: ILeadDetail) => {
    return LeadDetailCloud.getListEmail(payload);
  };

  sendEmail = (payload: ILeadDetail) => {
    return LeadDetailCloud.sendEmail(payload);
  };

  sendSms = (payload: ILeadDetail) => {
    return LeadDetailCloud.sendSms(payload);
  };

  saveAppointment = (payload: ISaveAppointment) => {
    return LeadDetailCloud.saveAppointment(payload);
  };

  getAppointment = (payload: { startDate: string; filter: string }) => {
    return LeadDetailCloud.getAppointment(payload);
  };

  getAttachment = (payload: string) => {
    return LeadDetailCloud.getAttachment(payload);
  };

  createAttachment = (payload: ILeadDetail) => {
    return LeadDetailCloud.createAttachment(payload);
  };

  uploadAttachment = (payload: ILeadDetail) => {
    return LeadDetailCloud.uploadAttachment(payload);
  };

  addEmail = (payload: ILeadDetail) => {
    return LeadDetailCloud.addEmail(payload);
  };

  addAddressToLeads = (payload: any) => {
    return LeadDetailCloud.addAddressToLeads(payload);
  };

  addPhone = (payload: ILeadDetail) => {
    return LeadDetailCloud.addPhone(payload);
  };

  addCoupon = (payload: ILeadDetail) => {
    return LeadDetailCloud.addCoupon(payload);
  };

  deleteCoupon = (payload: ILeadDetail) => {
    return LeadDetailCloud.deleteCoupon(payload);
  };

  addLead = (payload: ILeadDetail) => {
    return LeadDetailCloud.addLead(payload);
  };

  getAgent = (payload: string) => {
    return LeadDetailCloud.getAgent(payload);
  };

  updateLeadData = (payload: IUpdateLead) => {
    return LeadDetailCloud.updateLeadData(payload);
  };

  getListInsurer = (payload: string) => {
    return LeadDetailCloud.getListInsurer(payload);
  };

  getCarBySubModel = (payload: string) => {
    return LeadDetailCloud.getCarBySubModelYear(payload);
  };

  updateLicensePlate = (payload: ILicensePlate) => {
    return LeadDetailCloud.updateLicensePlate(payload);
  };

  updateLeadStatus = (payload: IUpdateLeadStatus) => {
    return LeadDetailCloud.updateLeadStatus(payload);
  };

  postComment = (payload: ICreateComment) => {
    return LeadDetailCloud.postComment(payload);
  };

  createCustomQuote = (payload: { lead: string; package: ICreatePackage }) => {
    return LeadDetailCloud.createCustomQuote(payload.lead, payload.package);
  };

  getMyLeads = (productType: string, pageState?: any) => {
    return LeadDetailCloud.getMyLead(productType, pageState);
  };

  leadBulkImportant = (body: { ids: string[]; important: boolean }) => {
    return LeadDetailCloud.leadBulkImportant(body);
  };

  getLeadPackage = (leadId: string) => {
    return LeadDetailCloud.getLeadPackage(leadId);
  };

  createPaySlip = (leadId: string, body: any) => {
    return LeadDetailCloud.createPaySlip(leadId, body);
  };

  getPaymentOptions = (leadId: string) => {
    const getPaymentOptionsResource =
      RabbitResource.LeadDetail.getPaymentOptions(leadId);

    return apiGateway.doGetAjaxRequest(getPaymentOptionsResource);
  };

  updateLead = (leadId: string, body: any) => {
    return LeadDetailCloud.updateLead(leadId, body) as Observable<any>;
  };
}
