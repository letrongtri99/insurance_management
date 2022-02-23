import React, { useState, useEffect, useMemo, useContext } from 'react';
import { TableCell, Input, TableRow } from '@material-ui/core';
import { Column } from 'presentation/pages/leads/LeadDistributionPage';
import './index.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import { getString } from 'presentation/theme/localization';
import { IRowData } from '../LeadDistributionTable/distribution.helper';
import { DistributionTableContext } from '../LeadDistributionTable/index';

export interface IProps {
  row: IRowData;
  columns: Column[];
  index: number;
  disabled: boolean;
  rowChangeValue: (val: IRowData | null, index: number) => void;
  isFetching: boolean;
}

const DistributionTableRow: React.FC<IProps> = ({
  row,
  columns,
  index,
  disabled,
  rowChangeValue,
  isFetching,
}) => {
  const [rowData, setRowData] = useState<IRowData | null>(null);
  const [sum, setSum] = useState(0);
  const { tableError, setTableError } = useContext(DistributionTableContext);
  useEffect(() => {
    setRowData(row);
  }, [row]);

  useEffect(() => {
    setTableError({
      ...tableError,
      isError: sum !== 100 && rowData?.total !== 100,
      msg: getString('text.scoringError'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData?.total, sum]);

  useMemo(() => {
    const total = !rowData
      ? 0
      : rowData.lead1 + rowData.lead2 + rowData.lead3 + rowData.lead4;
    setSum(total);
  }, [rowData]);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    const { name, value } = event.target;
    let newVal = Number(value);
    newVal = newVal > 100 ? 100 : newVal;
    newVal = newVal < 0 ? 0 : newVal;
    const newRowData = {
      ...rowData,
      [name]: newVal,
    } as IRowData;
    setRowData(newRowData);
    rowChangeValue(newRowData, index);
  };

  const classCellInvalid = (value: number) => {
    return value !== 100 ? 'text-bold error-value' : 'text-bold';
  };

  return (
    rowData && (
      <TableRow>
        {columns.map((column) => {
          const value = rowData[column.id];
          return (
            <TableCell
              key={column.id}
              className={disabled ? 'add-height-table' : ''}
            >
              {isFetching ? (
                <Skeleton animation="wave" />
              ) : (
                <>
                  {typeof value === 'number' ? (
                    <>
                      {!disabled ? (
                        <Input
                          type="number"
                          className={`unittest-input-distribution ${column.id}`}
                          name={column?.id}
                          value={value || 0}
                          disabled={disabled}
                          onChange={handleChangeValue}
                          inputProps={{ min: 0, max: 100 }}
                        />
                      ) : (
                        <span title={`${value}%`}>{`${value}%`}</span>
                      )}
                    </>
                  ) : (
                    value
                  )}
                </>
              )}
            </TableCell>
          );
        })}
        {isFetching ? (
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
        ) : (
          <TableCell title={`${sum}%`} className={classCellInvalid(sum)}>
            {`${sum}%`}
          </TableCell>
        )}
      </TableRow>
    )
  );
};

export default DistributionTableRow;
