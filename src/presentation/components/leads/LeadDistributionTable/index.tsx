import React, { useState, useMemo, useEffect } from 'react';
import {
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import { Edit, PlayCircleFilled as Play, Pause } from '@material-ui/icons';
import Controls from 'presentation/components/controls/Control';
import {
  Column,
  TableTypeEnum,
} from 'presentation/pages/leads/LeadDistributionPage';
import Paper from '@material-ui/core/Paper';
import { getString } from 'presentation/theme/localization';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { Alert } from '@material-ui/lab';
import DistributionTableRow from '../DistributionTableRow';
import './index.scss';
import {
  IRowData,
  getSumColumn,
  getTableState,
  LEAD_PERCENT_VALID,
  SHIMMER_ARRAY,
  TOTAL_ROW_INDEX,
} from './distribution.helper';
import {
  getRetainerLeads,
  getNewLeads,
  updateNewLeads,
  updateRetainerLeads,
} from '../../../redux/actions/distribution';

export interface IProps {
  columns: Column[];
  tableName: string;
  tableType: TableTypeEnum;
}

export const DistributionTableContext = React.createContext<any>({});

const LeadDistributionTable: React.FC<IProps> = ({
  columns,
  tableName,
  tableType,
}) => {
  const [leadList, setLeadList] = useState<IRowData[]>([]);
  const [leadListSum, setLeadListSum] = useState<IRowData[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const { isFetching, data } = useSelector(
    (state: any) => state.distributionReducer[getTableState(tableType)]
  );
  const [tableError, setTableError] = useState<any>({
    isError: false,
    msg: '',
  });

  useMemo(() => {
    if (data.leadsRow) {
      setLeadList(data.leadsRow);
      setIsEdit(false);
    }
  }, [data.leadsRow]);

  useMemo(() => {
    setLeadListSum(leadList);
  }, [leadList]);

  useMemo(() => {
    setIsEnable(data.enabled);
  }, [data.enabled]);

  const getLeadsHandle = () => {
    if (tableType === TableTypeEnum.NEW_LEAD) {
      dispatch(getNewLeads());
    }
    if (tableType === TableTypeEnum.RETAINER_LEAD) {
      dispatch(getRetainerLeads());
    }
  };

  useEffect(() => {
    getLeadsHandle();
  }, []);

  const changeIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const rowChangeValueHandler = (val: IRowData | null, index: number) => {
    if (val) {
      const newLeadListSum = [...leadListSum];
      newLeadListSum[index] = val;
      setLeadListSum(newLeadListSum);
    }
  };

  const isColumnValid = (result: IRowData) => {
    if (result) {
      return (
        result.lead1 === LEAD_PERCENT_VALID &&
        result.lead2 === LEAD_PERCENT_VALID &&
        result.lead3 === LEAD_PERCENT_VALID &&
        result.lead4 === LEAD_PERCENT_VALID
      );
    }
    return false;
  };
  const isRowValid = () => {
    let checkRow = true;
    leadListSum.forEach((item) => {
      if (
        item.lead1 + item.lead2 + item.lead3 + item.lead4 !==
        LEAD_PERCENT_VALID
      ) {
        checkRow = false;
      }
    });
    return checkRow;
  };
  const lastRowTable = useMemo(() => {
    const { sumTotalColumn, result } = getSumColumn(leadListSum);
    if (sumTotalColumn) {
      setIsValid(isColumnValid(result as IRowData) && isRowValid());
    }
    if (result) {
      return [
        { id: 1, val: result.lead1 },
        { id: 2, val: result.lead2 },
        { id: 3, val: result.lead3 },
        { id: 4, val: result.lead4 },
      ];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadListSum]);

  const classCellInvalid = (value: number) => {
    return value !== 100 ? 'text-bold error-value' : 'text-bold';
  };

  const updateAutoAssign = (enable: boolean) => {
    const lead = {
      enableAutoAssign: enable,
    };
    if (tableType === TableTypeEnum.NEW_LEAD) {
      dispatch(updateNewLeads(lead));
    }
    if (tableType === TableTypeEnum.RETAINER_LEAD) {
      dispatch(updateRetainerLeads(lead));
    }
  };
  const updateTable = () => {
    const values: number[] = [];
    leadListSum.forEach((item) =>
      values.push(item.lead1, item.lead2, item.lead3, item.lead4)
    );
    const lead = {
      values,
    };
    if (tableType === TableTypeEnum.NEW_LEAD) {
      dispatch(updateNewLeads(lead));
    }
    if (tableType === TableTypeEnum.RETAINER_LEAD) {
      dispatch(updateRetainerLeads(lead));
    }
  };

  const ShimmerLeadList = () => {
    return SHIMMER_ARRAY.map((row, index) => {
      return (
        <TableRow key={index.toString()}>
          <TableCell className="add-height-table">
            {index === TOTAL_ROW_INDEX ? '' : <Skeleton animation="wave" />}
          </TableCell>
          <TableCell className="add-height-table">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell className="add-height-table">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell className="add-height-table">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell className="add-height-table">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell className="add-height-table">
            {index === TOTAL_ROW_INDEX ? '' : <Skeleton animation="wave" />}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <DistributionTableContext.Provider value={{ tableError, setTableError }}>
      <div className="table-new-leads">
        <h2 className="table-new-leads__name">{tableName}</h2>
        {isEnable ? (
          <IconButton
            className="table-new-leads__icon"
            aria-label="save"
            size="small"
            onClick={() => updateAutoAssign(false)}
          >
            <Play />
          </IconButton>
        ) : (
          <IconButton
            className="table-new-leads__icon"
            id="unittest-update-auto-assign"
            aria-label="save"
            size="small"
            onClick={() => updateAutoAssign(true)}
          >
            <Pause />
          </IconButton>
        )}
        {!isEdit ? (
          <IconButton
            className="table-new-leads__icon"
            id="unittest-icon-edit-distribution"
            aria-label="save"
            size="small"
            onClick={() => changeIsEdit()}
          >
            <Edit />
          </IconButton>
        ) : (
          <Controls.Button
            className="table-new-leads__save"
            type="submit"
            color="primary"
            text={getString('text.saveButton')}
            disabled={!isValid}
            onClick={updateTable}
          />
        )}

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column: Column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>{getString('text.total')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching ? (
                ShimmerLeadList()
              ) : (
                <>
                  {leadList.map((row, index: number) => {
                    return (
                      <DistributionTableRow
                        key={row.id}
                        index={index}
                        row={row}
                        columns={columns}
                        disabled={!isEdit}
                        rowChangeValue={rowChangeValueHandler}
                        isFetching={isFetching}
                      />
                    );
                  })}
                  <TableRow>
                    <TableCell className="add-height-table" />
                    {lastRowTable.map((cell, index: number) => {
                      return (
                        <TableCell
                          key={index.toString()}
                          className={`add-height-table ${classCellInvalid(
                            cell.val
                          )}`}
                        >
                          {isFetching ? (
                            <Skeleton animation="wave" />
                          ) : (
                            `${cell.val}%`
                          )}
                          {}
                        </TableCell>
                      );
                    })}
                    <TableCell className="add-height-table" />
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
          {!isValid ? <Alert severity="error">{tableError.msg}</Alert> : null}
        </TableContainer>
      </div>
    </DistributionTableContext.Provider>
  );
};

export default LeadDistributionTable;
