import * as yup from 'yup';
import { getString } from 'presentation/theme/localization';

export enum MessageType {
  Email = 'email',
  SMS = 'sms',
}

export interface ISmsRequestBody {
  message: string;
  phoneIndex: number;
  status: string;
}

export interface IFileModal {
  fileSize: number;
  label: string;
}

export interface IEmailRequestBody {
  name: string;
  subject: string;
  body: string;
  cc: string[];
  bodyText: string;
  emailIndex: number;
  type: string;
  parentId?: string;
}
export interface IFormData {
  [MessageType.Email]: {
    message: string;
    emailTemplate: string;
    to: string;
    cc: string[];
    subject: string;
    attachment: any[];
    packageUrl?: string;
  };
  [MessageType.SMS]: {
    smsMessage: string;
    phone: string;
  };
}

export const initialFormData: IFormData = {
  email: {
    message: '',
    emailTemplate: '',
    to: '',
    cc: [],
    subject: '',
    attachment: [],
    packageUrl: '',
  },
  sms: {
    smsMessage: '',
    phone: '',
  },
};

export const emailValidationSchema = yup.object().shape({
  email: yup.object().shape({
    message: yup.string().required('Message is required'),
    subject: yup
      .string()
      .required(getString('errors.required', { field: 'Subject' })),
  }),
});

export const smsValidationSchema = yup.object().shape({
  sms: yup.object().shape({
    message: yup.string().required('Message is required'),
    phone: yup
      .string()
      .required(getString('errors.required', { field: 'Phone Number' }))
      .trim(),
  }),
});

export const FakeTo = [
  { id: 1, value: 'alex@rabbit.co.th', title: 'alex@rabbit.co.th' },
  { id: 2, value: 'alex@rabbitfinance.com', title: 'alex@rabbitfinance.com' },
  { id: 3, value: 'Siriwan@rabbit.co.th', title: 'Siriwan@rabbit.co.th' },
];

export const FakeEmailTemplate = [
  { id: 1, value: 'quote', title: 'Quote' },
  { id: 2, value: 'paymentFollowUp', title: 'Payment follow up' },
  { id: 3, value: 'notReachable', title: 'Not reachable' },
  { id: 4, value: 'renewalReminder', title: 'Renewal Reminder' },
  { id: 5, value: 'noTemplate', title: 'No template' },
];

export const getMailIndex = (email: string) => {
  const mailIndex = Number(email) - 1;

  return mailIndex || 0;
};

export enum smsStatusTypes {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export enum mailTypes {
  OUTBOUND = 'OUTBOUND',
  INBOUND = 'INBOUND',
  SYSTEM = 'SYSTEM',
  SUPPORT = 'SUPPORT',
}

export interface IListAttachmentRequest {
  listAttachment: IAttachmentRequest[];
  mailModal: IEmailRequestBody;
}

export interface IAttachmentRequest {
  fileModal: IFileModal;
  file: File;
  mailId: string;
}
