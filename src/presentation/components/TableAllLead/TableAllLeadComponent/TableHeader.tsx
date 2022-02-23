import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import TABLE_LEAD_TYPE from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import { getString } from 'presentation/theme/localization';
import React from 'react';
import { capitalizeFirstLetter } from 'shared/helper/utilities';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { IS_CHECKED } from '..';
import { Checkbox, StickyTableCell } from '../../table/TableStyledComponent';
import { Column } from '../TableAllLead.helper';

interface IProps {
  tableType: string;
  configTable: Column[];
  isAllChecked: string;
  setIsAllChecked: any;
  changeIsAllCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortColumn: (columnId: string) => void;
}

const withIcon = (Component: React.ComponentType<any>) => {
  const IconSort = () => {
    return <Component className="MuiTableSortLabel-icon rotate-icon" />;
  };
  return IconSort;
};

const TableHeader: React.FC<IProps> = ({
  tableType,
  configTable,
  isAllChecked,
  setIsAllChecked,
  changeIsAllCheck,
  sortColumn,
}) => {
  return (
    <TableHead>
      <TableRow>
        <StickyTableCell>
          {tableType === TABLE_LEAD_TYPE.LEAD_ASSIGNMENT ||
          tableType === TABLE_LEAD_TYPE.LEAD_REJECTION ? (
            <TableCell component="div" className="remove-padding">
              {isAllChecked === IS_CHECKED.SOME_ITEMS ? (
                <Checkbox
                  indeterminate
                  inputProps={{
                    'aria-label': 'indeterminate checkbox',
                  }}
                  onChange={() => setIsAllChecked(IS_CHECKED.NONE)}
                />
              ) : (
                <Checkbox
                  checked={isAllChecked === IS_CHECKED.ALL}
                  onChange={(event) => changeIsAllCheck(event)}
                />
              )}
            </TableCell>
          ) : null}
          <TableCell
            component="div"
            className="remove-border-bottom remove-padding"
            style={{
              minWidth:
                tableType === TABLE_LEAD_TYPE.LEAD_REJECTION
                  ? '120px'
                  : '100px',
            }}
          />
          {tableType === TABLE_LEAD_TYPE.LEAD_REJECTION ? (
            <TableCell component="div" className="remove-padding">
              {capitalizeFirstLetter('Voice File')}
            </TableCell>
          ) : null}
        </StickyTableCell>

        {configTable.map((column: any) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.isNotSorting ? (
              capitalizeFirstLetter(getString(column.label))
            ) : (
              <TableSortLabel
                active={column.sorting !== false}
                direction={column.sorting === 'asc' ? 'desc' : 'asc'}
                style={{ minWidth: column.minWidth }}
                onClick={() => sortColumn(column.id)}
                hideSortIcon={column.isNotSorting}
                IconComponent={
                  column.sorting === 'none'
                    ? withIcon(SyncAltIcon)
                    : ArrowUpwardIcon
                }
              >
                {capitalizeFirstLetter(getString(column.label))}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
