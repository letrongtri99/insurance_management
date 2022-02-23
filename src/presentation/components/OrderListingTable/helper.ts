import { IPageState } from 'shared/interfaces/common/table';
import {
  DocumentStatus,
  QCStatus,
  SubmissionStatus,
  ApprovalStatus,
  MotoTypes,
} from 'shared/constants/orderType';
import { getString } from '../../theme/localization/index';
import { ITextStatus } from './TextStatus';

export interface Column {
  id: string;
  label: string;
  value?: string | number;
  field?: string;
  align?: 'right' | 'center' | 'left';
  format?: any;
  sorting?: 'none' | 'asc' | 'desc';
  noTooltip?: boolean;
  minWidth?: number;
  sortingField?: string;
  isNotSorting?: boolean;
  warningLbl?: string;
}

interface OrderStatus {
  documentsStatus: ITextStatus;
  qcStatus: ITextStatus;
  submissionStatus: ITextStatus;
  approvalStatus: ITextStatus;
}

export interface Product extends OrderStatus {
  [key: string]: ITextStatus | number | string;
  policyRef: string;
  policyHolder: string;
  productType: string;
  insurer: string;
  premium: string;
}

export interface Order extends OrderStatus {
  id: string;
  orderId: string;
  assignedTo?: string;
  customer: string;
  website: string;
  paymentTerms: string;
  paymentStatus: ITextStatus;
  totalNetPremium: string;
  leadSource: string;
  isStar: boolean;
  products: Product[];
  isChecked: boolean;
  warningLbl?: string;
}

export interface Approval {
  id: string;
  policyId: string;
  assignedTo: string;
  createdOn: string;
  insuranceCategory: string;
  productType: string;
  insurerSearchLabel: string;
  customerPolicyholder: string;
  totalNetPremium: string;
  paymentTerms: string;
  paymentStatus: ITextStatus;
  documentStatus: ITextStatus;
  qcStatus: ITextStatus;
  submissionStatus: ITextStatus;
  approvalStatus: ITextStatus;
  isStar: boolean;
  isChecked: boolean;
}

export interface ProductItem {
  addons?: any[];
  approvalStatus?: string;
  discounts?: any[];
  documentStatus?: string;
  grossPremium?: string;
  motorItemType?: string;
  name?: string;
  netPremium?: string;
  package?: string;
  price?: string;
  product?: string;
  qcStatus?: string;
  stampDuty?: string;
  stampDutyPercentage?: number;
  submissionStatus?: string;
  vatAmount?: string;
  vatPercent?: number;
}

export interface CustomerIProps {
  firstName?: string;
  lastName?: string;
}

export const ITEM_PER_PAGE_LIST = [15, 25, 50, 75, 100];

export const columnSettings: Column[] = [
  {
    id: 'orderId',
    label: 'leadDetailFields.orderId',
  },
  {
    id: 'customer',
    label: 'text.customer',
  },
  {
    id: 'website',
    label: 'text.website',
  },
  {
    id: 'paymentTerms',
    label: 'text.paymentTerms',
  },
  {
    id: 'paymentStatus',
    label: 'text.paymentStatus',
  },
  {
    id: 'totalNetPremium',
    label: 'text.totalNetPremium',
  },
  {
    id: 'documentsStatus',
    label: 'text.documentStatus',
  },
  {
    id: 'qcStatus',
    label: 'text.qcStatus',
  },
  {
    id: 'submissionStatus',
    label: 'text.submissionStatus',
  },
  {
    id: 'approvalStatus',
    label: 'text.approvalStatus',
  },
  {
    id: 'leadSource',
    label: 'text.leadSource',
  },
];

export const columnDocumentsQC: Column[] = [
  {
    id: 'orderId',
    label: 'leadDetailFields.orderId',
  },
  {
    id: 'assignedTo',
    label: 'text.assignedTo',
  },
  {
    id: 'customer',
    label: 'text.customer',
  },
  {
    id: 'website',
    label: 'text.website',
  },
  {
    id: 'paymentTerms',
    label: 'text.paymentTerms',
  },
  {
    id: 'paymentStatus',
    label: 'text.paymentStatus',
  },
  {
    id: 'totalNetPremium',
    label: 'text.totalNetPremium',
  },
  {
    id: 'documentsStatus',
    label: 'text.documentStatus',
  },
  {
    id: 'qcStatus',
    label: 'text.qcStatus',
  },
  {
    id: 'submissionStatus',
    label: 'text.submissionStatus',
  },
  {
    id: 'approvalStatus',
    label: 'text.approvalStatus',
  },
  {
    id: 'leadSource',
    label: 'text.leadSource',
  },
];

