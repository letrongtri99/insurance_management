import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import TABLE_LEAD_TYPE from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import React from 'react';
import { Column, shimmerArray } from '../TableAllLead.helper';
import { StickyTableCell } from '../../table/TableStyledComponent';
import FolderOpenIcon from '../../svgicons/FolderOpenIcon';

interface IProps {
  page: number;
  rowsPerPage: number;
  tableType: string;
  pageState: any;
  configTable: Column[];
}

const TableSkeleton: React.FC<IProps> = ({
  page,
  rowsPerPage,
  tableType,
  pageState,
  configTable,
}) => {
  return (
    <TableBody>
      {shimmerArray(pageState.pageSize).length ? (
        shimmerArray(pageState.pageSize)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row: any) => {
            return (
              <TableRow
                className="hover-row"
                hover
                role="checkbox"
                tabIndex={-1}
                key={Math.random()}
              >
                <StickyTableCell>
                  {tableType === TABLE_LEAD_TYPE.LEAD_ASSIGNMENT ? (
                    <TableCell component="div" className="remove-padding">
                      <Skeleton animation="wave" className="skeleton-box" />
                    </TableCell>
                  ) : null}
                  <TableCell
                    align="center"
                    component="div"
                    className="remove-padding"
                    style={{ paddingLeft: 36 }}
                  >
                    <FolderOpenIcon fontSize="large" />
                  </TableCell>
                </StickyTableCell>

                {configTable.map((column: any) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={Math.random()}
                      align={column.align}
                      title={value}
                    >
                      <Skeleton animation="wave" className="skeleton-box" />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
      ) : (
        <TableRow>null</TableRow>
      )}
    </TableBody>
  );
};

export default TableSkeleton;
