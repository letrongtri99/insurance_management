import MaterialTable from 'material-table';
import React, { forwardRef } from 'react';
import './basicTable.scss';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const options = {
  search: false,
  paging: false,
  headerStyle: {
    background: '#ddd',
  },
};

interface IBasicTable {
  table: any;
  updateDataHandler: any;
  tableOption?: any;
}
const BasicTable: React.FC<IBasicTable> = ({
  table,
  tableOption,
  updateDataHandler,
}: any): any => {
  return (
    <MaterialTable
      title={table.title}
      options={{
        ...options,
        ...tableOption,
      }}
      icons={{
        NextPage: forwardRef((props, ref) => <ChevronRight />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
      }}
      columns={table.columns}
      data={table.data}
    />
  );
};

export default BasicTable;
