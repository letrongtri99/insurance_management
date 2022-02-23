/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MuiTableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from 'presentation/components/svgicons/EditIcon';
import {
  TableSortLabel,
  Card,
  CardContent,
  withStyles,
} from '@material-ui/core';
import './DataTable.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import styled from 'styled-components';
import { capitalizeFirstLetter } from 'shared/helper/utilities';
import WithTableScrollHoc from '../HOCs/WithTableScroll';
import { getString } from '../theme/localization';
import DownloadIcon from './svgicons/DownloadIcon';

const SHIMMER_ARRAY = [{}, {}, {}, {}, {}];
const DEFAULT_PER_PAGE_TABLE = 5;
const ITEM_PER_PAGE_LIST = [5, 10, 25];
const FAIL_VALUE = ['Failed', 'Fail'];
interface IData {
  [key: string]: string | number | boolean;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  cardContent: {
    padding: 0,
    paddingBottom: '0 !important',
  },
  container: {
    maxHeight: 440,
  },
});

const StickyTableCell = withStyles((theme) => ({
  head: {
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2,
  },
  body: {
    backgroundColor: '#fff',
    left: 0,
    position: 'sticky',
    textAlign: '-webkit-center',
  } as any,
}))(TableCell);

const withIcon = (Component: React.ComponentType<any>) => {
  const IconSort = () => {
    return <Component className="MuiTableSortLabel-icon rotate-icon" />;
  };
  return IconSort;
};

const TableContainer = styled(MuiTableContainer)`
  &&& {
    .MuiTableCell-head {
      vertical-align: top;
      padding-top: 8px;
    }
    .MuiTableSortLabel-root {
      vertical-align: top;
    }
    .MuiTableBody-root {
      .Mui-checked {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
  }
`;

function DataTable({
  columns,
  originalData,
  openEditModal,
  disabledEdit,
  isCustomPaging,
  perPage,
  isLoading,
  isPackageTable,
  isCarDiscountTable,
  sortTable,
  tableRefContainer,
  customAction,
  canDownload,
  handleFailedPackageClick,
}: any) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PER_PAGE_TABLE);
  const [rows, setRows] = useState(originalData);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (!originalData.length) {
      const rowItems = SHIMMER_ARRAY;
      const fakeRow: IData[] = [];
      rowItems.forEach(() => {
        const newRow: IData = {};
        columns.forEach((column: IData) => {
          newRow[column.id as string] = '';
        });
        fakeRow.push(newRow);
      });
      setRows(fakeRow);
    }
  }, []);

  useMemo(() => {
    setRowsPerPage(perPage || DEFAULT_PER_PAGE_TABLE);
  }, [perPage]);

  useMemo(() => {
    setRows(originalData);
  }, [originalData]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editClickHandle = useCallback(
    (row) => {
      openEditModal(row);
    },
    [openEditModal]
  );

  const onClickHandle = useCallback(
    (row) => {
      customAction(row.downloadLink);
    },
    [customAction]
  );

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <TableContainer
          className="data-table-container table-scrollbar"
          ref={tableRefContainer}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {disabledEdit ? null : (
                  <StickyTableCell>
                    <TableCell
                      component="div"
                      className="remove-border-bottom remove-padding sticky-table-cell"
                    />
                  </StickyTableCell>
                )}
                {columns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <TableSortLabel
                      active={!column.disabled}
                      disabled={column.disabled}
                      direction={column.sorting === 'asc' ? 'desc' : 'asc'}
                      onClick={() => sortTable(column.field)}
                      IconComponent={
                        column.sorting === 'none'
                          ? withIcon(SyncAltIcon)
                          : ArrowUpwardIcon
                      }
                    >
                      {capitalizeFirstLetter(getString(column.label))}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={Math.random()}
                      >
                        {disabledEdit ? null : (
                          <StickyTableCell
                            style={
                              isPackageTable || isCarDiscountTable
                                ? { width: '50px' }
                                : { width: 'auto' }
                            }
                          >
                            <TableCell
                              component="div"
                              className="remove-border-bottom remove-padding sticky-table-cell"
                            >
                              {isLoading ? (
                                <Skeleton
                                  animation="wave"
                                  className="skeleton-box"
                                />
                              ) : isPackageTable || isCarDiscountTable ? (
                                <DownloadIcon
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => onClickHandle(row)}
                                  fontSize="large"
                                />
                              ) : (
                                <EditIcon
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => editClickHandle(row)}
                                  fontSize="large"
                                />
                              )}
                            </TableCell>
                          </StickyTableCell>
                        )}
                        {columns.map((column: any) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={Math.random()}
                              align={column.align}
                              title={column.noTooltip ? '' : value}
                              onClick={() =>
                                column.clickable
                                  ? onClickHandle(row)
                                  : undefined
                              }
                            >
                              {isLoading ? (
                                <Skeleton animation="wave" />
                              ) : (
                                <>
                                  {FAIL_VALUE.includes(value) &&
                                  (isPackageTable || isCarDiscountTable) ? (
                                    <span
                                      className="import__failed"
                                      role="presentation"
                                      onClick={() => {
                                        handleFailedPackageClick(row);
                                      }}
                                    >
                                      {value}
                                    </span>
                                  ) : (
                                    value
                                  )}
                                  {/* {column.customField && column.icon} */}
                                  {column.customField &&
                                    canDownload &&
                                    column.clickable &&
                                    column.icon}
                                </>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={columns.length + 1}>
                    No data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!isCustomPaging ? (
          <TablePagination
            rowsPerPageOptions={ITEM_PER_PAGE_LIST}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  );
}

export default WithTableScrollHoc(DataTable);
