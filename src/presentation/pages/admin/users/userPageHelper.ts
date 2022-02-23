import { csvUserColumns } from 'shared/constants/csvUserColumns';
import { IUser } from 'shared/interfaces/common/admin/user';
import { IPageState } from 'shared/interfaces/common/table';

export const initialPageState: IPageState = {
  currentPage: 1,
  pageIndex: 0,
  pageSize: 5,
  pageToken: '',
  showDeleted: true,
  filter: '',
};

interface Column {
  id: string;
  field?: string;
  label: string;
  align?: 'right' | 'center' | 'left';
  format?: any;
  sorting?: 'none' | 'asc' | 'desc';
  noTooltip?: boolean;
}

export const columns: Column[] = [
  {
    id: 'humanId',
    field: 'humanId',
    label: 'text.user',
    align: 'center',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'fullName',
    field: 'fullName',
    label: 'text.name',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'teamProduct',
    field: 'teamProduct',
    label: 'text.product',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'teamDisplayName',
    field: 'teamDisplayName',
    label: 'text.team',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'displayRole',
    field: 'role',
    label: 'text.userRole',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'score',
    field: 'annotations',
    label: 'text.agentScore',
    format: 'string',
    align: 'center',
    sorting: 'none',
    noTooltip: true,
  },
  {
    id: 'status',
    field: 'deleteTime',
    label: 'text.status',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'loginTime',
    field: 'loginTime',
    label: 'text.lastLoginOn',
    format: 'date',
    sorting: 'none',
  },
  {
    id: 'createByFullName',
    field: 'createByFullName',
    label: 'text.createBy',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'createTime',
    field: 'createTime',
    label: 'text.createOn',
    format: 'date',
    sorting: 'none',
  },
  {
    id: 'updateTime',
    field: 'updateTime',
    label: 'text.updatedOn',
    format: 'date',
    sorting: 'none',
  },
];

const getContentCsv = (listUser: IUser[]) => {
  const csvColumns = [[...csvUserColumns]];
  const csvUserData = listUser.map((item: any) => {
    return [
      item.displayRole,
      item.firstName,
      item.lastName,
      item.humanId,
      item.teamProduct,
      item.teamDisplayName,
      item.annotations.daily_limit,
      item.annotations.total_limit,
      item.annotations.score,
      item.status,
    ];
  });
  return `${csvColumns}\n${csvUserData.map((e) => e.join(',')).join('\n')}`;
};

export const download = (listUser: IUser[]) => {
  const csvContent = getContentCsv(listUser);
  const link = document.createElement('a');
  link.setAttribute('download', 'template.csv');
  link.setAttribute('href', `data:text/plain;charset=utf-8,${csvContent}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const transformToOptions = (data: any[]) =>
  data.map((item) => ({
    ...item,
    title: item.displayName,
    value: item.name,
  }));
