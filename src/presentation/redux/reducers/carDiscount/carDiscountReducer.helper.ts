import { ITeam } from '../../../../shared/interfaces/common/admin/team';
import { IState } from '../../../../shared/interfaces/common';

interface IPageToken {
  page: number;
  token: string;
}

interface IPageState {
  pageIndex?: number;
  pageSize?: number;
  pageToken?: string;
  orderBy?: string[];
  showDeleted?: boolean;
  listPageToken?: IPageToken[];
  filter?: string | null;
}

export const fakeDataImportCarDiscount = [
  {
    importDate: '09/06/2021 (5:57:30 PM)',
    importFileName: 'File1.CSV',
    importStatus: 'Success',
    importedBy: 'Siri',
  },
  {
    importDate: '09/06/2021 (6:50:30 PM)',
    importFileName: 'File2.CSV',
    importStatus: 'Fail',
    importedBy: 'Siri',
    errors: [
      {
        rowNumber: 20,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 66,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 56,
        fieldName: 'RedBook Id',
        errorCode: 'TRANSIENT',
        message: 'invalid redbook id',
      },
    ],
  },
  {
    importDate: '09/06/2021 (5:57:30 PM)',
    importFileName: 'File1.CSV',
    importStatus: 'Success',
    importedBy: 'Siri',
  },
  {
    importDate: '09/06/2021 (6:50:30 PM)',
    importFileName: 'File2.CSV',
    importStatus: 'Fail',
    importedBy: 'Siri',
    errors: [
      {
        rowNumber: 1,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 1,
        fieldName: 'Date of Birth',
        errorCode: 'INVALID',
        message: 'WRONG FORMAT',
      },
      {
        rowNumber: 2,
        fieldName: 'RedBook Id',
        errorCode: 'TRANSIENT',
        message: 'invalid redbook id',
      },
    ],
  },
  {
    importDate: '09/06/2021 (5:57:30 PM)',
    importFileName: 'File1.CSV',
    importStatus: 'Success',
    importedBy: 'Siri',
  },
  {
    importDate: '09/06/2021 (6:50:30 PM)',
    importFileName: 'File2.CSV',
    importStatus: 'Fail',
    importedBy: 'Siri',
    errors: [
      {
        rowNumber: 1,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 2,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 2,
        fieldName: 'RedBook Id',
        errorCode: 'TRANSIENT',
        message: 'invalid redbook id',
      },
      {
        rowNumber: 3,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 4,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 5,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
    ],
  },
  {
    importDate: '09/06/2021 (5:57:30 PM)',
    importFileName: 'File1.CSV',
    importStatus: 'Success',
    importedBy: 'Siri',
  },
  {
    importDate: '09/06/2021 (6:50:30 PM)',
    importFileName: 'File2.CSV',
    importStatus: 'Fail',
    importedBy: 'Siri',
    errors: [
      {
        rowNumber: 103,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 205,
        fieldName: 'RedBook Id',
        errorCode: 'TRANSIENT',
        message: 'invalid redbook id',
      },
    ],
  },
  {
    importDate: '09/06/2021 (5:57:30 PM)',
    importFileName: 'File1.CSV',
    importStatus: 'Success',
    importedBy: 'Siri',
  },
  {
    importDate: '09/06/2021 (6:50:30 PM)',
    importFileName: 'File2.CSV',
    importStatus: 'Fail',
    importedBy: 'Siri',
    errors: [
      {
        rowNumber: 100,
        fieldName: 'First Name',
        errorCode: 'REQUIRED',
        message: 'required field',
      },
      {
        rowNumber: 289,
        fieldName: 'RedBook Id',
        errorCode: 'TRANSIENT',
        message: 'invalid redbook id',
      },
    ],
  },
];

export const initialState: IState<ITeam[]> & IPageState = {
  data: [],
  isFetching: false,
  success: true,
  status: '',
  actionType: '',
  pageToken: '',
  listPageToken: [],
  pageIndex: 0,
  pageSize: 0,
  orderBy: [],
  showDeleted: false,
  filter: '',
};

export const updateTokenList = (
  tokenList: IPageToken[] = [],
  page: number,
  token: string
) => {
  let newTokenList = [...tokenList];
  const pageItem = newTokenList.find((item) => item.page === page);
  if (pageItem) {
    newTokenList = newTokenList.map((item) => {
      const tokenItem = item.token;
      return {
        ...item,
        token: item.page === page ? token : tokenItem,
      };
    });
  } else {
    newTokenList.push({ page, token });
  }
  return newTokenList;
};
