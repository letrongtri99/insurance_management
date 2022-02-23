import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import { getString } from 'presentation/theme/localization';
import React from 'react';
import { capitalizeFirstLetter } from 'shared/helper/utilities';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { StickyTableCell } from 'presentation/components/table/TableStyledComponent';
import { Column } from './helper';

type IProp = {
  columnSettings: Column[];
  isDisableExpand: boolean | undefined;
};

const withIcon = (Component: React.ComponentType<any>) => {
  const IconSort = () => {
    return <Component className="MuiTableSortLabel-icon rotate-icon" />;
  };
  return IconSort;
};

const TableHeader = ({ columnSettings, isDisableExpand }: IProp) => {
  return (
    <TableHead>
      <TableRow>
        <StickyTableCell>
          <TableCell
            component="div"
            className="remove-border-bottom remove-padding"
          />
        </StickyTableCell>

        {/* Empty cell for collapse icon */}
        {!isDisableExpand && <TableCell />}

        {columnSettings.map((column: Column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.isNotSorting ? (
              capitalizeFirstLetter(getString(column.label))
            ) : (
              <TableSortLabel
                active={column.sorting !== undefined}
                direction={column.sorting === 'asc' ? 'desc' : 'asc'}
                style={{ minWidth: column.minWidth }}
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
