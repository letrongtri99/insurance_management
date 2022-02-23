import { getString } from '../../../theme/localization';

export interface Column {
  id: string;
  label: string;
  field: string;
  align?: 'right' | 'center' | 'left';
  format?: any;
  sorting?: 'none' | 'asc' | 'desc';
  noTooltip?: boolean;
}

export const columns: Column[] = [
  {
    id: 'type',
    label: 'text.type',
    field: 'online',
    align: 'center',
    format: 'string',
    sorting: 'none',
    noTooltip: true,
  },
  {
    id: 'source',
    field: 'source',
    label: 'text.source',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'medium',
    field: 'medium',
    label: 'text.medium',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'campaign',
    field: 'campaign',
    label: 'text.campaign',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'displayProduct',
    field: 'product',
    label: 'text.product',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'leadCount',
    field: 'leadCount',
    label: 'text.leadCount',
    format: 'string',
    align: 'center',
    sorting: 'none',
  },
  {
    id: 'score',
    field: 'score',
    label: 'text.score',
    format: 'string',
    sorting: 'none',
    align: 'center',
  },
  {
    id: 'hide',
    field: 'hidden',
    label: 'text.hide',
    format: 'date',
    sorting: 'none',
    noTooltip: true,
  },
  {
    id: 'autoAssign',
    field: 'autoAssign',
    label: 'text.autoAssign',
    format: 'string',
    sorting: 'none',
    noTooltip: true,
  },
  {
    id: 'createByFullName',
    field: 'createByFullName',
    label: 'text.createBy',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'updateByFullName',
    field: 'updateByFullName',
    label: 'text.updateBy',
    format: 'string',
    sorting: 'none',
  },
  {
    id: 'createTime',
    field: 'createTime',
    label: 'text.createOn',
    format: 'Created On',
    sorting: 'none',
  },
  {
    id: 'updateTime',
    field: 'updateTime',
    label: 'text.updatedOn',
    format: 'Updated On',
    sorting: 'none',
  },
];

export const getLocaleOptions = (options: any[], key: string) => {
  return options.map((option: any) => {
    const keyToTranslate: string = option[key];
    return {
      ...option,
      [key]: getString(keyToTranslate),
    };
  });
};