export const columnApproval: Column[] = [
  {
    id: 'policyId',
    label: 'text.policyId',
  },
  {
    id: 'assignedTo',
    label: 'text.assignedTo',
  },
  {
    id: 'insuranceCategory',
    label: 'text.insuranceCategory',
  },

  {
    id: 'productType',
    label: 'text.productType',
  },
  {
    id: 'insurerSearchLabel',
    label: 'package.insurerSearchLabel',
  },
  {
    id: 'customerPolicyholder',
    label: 'text.customerPolicyholder',
  },
  {
    id: 'totalNetPremium',
    label: 'text.totalNetPremium',
  },
  {
    id: 'paymentTerms',
    label: 'text.paymentTerms',
  },
  {
    id: 'paymentStatus',
    label: 'text.paymentStatus',
  },
  {
    id: 'documentStatus',
    label: 'text.documentStatus',
  },
  {
    id: 'qcStatus',
    label: 'text.qcStatus',
  },
  {
    id: 'submissionStatus',
    label: 'text.submissionStatus',
  },
  {
    id: 'approvalStatus',
    label: 'text.approvalStatus',
  },
];

export const productColumnSettings: Column[] = [
  {
    id: 'policyRef',
    label: 'text.policyId',
  },
  {
    id: 'policyHolder',
    label: 'text.policyholder',
    align: 'center',
  },
  {
    id: 'productType',
    label: 'text.productType',
  },
  {
    id: 'insurer',
    label: 'text.insurer',
  },
  {
    id: 'premium',
    label: 'text.netPremium',
    align: 'right',
  },
  {
    id: 'documentsStatus',
    label: 'text.documentStatus',
  },
  {
    id: 'qcStatus',
    label: 'text.qcStatus',
  },
  {
    id: 'submissionStatus',
    label: 'text.submissionStatus',
  },
  {
    id: 'approvalStatus',
    label: 'text.approvalStatus',
  },
];

export const summaryOrderColumnSettings: Column[] = [
  { id: 'subtotal', label: 'text.subTotal', value: '13,350' },
  { id: 'voucherDiscount', label: 'text.voucherDiscount', value: '1,200' },
  { id: 'total', label: 'text.total', value: '12,150' },
];

export const orders: Order[] = [
  {
    id: 'f63a33ec-6a30-4b89-af28-c1287bf2d834',
    orderId: 'O111197',
    customer: 'John Doe',
    website: 'Motor',
    paymentTerms: 'One-time',
    paymentStatus: { label: 'Paid', status: 'success' },
    totalNetPremium: '2,000',
    documentsStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    qcStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    submissionStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    approvalStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    leadSource: 'Facebook',
    isStar: false,
    products: [
      {
        policyRef: 'O324562_1',
        policyHolder: 'John Doe',
        productType: 'Type 1',
        insurer: 'Viriyah Insurance',
        premium: '11,200',
        documentsStatus: { label: 'Pending', status: 'warning' },
        qcStatus: { label: 'Approved', status: 'success' },
        submissionStatus: { label: 'Rejected', status: 'danger' },
        approvalStatus: { label: 'Approved', status: 'success' },
      },
      {
        policyRef: 'O324562_2',
        policyHolder: 'John Doe',
        productType: 'Type 1',
        insurer: 'Viriyah Insurance',
        premium: '11,200',
        documentsStatus: { label: 'Pending', status: 'warning' },
        qcStatus: { label: 'Failed', status: 'danger' },
        submissionStatus: { label: 'Submitted', status: 'warning' },
        approvalStatus: { label: 'Approved', status: 'success' },
      },
    ],
    isChecked: false,
  },
  {
    id: 'f63a33ec-6a30-4b89-af28-c1287bf2d835',
    orderId: 'O111197',
    customer: 'John Doe',
    website: 'Car',
    paymentTerms: 'One-time',
    paymentStatus: { label: 'Paid', status: 'success' },
    totalNetPremium: '1,000',
    documentsStatus: { label: 'Complete', status: 'success', type: 'text' },
    qcStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    submissionStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    approvalStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    leadSource: 'Facebook',
    isStar: true,
    isChecked: true,
    products: [],
  },
  {
    id: 'f63a33ec-6a30-4b89-af28-c1287bf2d836',
    orderId: 'O111197',
    customer: 'John Doe',
    website: 'Motor',
    paymentTerms: 'One-time',
    paymentStatus: { label: 'Paid', status: 'success' },
    totalNetPremium: '2,500',
    documentsStatus: { label: 'Complete', status: 'success', type: 'text' },
    qcStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    submissionStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    approvalStatus: { label: 'In Progress', status: 'warning', type: 'text' },
    leadSource: 'Organic',
    isStar: true,
    isChecked: false,
    products: [],
  },
];

