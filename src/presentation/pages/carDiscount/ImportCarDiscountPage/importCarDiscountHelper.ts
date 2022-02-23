interface Column {
  id: string;
  field?: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: any;
  sorting?: 'none' | 'asc' | 'desc';
  noTooltip?: boolean;
}

const columns: Column[] = [
  {
    id: 'importDate',
    field: 'importDate',
    label: 'text.importDate',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'importFileName',
    field: 'importFileName',
    label: 'package.importFileName',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'importStatus',
    field: 'importStatus',
    label: 'text.importStatus',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'importedBy',
    field: 'importedBy',
    label: 'text.importedBy',
    minWidth: 100,
    sorting: 'none',
  },
];

export default columns;
