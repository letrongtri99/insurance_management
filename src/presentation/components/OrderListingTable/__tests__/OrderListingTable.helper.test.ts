import {
  DocumentStatus,
  QCStatus,
  SubmissionStatus,
  ApprovalStatus,
  MotoTypes,
} from 'shared/constants/orderType';
import OrdersAllReducer, {
  formatOrdersAll,
} from 'presentation/redux/reducers/orders/all';
import OrdersDocumentReducer from 'presentation/redux/reducers/orders/documents';
import {
  formatDocumentStatus,
  formatQCStatus,
  formatSubmissionStatus,
  formatApprovalStatus,
  formatMotoType,
  formatOrderItem,
  formatOrderDocuments,
  formatNumber,
  getAgentName,
  formatCustomerName,
} from '../helper';

const documentInputs = [
  'DOCUMENT_STATUS_UNSPECIFIED',
  'DOCUMENT_STATUS_PENDING',
  'DOCUMENT_STATUS_COMPLETE',
  'DOCUMENT_STATUS_FAILED',
  'Others',
  undefined,
];

const documentOutputs = [
  {
    label: DocumentStatus.DOCUMENT_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
  {
    label: DocumentStatus.DOCUMENT_STATUS_PENDING,
    status: 'normal',
    type: 'text',
  },
  {
    label: DocumentStatus.DOCUMENT_STATUS_COMPLETE,
    status: 'success',
    type: 'text',
  },
  {
    label: DocumentStatus.DOCUMENT_STATUS_FAILED,
    status: 'danger',
    type: 'text',
  },
  {
    label: DocumentStatus.DOCUMENT_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
];

[0, 1, 2, 3, 4].forEach((index: number) => {
  test(`Test formatDocumentStatus return correct value ${index}`, () => {
    expect(formatDocumentStatus(documentInputs[index])).toEqual(
      documentOutputs[index]
    );
  });
});

const qcInputs = [
  'QC_STATUS_UNSPECIFIED',
  'QC_STATUS_PENDING',
  'QC_STATUS_PREAPPROVED',
  'QC_STATUS_APPROVED',
  'QC_STATUS_REJECTED',
  'QC_STATUS_CRITICAL_ISSUES',
  'QC_STATUS_ISSUE_FIXED',
  'Other',
  undefined,
];

const qcOutputs = [
  {
    label: QCStatus.QC_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_PENDING,
    status: 'normal',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_PREAPPROVED,
    status: 'success',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_APPROVED,
    status: 'success',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_REJECTED,
    status: 'danger',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_CRITICAL_ISSUES,
    status: 'danger',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_ISSUE_FIXED,
    status: 'success',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
  {
    label: QCStatus.QC_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
];

[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((index: number) => {
  test(`Test formatQCStatus return correct value ${index}`, () => {
    expect(formatQCStatus(qcInputs[index])).toEqual(qcOutputs[index]);
  });
});

const submissionInputs = [
  'SUBMISSION_STATUS_UNSPECIFIED',
  'SUBMISSION_STATUS_PENDING',
  'SUBMISSION_STATUS_PRESUBMITTED',
  'SUBMISSION_STATUS_SUBMITTED',
  'Other',
  undefined,
];

const submissionOutputs = [
  {
    label: SubmissionStatus.SUBMISSION_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
  {
    label: SubmissionStatus.SUBMISSION_STATUS_PENDING,
    status: 'normal',
    type: 'text',
  },
  {
    label: SubmissionStatus.SUBMISSION_STATUS_PRESUBMITTED,
    status: 'success',
    type: 'text',
  },
  {
    label: SubmissionStatus.SUBMISSION_STATUS_SUBMITTED,
    status: 'success',
    type: 'text',
  },
  {
    label: SubmissionStatus.SUBMISSION_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
  {
    label: SubmissionStatus.SUBMISSION_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
];

[0, 1, 2, 3, 4, 5].forEach((index: number) => {
  test(`Test formatSubmissionStatus return correct value ${index}`, () => {
    expect(formatSubmissionStatus(submissionInputs[index])).toEqual(
      submissionOutputs[index]
    );
  });
});

const approvalInputs = [
  'APPROVAL_STATUS_UNSPECIFIED',
  'APPROVAL_STATUS_PENDING',
  'APPROVAL_STATUS_APPROVED',
  'APPROVAL_STATUS_REJECTED',
  'APPROVAL_STATUS_ENDORSEMENT',
  'APPROVAL_STATUS_PROBLEM',
  'Other',
  undefined,
];

const approvalOutputs = [
  {
    label: ApprovalStatus.APPROVAL_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
  {
    label: ApprovalStatus.APPROVAL_STATUS_PENDING,
    status: 'normal',
    type: 'text',
  },
  {
    label: ApprovalStatus.APPROVAL_STATUS_APPROVED,
    status: 'success',
    type: 'text',
  },
  {
    label: ApprovalStatus.APPROVAL_STATUS_REJECTED,
    status: 'danger',
    type: 'text',
  },
  {
    label: ApprovalStatus.APPROVAL_STATUS_ENDORSEMENT,
    status: 'success',
    type: 'text',
  },
  {
    label: ApprovalStatus.APPROVAL_STATUS_PROBLEM,
    status: 'danger',
    type: 'text',
  },
  {
    label: ApprovalStatus.APPROVAL_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
  {
    label: ApprovalStatus.APPROVAL_STATUS_UNSPECIFIED,
    status: 'warning',
    type: 'text',
  },
];

[0, 1, 2, 3, 4, 5, 6, 7].forEach((index: number) => {
  test(`Test formatApprovalStatus return correct value ${index}`, () => {
    expect(formatApprovalStatus(approvalInputs[index])).toEqual(
      approvalOutputs[index]
    );
  });
});

const motoTypeInput = [
  MotoTypes.MOTOR_TYPE_1,
  MotoTypes.MOTOR_TYPE_2,
  MotoTypes.MOTOR_TYPE_2_PLUS,
  MotoTypes.MOTOR_TYPE_3,
  MotoTypes.MOTOR_TYPE_3_PLUS,
  '',
];

const motoTypeOutput = [
  'motoType.type1',
  'motoType.type2',
  'motoType.type2Plus',
  'motoType.type3',
  'motoType.type3Plus',
  '',
];

[0, 1, 2, 3, 4, 5].forEach((index: number) => {
  test(`Test formatMotoType return correct value ${index}`, () => {
    expect(formatMotoType(motoTypeInput[index])).toEqual(motoTypeOutput[index]);
  });
});

test('Test formatOrderItem return correct value', () => {
  const input1 = {
    addons: [],
    approvalStatus: 'ITEM_APPROVAL_STATUS_UNSPECIFIED',
    discounts: [],
    documentStatus: 'ITEM_DOCUMENT_STATUS_UNSPECIFIED',
    grossPremium: '2323232',
    motorItemType: 'MOTOR_TYPE_2_PLUS',
    name: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5/items/851a867b-d8ba-4116-8828-0c6efa83ca49',
    netPremium: '0',
    package: 'package/232323232',
    price: '232323',
    product: 'products/car-insurance',
    qcStatus: 'ITEM_QC_STATUS_UNSPECIFIED',
    stampDuty: '0',
    stampDutyPercentage: 0,
    submissionStatus: 'ITEM_SUBMISSION_STATUS_UNSPECIFIED',
    vatAmount: '223232323',
    vatPercent: 0,
  };
  const input2 = {
    firstName: 'Rikesh',
    gender: 'm',
    lastName: 'Shrestha',
    title: 'Mr.',
  };
  const output = {
    ...input1,
    policyHolder: 'Rikesh Shrestha',
    productType: formatMotoType(input1?.motorItemType),
    premium: input1?.grossPremium,
    documentsStatus: formatDocumentStatus(input1?.documentStatus),
    qcStatus: formatQCStatus(input1?.qcStatus),
    submissionStatus: formatSubmissionStatus(input1?.submissionStatus),
    approvalStatus: formatApprovalStatus(input1?.approvalStatus),
    warningLbl: 'Cancelled',
    policyRef: 'O324562_2',
    insurer: 'Viriyah Insurance',
  };
  expect(formatOrderItem(input1, input2)).toEqual(output);
});

test('Test formatOrderDocuments return correct value', () => {
  const input = [
    {
      order: {
        name: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5',
        lead: '',
        createTime: '2021-10-01T03:03:26.162808Z',
        updateTime: '2021-10-14T02:58:11.548918Z',
        convertBy: '',
        supervisor: '',
        isCancelled: false,
        product: 'products/car-insurance',
        invoicePrice: '2323',
        humanId: 'O70',
        discounts: [],
        payment: '',
        customer: 'customers/887f0e75-50cf-47a0-84b7-d7b348d4de25',
        schema: 'orderSchemas/a85f07e5-071f-460d-842c-aa9e37edbed2',
        data: {
          carDashCam: true,
          carModified: false,
          carSubModelYear: 2,
          carUsageType: 'personal',
          chassisNumber: 'CH1212121212',
          convertBy: 'users/1ca66baf-8266-4f85-9adf-cb1860089bdb',
          engineNumber: 'EN121212121',
          policyHolder: {
            firstName: 'Rikesh',
            gender: 'm',
            lastName: 'Shrestha',
            title: 'Mr.',
          },
          registeredProvince: 22222,
        },
        documentBy: '',
        documentStatus: 'DOCUMENT_STATUS_INPROGRESS',
        qcBy: '',
        qcStatus: 'QC_STATUS_PARTIALLY_REJECTED',
        submissionStatus: 'SUBMISSION_STATUS_UNSPECIFIED',
        approvalStatus: 'APPROVAL_STATUS_UNSPECIFIED',
      },
      customer: {
        name: 'customers/887f0e75-50cf-47a0-84b7-d7b348d4de25',
        createTime: '2021-09-30T07:08:50.984376552Z',
        updateTime: '2021-09-30T07:08:50.984376552Z',
        deleteTime: null,
        createBy: 'users/be9bd8fe-2193-41f1-8c24-a7e1417f38ff',
        humanId: 'C43',
        firstName: 'Rikesh',
        lastName: 'Shrestha',
        email: '',
        phone: '+66943739024',
      },
      items: [
        {
          name: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5/items/851a867b-d8ba-4116-8828-0c6efa83ca49',
          product: 'products/car-insurance',
          package: 'package/232323232',
          price: '232323',
          grossPremium: '2323232',
          netPremium: '0',
          vatPercent: 0,
          vatAmount: '223232323',
          stampDutyPercentage: 0,
          stampDuty: '0',
          addons: [],
          documentStatus: 'ITEM_DOCUMENT_STATUS_UNSPECIFIED',
          qcStatus: 'ITEM_QC_STATUS_UNSPECIFIED',
          submissionStatus: 'ITEM_SUBMISSION_STATUS_UNSPECIFIED',
          approvalStatus: 'ITEM_APPROVAL_STATUS_UNSPECIFIED',
          discounts: [],
          motorItemType: 'MOTOR_TYPE_2_PLUS',
        },
      ],
    },
  ];
  const output = [
    {
      approvalStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      customer: 'Rikesh Shrestha',
      documentsStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      id: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5',
      orderId: 'O70',
      products: [
        {
          addons: [],
          approvalStatus: {
            label: 'Unassigned',
            status: 'warning',
            type: 'text',
          },
          discounts: [],
          documentStatus: 'ITEM_DOCUMENT_STATUS_UNSPECIFIED',
          documentsStatus: {
            label: 'Unassigned',
            status: 'warning',
            type: 'text',
          },
          grossPremium: '2323232',
          insurer: 'Viriyah Insurance',
          motorItemType: 'MOTOR_TYPE_2_PLUS',
          name: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5/items/851a867b-d8ba-4116-8828-0c6efa83ca49',
          netPremium: '0',
          package: 'package/232323232',
          policyHolder: 'Rikesh Shrestha',
          policyRef: 'O324562_2',
          premium: '2323232',
          price: '232323',
          product: 'products/car-insurance',
          productType: 'motoType.type2Plus',
          qcStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
          stampDuty: '0',
          stampDutyPercentage: 0,
          submissionStatus: {
            label: 'Unassigned',
            status: 'warning',
            type: 'text',
          },
          vatAmount: '223232323',
          vatPercent: 0,
          warningLbl: 'Cancelled',
        },
      ],
      qcStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      submissionStatus: {
        label: 'Unassigned',
        status: 'warning',
        type: 'text',
      },
      assignedTo: '',
      website: 'Motor',
      paymentTerms: 'One-time',
      paymentStatus: { label: 'Paid', status: 'success' },
      totalNetPremium: '2,000',
      leadSource: 'Facebook',
      isStar: false,
      isChecked: false,
    },
  ];
  expect(formatOrderDocuments(input, 'documentAgent')).toEqual(output);
});

test('Test format order all successfully in 1st case', () => {
  const exampleListOrder = [
    {
      order: {
        name: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5',
        lead: '',
        createTime: '2021-10-01T03:03:26.162808Z',
        updateTime: '2021-10-14T02:58:11.548918Z',
        convertBy: '',
        supervisor: '',
        isCancelled: false,
        product: 'products/car-insurance',
        invoicePrice: '2323',
        humanId: 'O70',
        discounts: [],
        payment: '',
        customer: 'customers/887f0e75-50cf-47a0-84b7-d7b348d4de25',
        schema: 'orderSchemas/a85f07e5-071f-460d-842c-aa9e37edbed2',
        data: {
          carDashCam: true,
          carModified: false,
          carSubModelYear: 2,
          carUsageType: 'personal',
          chassisNumber: 'CH1212121212',
          convertBy: 'users/1ca66baf-8266-4f85-9adf-cb1860089bdb',
          engineNumber: 'EN121212121',
          policyHolder: {
            firstName: 'Rikesh',
            gender: 'm',
            lastName: 'Shrestha',
            title: 'Mr.',
          },
          registeredProvince: 22222,
        },
        documentBy: '',
        documentStatus: 'DOCUMENT_STATUS_INPROGRESS',
        qcBy: '',
        qcStatus: 'QC_STATUS_PARTIALLY_REJECTED',
        submissionStatus: 'SUBMISSION_STATUS_UNSPECIFIED',
        approvalStatus: 'APPROVAL_STATUS_UNSPECIFIED',
      },
      customer: {
        name: 'customers/887f0e75-50cf-47a0-84b7-d7b348d4de25',
        createTime: '2021-09-30T07:08:50.984376552Z',
        updateTime: '2021-09-30T07:08:50.984376552Z',
        deleteTime: null,
        createBy: 'users/be9bd8fe-2193-41f1-8c24-a7e1417f38ff',
        humanId: 'C43',
        firstName: 'Rikesh',
        lastName: 'Shrestha',
        email: '',
        phone: '+66943739024',
      },
      items: [
        {
          name: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5/items/851a867b-d8ba-4116-8828-0c6efa83ca49',
          product: 'products/car-insurance',
          package: 'package/232323232',
          price: '232323',
          grossPremium: '2323232',
          netPremium: '0',
          vatPercent: 0,
          vatAmount: '223232323',
          stampDutyPercentage: 0,
          stampDuty: '0',
          addons: [],
          documentStatus: 'ITEM_DOCUMENT_STATUS_UNSPECIFIED',
          qcStatus: 'ITEM_QC_STATUS_UNSPECIFIED',
          submissionStatus: 'ITEM_SUBMISSION_STATUS_UNSPECIFIED',
          approvalStatus: 'ITEM_APPROVAL_STATUS_UNSPECIFIED',
          discounts: [],
          motorItemType: 'MOTOR_TYPE_2_PLUS',
        },
      ],
    },
  ];

  const outputFormatOrderAll = [
    {
      id: '3b9622cf-b4c9-4fd7-8952-aa629d36d3d5',
      orderId: 'O70',
      customer: 'Rikesh Shrestha',
      website: 'Motor',
      paymentTerms: 'One-time',
      paymentStatus: { label: 'Paid', status: 'success' },
      totalNetPremium: '2,000',
      documentsStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      qcStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      submissionStatus: {
        label: 'Unassigned',
        status: 'warning',
        type: 'text',
      },
      approvalStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      leadSource: 'Facebook',
      isStar: false,
      products: [
        {
          addons: [],
          approvalStatus: {
            label: 'Unassigned',
            status: 'warning',
            type: 'text',
          },
          discounts: [],
          documentStatus: 'ITEM_DOCUMENT_STATUS_UNSPECIFIED',
          documentsStatus: {
            label: 'Unassigned',
            status: 'warning',
            type: 'text',
          },
          grossPremium: '2323232',
          insurer: 'Viriyah Insurance',
          motorItemType: 'MOTOR_TYPE_2_PLUS',
          name: 'orders/3b9622cf-b4c9-4fd7-8952-aa629d36d3d5/items/851a867b-d8ba-4116-8828-0c6efa83ca49',
          netPremium: '0',
          package: 'package/232323232',
          policyHolder: 'Rikesh Shrestha',
          policyRef: 'O324562_2',
          premium: '2323232',
          price: '232323',
          product: 'products/car-insurance',
          productType: 'motoType.type2Plus',
          qcStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
          stampDuty: '0',
          stampDutyPercentage: 0,
          submissionStatus: {
            label: 'Unassigned',
            status: 'warning',
            type: 'text',
          },
          vatAmount: '223232323',
          vatPercent: 0,
          warningLbl: 'Cancelled',
        },
      ],
      isChecked: false,
    },
  ];
  expect(formatOrdersAll(exampleListOrder)).toEqual(outputFormatOrderAll);
});

test('Test format number total', () => {
  const number = '28';
  expect(formatNumber(number)).toEqual(28);
});

test('Test order all successfully', () => {
  const state = {
    data: [],
    isFetching: false,
    success: true,
    status: '',
    totalItem: 0,
    tableType: '',
    pageState: {
      pageSize: 15,
      currentPage: 1,
    },
  };
  const action = {
    type: '[Order] GET_ORDERS_ALL_SUCCESS ',
    payload: {
      data: {
        orders: [],
        total: 10,
      },
    },
  };

  const result = {
    tableType: '',
    pageState: {
      pageSize: 15,
      currentPage: 1,
    },
    data: [],
    status: '',
    success: true,
    isFetching: false,
    totalItem: 10,
  };
  expect(OrdersAllReducer(state, action)).toEqual(result);
});

test('Test reducer order document successfully', () => {
  const state = {
    data: [],
    isFetching: false,
    success: true,
    status: '',
    totalItem: 0,
    tableType: '',
    pageState: {
      pageSize: 15,
      currentPage: 1,
    },
  };
  const action = {
    type: '[Order] GET_ORDERS_DOCUMENTS_SUCCESS ',
    payload: {
      data: {
        orders: [],
        total: '15',
      },
    },
  };

  const result = {
    tableType: '',
    pageState: {
      pageSize: 15,
      currentPage: 1,
    },
    data: [],
    status: '',
    success: true,
    isFetching: false,
    totalItem: 15,
  };
  expect(OrdersDocumentReducer(state, action)).toEqual(result);
});

test('Test getAgentName run well 1st', () => {
  expect(getAgentName(null)).toEqual('');
});

test('Test getAgentName run well 2nd', () => {
  expect(
    getAgentName({
      firstName: 'Duy',
      lastName: 'Nguyen',
    })
  ).toEqual('Duy Nguyen');
});

test('Test formatCustomerName run well 1st', () => {
  expect(
    formatCustomerName({
      firstName: '',
      lastName: '',
    })
  ).toEqual('Rikesh Shrestha');
});

test('Test formatCustomerName run well 2nd', () => {
  expect(
    formatCustomerName({
      firstName: 'Duy',
      lastName: 'Nguyen',
    })
  ).toEqual('Duy Nguyen');
});