export const approvalList: Approval[] = [
  {
    id: 'f63a33ec-6a30-4b89-af28-c1287bf2d835',
    policyId: 'O324560-1',
    assignedTo: '-',
    createdOn: '02/08/2020 (6:13:39 PM)',
    insuranceCategory: 'Motor Insurance',
    productType: 'Type 1',
    insurerSearchLabel: 'Viriyah Insurance',
    customerPolicyholder: 'Juliette  Cassandre',
    totalNetPremium: '20,000',
    paymentTerms: 'One-time',
    paymentStatus: { label: 'Paid', status: 'success' },
    documentStatus: { label: 'Pending', status: 'warning' },
    qcStatus: { label: 'Pre-Approved', status: 'warning' },
    submissionStatus: { label: 'Pre-Submitted', status: 'warning' },
    approvalStatus: { label: 'Unassigned', status: 'normal' },
    isStar: true,
    isChecked: false,
  },
  {
    id: 'f63a33ec-6a30-4b89-af28-c1287bf2d835',
    policyId: 'O324560-1',
    assignedTo: 'Amorn Kunok',
    createdOn: '02/08/2020 (6:13:39 PM)',
    insuranceCategory: 'Motor Insurance',
    productType: 'Type 1',
    insurerSearchLabel: 'Viriyah Insurance',
    customerPolicyholder: 'Juliette  Cassandre',
    totalNetPremium: '20,000',
    paymentTerms: 'One-time',
    paymentStatus: { label: 'Paid', status: 'success' },
    documentStatus: { label: 'Pending', status: 'warning' },
    qcStatus: { label: 'Pre-Approved', status: 'warning' },
    submissionStatus: { label: 'Pre-Submitted', status: 'warning' },
    approvalStatus: { label: 'Unassigned', status: 'normal' },
    isStar: true,
    isChecked: false,
  },
  {
    id: 'f63a33ec-6a30-4b89-af28-c1287bf2d835',
    policyId: 'O324560-1',
    assignedTo: 'Amorn Kunok',
    createdOn: '02/08/2020 (6:13:39 PM)',
    insuranceCategory: 'Motor Insurance',
    productType: 'Type 1',
    insurerSearchLabel: 'Viriyah Insurance',
    customerPolicyholder: 'Juliette  Cassandre',
    totalNetPremium: '20,000',
    paymentTerms: 'One-time',
    paymentStatus: { label: 'Paid', status: 'success' },
    documentStatus: { label: 'Pending', status: 'warning' },
    qcStatus: { label: 'Pre-Approved', status: 'warning' },
    submissionStatus: { label: 'Pre-Submitted', status: 'warning' },
    approvalStatus: { label: 'Unassigned', status: 'normal' },
    isStar: false,
    isChecked: true,
  },
];

export const DEFAULT_PER_PAGE_TABLE = 15;

export const initialPageState: IPageState = {
  currentPage: 1,
  pageSize: 15,
};

const getRandomWarningLbl = (hasPartial = false) => {
  const warningLbls = ['', 'Cancelled'];
  if (hasPartial) warningLbls.push('Partially Cancelled');
  return warningLbls[Math.floor(Math.random() * warningLbls.length)];
};

export const documentOrders: Order[] = [1, 2, 3].map((document: number) => ({
  id: `f63a33ec-6a30-4b89-af28-c1287bf2d836-${document}`,
  orderId: 'O111197',
  assignedTo: 'Amorn Kunok',
  customer: 'John Doe',
  website: 'Motor',
  paymentTerms: 'One-time',
  paymentStatus: { label: 'Paid', status: 'success' },
  totalNetPremium: '2,500',
  documentsStatus: { label: 'Unassigned', status: 'normal', type: 'text' },
  qcStatus: { label: 'In Progress', status: 'warning', type: 'text' },
  submissionStatus: { label: 'In Progress', status: 'warning', type: 'text' },
  approvalStatus: { label: 'In Progress', status: 'warning', type: 'text' },
  leadSource: 'Organic',
  isStar: true,
  isChecked: false,
  warningLbl: getRandomWarningLbl(true),
  products: [
    {
      policyRef: 'O324562_2',
      policyHolder: 'John Doe',
      productType: 'Type 1',
      insurer: 'Viriyah Insurance',
      premium: '11,200',
      documentsStatus: { label: 'Pending', status: 'warning' },
      qcStatus: { label: 'Failed', status: 'danger' },
      submissionStatus: { label: 'Submitted', status: 'warning' },
      approvalStatus: { label: 'Approved', status: 'success' },
      warningLbl: getRandomWarningLbl(),
    },
  ],
}));

