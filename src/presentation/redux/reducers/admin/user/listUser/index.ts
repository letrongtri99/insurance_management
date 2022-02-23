import moment from 'moment';
import { IAction, IState } from 'shared/interfaces/common';
import { IRole, IUser } from 'shared/interfaces/common/admin/user';
import { UserActionTypes } from '../../../../actions/admin/user';

interface IPageToken {
  page: number;
  token: string;
}
export const formatUserList = (userList: IUser[] = [], roleList: IRole[]) => {
  return userList.map((user) => {
    const loginTime = user.loginTime
      ? moment(user.loginTime).format('DD/MM/YYYY HH:mm')
      : null;
    return {
      ...user,
      score: user.annotations?.score || '_',
      loginTime,
      createTime: new Date(user.createTime).toLocaleDateString(),
      updateTime: new Date(user.updateTime).toLocaleDateString(),
      fullName: `${user.firstName} ${user.lastName}`,
      displayRole:
        roleList.find((role) => role.name === user.role)?.displayName || '',
      status: user?.deleteTime ? 'Suspended' : 'Active',
    };
  });
};

const updateTokenList = (
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

interface IPageState {
  pageIndex?: number;
  pageSize?: number;
  pageToken?: string;
  orderBy?: string[];
  showDeleted?: boolean;
  listPageToken?: IPageToken[];
  filter?: string | null;
}

const initialState: IState<IUser[]> & IPageState = {
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

export default function usersReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case UserActionTypes.GET_USERS: {
      const { currentPage, pageToken, pageSize, orderBy, showDeleted } =
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
      };
    }
    case UserActionTypes.GET_USERS_SUCCESS: {
      const userList = action.payload.users;
      const token = action.payload.pageToken;
      const roleList = action.payload.roles;
      return {
        ...state,
        data: formatUserList(userList, roleList),
        isFetching: false,
        pageToken: token,
      };
    }
    case UserActionTypes.GET_USERS_FAILED: {
      return {
        ...state,
        data: [],
        isFetching: false,
        token: '',
      };
    }
    case UserActionTypes.FILTER_USER: {
      return {
        ...state,
        filter: action.payload,
        showDeleted: action.showDeleted,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
