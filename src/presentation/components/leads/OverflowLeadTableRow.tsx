import React, { useContext, useEffect, useMemo, useState } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { getString } from 'presentation/theme/localization';
import { SelectElement } from 'shared/types/controls';
import { ScoringTableContext } from './EditableTable';
import Controls from '../controls/Control';
import SkeletonTableRow from './SkeletonTableRow';
import EditIcon from '../svgicons/EditIcon';

interface ITableOverFlowRow {
  id: string;
  name: string;
  value: number;
}
interface IScoringTableOverflowRow {
  data: any;
  type: string;
  loading?: boolean;
  edit?: boolean;
  handelSave: (data: ITableOverFlowRow) => void;
}
const option = [
  { id: 1, title: 1 },
  { id: 2, title: 2 },
  { id: 3, title: 3 },
  { id: 4, title: 4 },
];

const OverflowLeadTableRow: React.FC<IScoringTableOverflowRow> = ({
  data,
  type,
  edit,
  loading,
  handelSave,
}) => {
  const [rowData, setRowData] = useState<any>({ data });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { tableError, setTableError } = useContext(ScoringTableContext);

  const handelSaveData = () => {
    handelSave(rowData);
    setIsEdit(false);
  };

  useEffect(() => {
    if (edit) {
      setIsEdit(true);
    }
  }, [edit]);

  const handleChange = (
    event: React.ChangeEvent<SelectElement>,
    index: number
  ) => {
    const { value } = event.target;
    const rowDataCopy = JSON.parse(JSON.stringify(rowData));
    rowDataCopy.data[index].value = value;
    setRowData({ data: rowDataCopy.data });
  };

  useEffect(() => {
    let count = 0;
    for (let loop1 = 0; loop1 < rowData.data.length; loop1 += 1) {
      const newArr = rowData.data.slice(0, count);
      let isExist = false;
      for (let loop2 = 0; loop2 < newArr.length; loop2 += 1) {
        if (
          rowData.data[loop1].value === rowData.data[loop2].value &&
          rowData.data[loop1].value !== 0 &&
          rowData.data[loop2].value !== 0
        ) {
          isExist = true;
          break;
        }
      }
      if (isExist) {
        setTableError({
          ...tableError,
          isError: true,
          msg: getString('text.overFlowError'),
        });
        break;
      }
      setTableError({ ...tableError, isError: false, msg: '' });
      count += 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData]);

  const renderRow = useMemo(() => {
    if (isEdit) {
      return rowData.data.map((item: ITableOverFlowRow, index: number) => (
        <TableCell key={item.id}>
          <Controls.Select
            options={option}
            onChange={(event) => {
              handleChange(event, index);
            }}
            value={item.value}
          />
        </TableCell>
      ));
    }
    return rowData.data.map((item: ITableOverFlowRow) => (
      <TableCell title={`${item.value}`} key={item.id}>
        {item.value}
      </TableCell>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, rowData]);
  return (
    <>
      {!loading ? (
        <TableRow>
          <TableCell>
            {isEdit ? (
              <IconButton
                aria-label="save"
                size="small"
                onClick={handelSaveData}
                disabled={tableError.isError}
              >
                <Check />
              </IconButton>
            ) : (
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setIsEdit(true)}
              >
                <EditIcon fontSize="large" />
              </IconButton>
            )}
          </TableCell>
          <TableCell>{type}</TableCell>
          {renderRow}
        </TableRow>
      ) : (
        <SkeletonTableRow row={1} column={6} />
      )}
    </>
  );
};

export default OverflowLeadTableRow;
