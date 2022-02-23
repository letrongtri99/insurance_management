interface Column {
  id: string;
  field?: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: any;
  sorting?: 'none' | 'asc' | 'desc';
  noTooltip?: boolean;
  disabled?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const columns: Column[] = [
  {
    id: 'importStatus',
    field: 'status',
    label: 'text.importStatus',
    minWidth: 100,
    sorting: 'none',
    disabled: true,
  },
  {
    id: 'importDate',
    field: 'createTime',
    label: 'text.importDate',
    minWidth: 100,
    sorting: 'desc',
  },
  {
    id: 'importFileName',
    field: 'name',
    label: 'package.importFileName',
    minWidth: 100,
    sorting: 'none',
    noTooltip: false,
    disabled: true,
  },
  {
    id: 'importedBy',
    field: 'createBy',
    label: 'text.importedBy',
    minWidth: 100,
    sorting: 'none',
    disabled: true,
  },
  {
    id: 'packageType',
    field: 'packageDetails.packageType',
    label: 'text.packageType',
    minWidth: 100,
    sorting: 'none',
    disabled: true,
  },
  {
    id: 'numberOfPackages',
    field: 'imported',
    label: 'text.numberOfPackages',
    minWidth: 100,
    sorting: 'none',
    disabled: true,
  },
];

export const StatusImportedPackage = [
  { id: 1, title: 'importFileStatus.complete', value: 'COMPLETE' },
  { id: 2, title: 'importFileStatus.inProgress', value: 'IN_PROGRESS' },
  { id: 3, title: 'importFileStatus.error', value: 'ERROR' },
];