export const QCOrders: Order[] = [1, 2, 3, 4].map((document: number) => ({
  id: `f63a33ec-6a30-4b89-af28-c1287bf2d836-${document}`,
  orderId: 'O111197',
  assignedTo: 'Paranwe B',
  customer: 'John Doe',
  website: 'Motor',
  paymentTerms: 'One-time',
  paymentStatus: { label: 'Paid', status: 'success' },
  totalNetPremium: '2,500',
  documentsStatus: { label: 'Unassigned', status: 'normal', type: 'text' },
  qcStatus: { label: 'In Progress', status: 'warning', type: 'text' },
  submissionStatus: { label: 'In Progress', status: 'warning', type: 'text' },
  approvalStatus: { label: 'In Progress', status: 'warning', type: 'text' },
  leadSource: 'Organic',
  isStar: true,
  isChecked: false,
  warningLbl: getRandomWarningLbl(true),
  products: [
    {
      policyRef: 'O324562_2',
      policyHolder: 'John Doe',
      productType: 'Type 1',
      insurer: 'Viriyah Insurance',
      premium: '11,200',
      documentsStatus: { label: 'Pending', status: 'warning' },
      qcStatus: { label: 'Failed', status: 'danger' },
      submissionStatus: { label: 'Submitted', status: 'warning' },
      approvalStatus: { label: 'Approved', status: 'success' },
      warningLbl: getRandomWarningLbl(),
    },
  ],
}));

