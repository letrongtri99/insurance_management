interface IMessageUserMockData {
  status: string;
  leadReference: string;
  customerName: string;
}

export interface IPropsMessageModal {
  openDialog: boolean;
  closeDialog: (isClose: boolean) => void;
  data: any;
  attachment: any;
  currentCustomer: any;
}

export const initialId = '-1';

export const initialMailData = {
  name: '',
  subject: '',
  body: '',
  bodyText: '',
  createdBy: '',
  cc: [],
  emailIndex: 1,
  createTime: '',
  updateTime: '',
  deleteTime: '',
  type: '',
  parentId: '',
};

export interface IItemEmail {
  name: string;
  subject: string;
  cc: string[];
  body: string;
  bodyText: string;
  createdBy: string;
  emailIndex: number;
  createTime: string;
  updateTime: string;
  deleteTime: string;
  type: string;
  parentId: string;
}

export const fakeFromEmail = 'support@rabbit-staging.freshdesk.com';
export const fakeToEmail = 'Attila@rabbit.co.th';
export const fakeCcEmail = ['Malenee@rabbit.co.th', 'Alex@rabbit.co.th'];
export const fakeAttachments = [
  {
    title: 'HandBook- Guideline how to purchase motor insurance with rabbit',
    size: 931,
  },
  {
    title: 'HandBook- Guideline how to purchase motor insurance with rabbit',
    size: 931,
  },
];
export const fakeTemplate = 'Quote follow up';

export const listEmailFakeData = [
  {
    id: 1,
    template: 'Quote follow up',
    isInComing: true,
    subject: 'Rabbit Care order cancellation L768379',
    body: "Thank you for choosing Rabbit Care. Thailand's largest largest largest largest largest largest",
    createdAt: new Date().toISOString(),
    from: 'Siriwan@rabbit.co.th',
    to: 'Siriwo@gmail.com',
    cc: ['Malenee@gmail.com'],
    body_text: '',
    attachments: [
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
    ],
  },
  {
    id: 2,
    template: 'Quote follow up',
    isInComing: true,
    subject: 'Rabbit Care order cancellation L768380',
    body: "Thank you for choosing Rabbit Care. Thailand's largest largest largest largest largest largest",
    createdAt: new Date().toISOString(),
    from: 'Siriwan@rabbit.co.th',
    to: 'Siriwo@gmail.com',
    cc: ['Malenee@gmail.com'],
    body_text: '',
    attachments: [
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
    ],
  },
  {
    id: 3,
    template: 'Quote follow up',
    isInComing: true,
    subject: 'Rabbit Care order cancellation L768381',
    body: "Thank you for choosing Rabbit Care. Thailand's largest largest largest largest largest largest",
    createdAt: new Date().toISOString(),
    from: 'Siriwan@rabbit.co.th',
    to: 'Siriwo@gmail.com',
    cc: ['Malenee@gmail.com'],
    body_text: '',
    attachments: [
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
    ],
  },
  {
    id: 4,
    template: 'Quote follow up',
    isInComing: false,
    subject: 'Rabbit Care order cancellation L768382',
    body: "Thank you for choosing Rabbit Care. Thailand's largest largest largest largest largest largest",
    createdAt: new Date().toISOString(),
    from: 'Siriwan@rabbit.co.th',
    to: 'Siriwo@gmail.com',
    cc: ['Malenee@gmail.com'],
    body_text: '',
    attachments: [
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
    ],
  },
  {
    id: 5,
    template: 'Quote follow up',
    isInComing: true,
    subject: 'Rabbit Care order cancellation L768383',
    body: "Thank you for choosing Rabbit Care. Thailand's largest largest largest largest largest largest",
    createdAt: new Date().toISOString(),
    from: 'Siriwan@rabbit.co.th',
    to: 'Siriwo@gmail.com',
    cc: ['Malenee@gmail.com'],
    body_text: '',
    attachments: [
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
    ],
  },
  {
    id: 6,
    template: 'Quote follow up',
    isInComing: false,
    subject: 'Rabbit Care order cancellation L768384',
    body: "Thank you for choosing Rabbit Care. Thailand's largest largest largest largest largest largest",
    createdAt: new Date().toISOString(),
    from: 'Siriwan@rabbit.co.th',
    to: 'Siriwo@gmail.com',
    cc: ['Malenee@gmail.com', 'Vupham@gmail.com'],
    body_text: '',
    attachments: [
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
    ],
  },
  {
    id: 7,
    template: 'Quote follow up',
    isInComing: false,
    subject: 'Rabbit Care order cancellation L768385',
    body: "Thank you for choosing Rabbit Care. Thailand's largest largest largest largest largest largest",
    createdAt: new Date().toISOString(),
    from: 'Siriwan@rabbit.co.th',
    to: 'Siriwo@gmail.com',
    cc: ['Malenee@gmail.com'],
    body_text: '',
    attachments: [
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
      {
        title:
          'HandBook- Guideline how to purchase motor insurance with rabbit',
        size: 931,
      },
    ],
  },
];

export enum ReplyTypes {
  REPLY = 'REPLY',
  REPLY_ALL = 'REPLY_ALL',
}
