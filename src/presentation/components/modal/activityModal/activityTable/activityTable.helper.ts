import { getString } from 'presentation/theme/localization';

export const INITIAL_ITEM_PER_PAGE = 10;
export const ITEM_PER_PAGE_LIST = [10, 20];
export const FIRST_PAGE = 1;
export const LAST_PAGE = 3;

export interface IToken {
  page: number;
  token: string;
}

export const prevPageHandle = (listToken: IToken[], page: number) => {
  const findToken = listToken.find(
    (item: { page: number; token: string }) => item.page === page
  );
  return findToken;
};

export const listToken = [
  { token: '1', page: 1 },
  { token: '2', page: 2 },
  { token: '', page: 3 },
];

export const headerActivityData = [
  { id: 1, title: getString('text.noDots') },
  { id: 2, title: getString('text.name') },
  { id: 3, title: getString('text.date') },
  { id: 4, title: getString('text.status') },
  { id: 5, title: getString('text.summary') },
];

export const dataTableList = [
  {
    page: 1,
    nextPageTone: '2',
    data: [
      {
        sequenceNumber: 1,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 2,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 3,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 4,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 5,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 6,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 7,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 8,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 9,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 10,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
    ],
  },
  {
    page: 2,
    nextPageTone: '',
    data: [
      {
        sequenceNumber: 11,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 12,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 13,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 14,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 15,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 16,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 17,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 18,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 19,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 20,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
    ],
  },
  {
    page: 3,
    data: [
      {
        sequenceNumber: 21,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 22,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 23,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 24,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 25,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 26,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 27,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 28,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 29,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
      {
        sequenceNumber: 30,
        userName: 'Notha',
        date: new Date().toISOString(),
        status: 'Valid',
        summary: 'Sales pitch',
      },
    ],
  },
];

export const data1 = {
  data: [
    {
      sequenceNumber: 1,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 2,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 3,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 4,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 5,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 6,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 7,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 8,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 9,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
    {
      sequenceNumber: 10,
      userName: 'Notha',
      date: new Date().toISOString(),
      status: 'Valid',
      summary: 'Sales pitch',
    },
  ],
  pageToken: '1',
};