export const formatDocumentStatus = (status: string | undefined) => {
  switch (status) {
    case 'DOCUMENT_STATUS_UNSPECIFIED':
      return {
        label: DocumentStatus.DOCUMENT_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
    case 'DOCUMENT_STATUS_PENDING':
      return {
        label: DocumentStatus.DOCUMENT_STATUS_PENDING,
        status: 'normal',
        type: 'text',
      };
    case 'DOCUMENT_STATUS_COMPLETE':
      return {
        label: DocumentStatus.DOCUMENT_STATUS_COMPLETE,
        status: 'success',
        type: 'text',
      };
    case 'DOCUMENT_STATUS_FAILED':
      return {
        label: DocumentStatus.DOCUMENT_STATUS_FAILED,
        status: 'danger',
        type: 'text',
      };
    default:
      return {
        label: DocumentStatus.DOCUMENT_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
  }
};

export const formatQCStatus = (status: string | undefined) => {
  switch (status) {
    case 'QC_STATUS_UNSPECIFIED':
      return {
        label: QCStatus.QC_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
    case 'QC_STATUS_PENDING':
      return {
        label: QCStatus.QC_STATUS_PENDING,
        status: 'normal',
        type: 'text',
      };
    case 'QC_STATUS_PREAPPROVED':
      return {
        label: QCStatus.QC_STATUS_PREAPPROVED,
        status: 'success',
        type: 'text',
      };
    case 'QC_STATUS_APPROVED':
      return {
        label: QCStatus.QC_STATUS_APPROVED,
        status: 'success',
        type: 'text',
      };
    case 'QC_STATUS_REJECTED':
      return {
        label: QCStatus.QC_STATUS_REJECTED,
        status: 'danger',
        type: 'text',
      };
    case 'QC_STATUS_CRITICAL_ISSUES':
      return {
        label: QCStatus.QC_STATUS_CRITICAL_ISSUES,
        status: 'danger',
        type: 'text',
      };
    case 'QC_STATUS_ISSUE_FIXED':
      return {
        label: QCStatus.QC_STATUS_ISSUE_FIXED,
        status: 'success',
        type: 'text',
      };
    default:
      return {
        label: QCStatus.QC_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
  }
};

export const formatSubmissionStatus = (status: string | undefined) => {
  switch (status) {
    case 'SUBMISSION_STATUS_UNSPECIFIED':
      return {
        label: SubmissionStatus.SUBMISSION_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
    case 'SUBMISSION_STATUS_PENDING':
      return {
        label: SubmissionStatus.SUBMISSION_STATUS_PENDING,
        status: 'normal',
        type: 'text',
      };
    case 'SUBMISSION_STATUS_PRESUBMITTED':
      return {
        label: SubmissionStatus.SUBMISSION_STATUS_PRESUBMITTED,
        status: 'success',
        type: 'text',
      };
    case 'SUBMISSION_STATUS_SUBMITTED':
      return {
        label: SubmissionStatus.SUBMISSION_STATUS_SUBMITTED,
        status: 'success',
        type: 'text',
      };
    default:
      return {
        label: SubmissionStatus.SUBMISSION_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
  }
};

export const formatApprovalStatus = (status: string | undefined) => {
  switch (status) {
    case 'APPROVAL_STATUS_UNSPECIFIED':
      return {
        label: ApprovalStatus.APPROVAL_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
    case 'APPROVAL_STATUS_PENDING':
      return {
        label: ApprovalStatus.APPROVAL_STATUS_PENDING,
        status: 'normal',
        type: 'text',
      };
    case 'APPROVAL_STATUS_APPROVED':
      return {
        label: ApprovalStatus.APPROVAL_STATUS_APPROVED,
        status: 'success',
        type: 'text',
      };
    case 'APPROVAL_STATUS_REJECTED':
      return {
        label: ApprovalStatus.APPROVAL_STATUS_REJECTED,
        status: 'danger',
        type: 'text',
      };
    case 'APPROVAL_STATUS_ENDORSEMENT':
      return {
        label: ApprovalStatus.APPROVAL_STATUS_ENDORSEMENT,
        status: 'success',
        type: 'text',
      };
    case 'APPROVAL_STATUS_PROBLEM':
      return {
        label: ApprovalStatus.APPROVAL_STATUS_PROBLEM,
        status: 'danger',
        type: 'text',
      };
    default:
      return {
        label: ApprovalStatus.APPROVAL_STATUS_UNSPECIFIED,
        status: 'warning',
        type: 'text',
      };
  }
};

export const formatMotoType = (type: string | undefined) => {
  switch (type) {
    case MotoTypes.MOTOR_TYPE_1:
      return getString('motoType.type1');
    case MotoTypes.MOTOR_TYPE_2:
      return getString('motoType.type2');
    case MotoTypes.MOTOR_TYPE_2_PLUS:
      return getString('motoType.type2Plus');
    case MotoTypes.MOTOR_TYPE_3:
      return getString('motoType.type3');
    case MotoTypes.MOTOR_TYPE_3_PLUS:
      return getString('motoType.type3Plus');
    default:
      return '';
  }
};

export const formatOrderItem = (item: ProductItem, policyHolder: any) => ({
  ...item,
  policyHolder: `${policyHolder?.firstName} ${policyHolder?.lastName}`,
  productType: formatMotoType(item?.motorItemType),
  premium: item?.grossPremium,
  documentsStatus: formatDocumentStatus(item?.documentStatus),
  qcStatus: formatQCStatus(item?.qcStatus),
  submissionStatus: formatSubmissionStatus(item?.submissionStatus),
  approvalStatus: formatApprovalStatus(item?.approvalStatus),
  // Mock the following data
  warningLbl: 'Cancelled',
  policyRef: 'O324562_2',
  insurer: 'Viriyah Insurance',
});

export const getAgentName = (agent: any) => {
  if (!agent) {
    return '';
  }
  return `${agent.firstName} ${agent.lastName}`;
};

export const formatCustomerName = ({
  firstName = '',
  lastName = '',
}: CustomerIProps) => {
  if (!firstName && !lastName) {
    // Mock name
    return 'Rikesh Shrestha';
  }
  return `${firstName} ${lastName}`.trim();
};

export const formatOrderDocuments = (
  listOrderDocuments: any[],
  agentName: string
) =>
  listOrderDocuments.map((item: any) => ({
    id: item.order.name,
    orderId: item.order.humanId,
    customer: formatCustomerName(item.customer),
    documentsStatus: formatDocumentStatus(item.order.documentStatus),
    qcStatus: formatQCStatus(item.order.qcStatus),
    submissionStatus: formatSubmissionStatus(item.order.submissionStatus),
    approvalStatus: formatApprovalStatus(item.order.approvalStatus),
    products: item.items?.map((productItem: ProductItem) =>
      formatOrderItem(productItem, item?.order?.data?.policyHolder)
    ),
    assignedTo: getAgentName(item[agentName]),
    // Mock some fields
    website: 'Motor',
    paymentTerms: 'One-time',
    paymentStatus: { label: 'Paid', status: 'success' },
    totalNetPremium: '2,000',
    leadSource: 'Facebook',
    isStar: false,
    isChecked: false,
  }));

export const formatNumber = (total: string) => {
  return Number(total);
};
