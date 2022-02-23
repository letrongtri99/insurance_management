import { ILeadImportsReponse } from 'shared/interfaces/common/lead/import';
import { IAction } from 'shared/interfaces/common';
import { LeadActionTypes } from 'presentation/redux/actions/leads/import';
import { updateTokenList } from 'data/gateway/api/helper/queryString.helper';
import { PRODUCT_TYPE } from 'config/TypeFilter';
import * as CONSTANTS from 'shared/constants';
import { ILookUpUser } from 'shared/interfaces/common/admin/user/index';

interface LeadImportListReducer {
  data: ILeadImportsReponse[];
  isFetching: boolean;
  success: boolean;
  status: string;
  actionType: string;
  pageToken: string;
  listPageToken: any;
  pageIndex: number;
  pageSize: number;
  orderBy: any;
  showDeleted: boolean;
  filter: string | null;
}

const initialState: LeadImportListReducer = {
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

const formatImportList = (
  importList: ILeadImportsReponse[] = [],
  userList: ILookUpUser[] = []
) => {
  return importList.map((importLead) => {
    const displayProduct: string = PRODUCT_TYPE[importLead.product] || '';
    const downloadLink = `${process.env.REACT_APP_API_ENDPOINT}/${CONSTANTS.apiUrl.lead.getDownloadLink}/${importLead.name}:generateDownloadUrl`;
    const createByUser = userList.find(
      (item: ILookUpUser) => item?.key === importLead.createBy
    );
    return {
      ...importLead,
      createTime: new Date(importLead.createTime).toLocaleDateString(),
      updateTime: new Date(importLead.updateTime).toLocaleDateString(),
      leadRecord: importLead.imported,
      createBy: createByUser?.value || '-',
      downloadLink,
      displayProduct,
    };
  });
};

export default function listReducer(
  state = initialState,
  action: IAction<any>
): LeadImportListReducer {
  switch (action.type) {
    case LeadActionTypes.GET_IMPORT_LEADS: {
      const { currentPage, pageToken, pageSize, orderBy, showDeleted, filter } =
        action.payload;

      return {
        ...state,
        isFetching: true,
        listPageToken: updateTokenList(
          state.listPageToken,
          currentPage,
          pageToken
        ),
        pageIndex: currentPage,
        pageSize,
        orderBy,
        showDeleted,
        filter,
      };
    }
    case LeadActionTypes.GET_IMPORT_LEADS_SUCCESS: {
      const token = action.payload.pageToken;
      return {
        ...state,
        data: formatImportList(
          action.payload.importList,
          action.payload.userList
        ),
        isFetching: false,
        pageToken: token,
      };
    }
    case LeadActionTypes.GET_IMPORT_LEADS_FAILED: {
      return {
        ...state,
        data: [],
        isFetching: false,
        pageToken: '',
      };
    }
    default:
      return state;
  }
}
