import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import {
  TableSortLabel,
  Card,
  CardContent,
  Checkbox,
  withStyles,
} from '@material-ui/core';
import './DataTableMyLead.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { IData, getShimmerArray } from './DataTableMyLeadHelper';
import WithTableScrollHoc from '../HOCs/WithTableScroll';
import { getString } from '../theme/localization';

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

enum CHECKED_ROW {
  SOME_ITEMS = 'SOME_ITEM',
  ALL = 'ALL',
  NONE = 'NONE',
}
export function DataTable({
  columns,
  originalData,
  perPage,
  isLoading,
  sortTable,
  handleDisableBtn,
  tableRefContainer,
  starButtonAction,
  updateSingleImportant,
}: any) {
  const classes = useStyles();
  const [rows, setRows] = useState<IData[]>([]);
  const [selectedAll, setSelectedAll] = useState<CHECKED_ROW>(CHECKED_ROW.NONE);

  const getItemChecked = useCallback(
    (item: IData) => {
      handleDisableBtn(item);
    },
    [handleDisableBtn]
  );
  const setCheckedRow = (checked: CHECKED_ROW) => {
    let newRows = [...rows];
    if (checked === CHECKED_ROW.ALL) {
      newRows = newRows.map((item) => {
        return {
          ...item,
          isChecked: true,
        };
      });
    }
    if (checked === CHECKED_ROW.NONE) {
      newRows = newRows.map((item) => {
        return {
          ...item,
          isChecked: false,
        };
      });
    }
    setRows(newRows);
  };

  const handleSelectedCheckbox = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedAll(CHECKED_ROW.ALL);
      setCheckedRow(CHECKED_ROW.ALL);
    } else {
      setSelectedAll(CHECKED_ROW.NONE);
      setCheckedRow(CHECKED_ROW.NONE);
    }
  };
  const handleChangeCheckboxItem = (item: IData) => {
    if (!isLoading) {
      let passedItem = { ...item };
      const result = rows.map((row: IData) => {
        const newItem = { ...row };
        if (newItem.id === item.id) {
          newItem.isChecked = !newItem.isChecked;
          passedItem = { ...newItem };
          return newItem;
        }
        return newItem;
      });
      const countCheckedRows = result.filter((lead) => lead.isChecked);
      if (countCheckedRows.length) {
        if (countCheckedRows.length === rows.length) {
          setSelectedAll(CHECKED_ROW.ALL);
        } else {
          setSelectedAll(CHECKED_ROW.SOME_ITEMS);
        }
      } else {
        setSelectedAll(CHECKED_ROW.NONE);
      }
      getItemChecked(passedItem);
      setRows(result);
    }
  };

  const handleSingleImportant = (leadId: string, isImportant: boolean) => {
    const body = {
      ids: [leadId],
      important: isImportant,
    };
    updateSingleImportant(body);
  };
  const handleClickImportant = (itemId: string) => {
    if (!isLoading) {
      setSelectedAll(CHECKED_ROW.NONE);
      let newRows = [...rows];
      newRows = newRows.map((item) => {
        const newItem = { ...item };
        newItem.isChecked = false;
        if (item.fullLeadId === itemId) {
          newItem.important = !newItem.important;
          handleSingleImportant(itemId, newItem.important);
        }
        return newItem;
      });
      setRows(newRows);
    }
  };
  useEffect(() => {
    setRows(originalData);
    setSelectedAll(CHECKED_ROW.NONE);
  }, [originalData]);

  useEffect(() => {
    if (!originalData.length) {
      const rowItems = getShimmerArray(perPage);
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

  useEffect(() => {
    const getItemsChecked = rows.filter((item) => item.isChecked);
    starButtonAction(getItemsChecked);
  }, [JSON.stringify(rows)]);

  const renderImportantStar = (row: any) => {
    if (row.important) {
      return (
        <div className="outline-none table-cell-center">
          <StarIcon
            className="fill-yellow table-cell-icon"
            onClick={() => handleClickImportant(row.fullLeadId)}
          />
        </div>
      );
    }
    return (
      <div className="outline-none table-cell-center">
        <StarBorderIcon
          className="table-cell-icon"
          onClick={() => handleClickImportant(row.fullLeadId)}
        />
      </div>
    );
  };

  return (
    <Card className="data-table-container">
      <CardContent className={classes.cardContent}>
        <TableContainer className="table-scrollbar" ref={tableRefContainer}>
          <Table
            stickyHeader
            aria-label="sticky table"
            className="data-table-container__table"
          >
            <TableHead>
              <TableRow>
                <StickyTableCell>
                  <TableCell
                    component="div"
                    className="remove-border-bottom remove-padding sticky-table-cell"
                  >
                    {selectedAll === CHECKED_ROW.SOME_ITEMS ? (
                      <Checkbox
                        indeterminate
                        inputProps={{
                          'aria-label': 'indeterminate checkbox',
                        }}
                        onChange={() => handleSelectedCheckbox(false)}
                      />
                    ) : (
                      <Checkbox
                        checked={selectedAll === CHECKED_ROW.ALL}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleSelectedCheckbox(event.target.checked)}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    component="div"
                    className="remove-border-bottom remove-padding sticky-table-cell"
                  />
                  <TableCell
                    component="div"
                    className="remove-border-bottom remove-padding sticky-table-cell"
                  />
                </StickyTableCell>
                {columns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <TableSortLabel
                      active={column.sort !== false}
                      direction={column.sorting === 'asc' ? 'desc' : 'asc'}
                      onClick={() => sortTable(column.field)}
                      IconComponent={
                        column.sorting === 'none'
                          ? withIcon(SyncAltIcon)
                          : ArrowUpwardIcon
                      }
                    >
                      {getString(column.label)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? (
                rows.slice(0, perPage).map((row: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={Math.random()}
                    >
                      <StickyTableCell>
                        <TableCell
                          component="div"
                          className="remove-border-bottom remove-padding sticky-table-cell"
                        >
                          <Checkbox
                            checked={row.isChecked}
                            onChange={() => handleChangeCheckboxItem(row)}
                          />
                        </TableCell>
                        <TableCell
                          component="div"
                          className="remove-border-bottom remove-padding sticky-table-cell"
                        >
                          {renderImportantStar(row)}
                        </TableCell>
                        <TableCell
                          component="div"
                          className="remove-border-bottom remove-padding sticky-table-cell"
                        >
                          <div className="table-cell-center">
                            <Link
                              to={`/lead/${row.leadDetailId}`}
                              className="table-cell-link"
                              target="_blank"
                            >
                              <FolderSharedIcon className="table-cell-icon" />
                            </Link>
                          </div>
                        </TableCell>
                      </StickyTableCell>
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={Math.random()}
                            align={column.align}
                            title={column.noTooltip ? '' : value}
                            className={
                              column.breakSpace
                                ? 'colum-break-spaces'
                                : value.toString()
                            }
                          >
                            {isLoading ? (
                              <Skeleton animation="wave" />
                            ) : (
                              <>
                                {value}
                                {column.customField && column.icon}
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
                  <TableCell align="left" colSpan={columns.length + 1}>
                    No data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export const DataTableMyLead = WithTableScrollHoc(React.memo(DataTable));
