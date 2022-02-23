import { Insurers } from 'mock-data/AdminPage.mock';
import { IInsurer } from 'shared/interfaces/common/admin/team';
import { getLanguage, LANGUAGES } from 'presentation/theme/localization';

export interface Column {
  id: string;
  field?: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: any;
  sorting?: 'none' | 'asc' | 'desc';
  noTooltip?: boolean;
}

export interface IInsurerOption extends IInsurer {
  title: string;
  value: string;
}

export const columns: Column[] = [
  {
    id: 'displayName',
    field: 'displayName',
    label: 'text.teamName',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'productName',
    field: 'productType',
    label: 'text.product',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'memberCount',
    field: 'memberCount',
    label: 'text.userCount',
    minWidth: 100,
    sorting: 'none',
    noTooltip: true,
  },
  {
    id: 'leadType',
    field: 'leadType',
    label: 'text.leadType',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'managerFullName',
    field: 'managerFullName',
    label: 'text.manager',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'supervisorFullName',
    field: 'supervisorFullName',
    label: 'text.supervisor',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'createByFullName',
    field: 'createByFullName',
    label: 'text.createBy',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'createTime',
    field: 'createTime',
    label: 'text.createOn',
    minWidth: 100,
    format: 'date',
    sorting: 'none',
  },
  {
    id: 'updateTime',
    field: 'updateTime',
    label: 'text.updatedOn',
    minWidth: 100,
    format: 'date',
    sorting: 'none',
  },
];

export const getInsurerOptionsByLanguage = () => {
  const currentLanguage = getLanguage();

  const insurers = (title: 'shortNameTh' | 'shortNameEn'): IInsurerOption[] =>
    Insurers.map((item: IInsurer) => ({
      ...item,
      title: item[title],
      value: item.shortNameEn,
    })).sort((a, b) => a.title.localeCompare(b.title));

  return currentLanguage === LANGUAGES.THAI
    ? insurers('shortNameTh')
    : insurers('shortNameEn');
};
