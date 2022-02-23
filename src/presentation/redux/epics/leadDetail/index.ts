import { combineEpics } from 'redux-observable';
import leadDetailCommentEpic from './commentEpic';
import leadDetailScheduleEpic from './scheduleModal';
import summaryCallEpic from './summaryCallEpic';
import leadDetailEmailEpic from './emailEpic';
import leadDetailSmsEpic from './smsEpic';
import addAddressToLeadsEpic from './addressEpic';
import leadDetailPhoneEpic from './phoneEpic';
import getAgentEpic from './getLeadDataEpic';
import addLeadEpic from './addLeadEpic';
import updateLeadInformationEpic from './updateLeadInformationEpic';
import getCarBrandEpic from './getCarEpic';
import insurerEpic from './getInsurer';
import updateCustomerDetailEpic from './updateCustomerDetailEpic';
import updateLeadStatusEpic from './updateLeadStatusEpic';
import leadRejectionEpic from './leadRejectionEpic';
import updateLeadImportantEpic from './updateLeadImportantEpic';
import handleSummaryModalEpic from './SummaryModalEpic';
import leadDetailCouponEpic from './couponEpic';
import {
  createCustomQuoteSuccessEpic,
  createCustomQuoteEpic,
} from './customQuoteEpic';
import getPaymentOptionsEpic from './getInstallment';

const leadDetailEpic = combineEpics(
  leadDetailCommentEpic,
  leadDetailScheduleEpic,
  summaryCallEpic,
  leadDetailEmailEpic,
  leadDetailSmsEpic,
  addAddressToLeadsEpic,
  leadDetailPhoneEpic,
  getAgentEpic,
  addLeadEpic,
  updateLeadInformationEpic,
  getCarBrandEpic,
  insurerEpic,
  updateCustomerDetailEpic,
  updateLeadStatusEpic,
  leadRejectionEpic,
  updateLeadImportantEpic,
  handleSummaryModalEpic,
  leadDetailCouponEpic,
  createCustomQuoteEpic,
  createCustomQuoteSuccessEpic,
  getPaymentOptionsEpic
);

export default leadDetailEpic;
