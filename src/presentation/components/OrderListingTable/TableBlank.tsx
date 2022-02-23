import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Column } from './helper';

type IProp = {
  columnSettings: Column[];
};

const TableBlank = ({ columnSettings }: IProp) => {
  return (
    <TableRow>
      <TableCell className="first-column-placeholder" />
      {columnSettings.map((item: Column) => {
        return <TableCell key={item.id} />;
      })}
    </TableRow>
  );
};

export default TableBlank;
