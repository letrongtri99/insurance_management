import React, { useMemo } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

interface IProps {
  row: number;
  column: number;
}

export default function SkeletonTableRow({ row = 0, column = 0 }: IProps) {
  const renderLoaderTable = useMemo(() => {
    let countRow = 0;
    const loaderTable = [];
    while (countRow < row) {
      let countColumn = 0;
      const tableColumns = [];
      while (countColumn < column) {
        tableColumns.push(
          <TableCell key={countColumn}>
            <Skeleton animation="wave" />
          </TableCell>
        );
        countColumn += 1;
      }
      loaderTable.push(<TableRow key={countRow}>{tableColumns}</TableRow>);
      countRow += 1;
    }
    return loaderTable;
  }, [row, column]);

  return <>{renderLoaderTable}</>;
}
