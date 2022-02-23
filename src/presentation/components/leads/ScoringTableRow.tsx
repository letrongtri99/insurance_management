import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  IconButton,
  Input,
  TableCell,
  TableRow as MuiTableRow,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { getString } from 'presentation/theme/localization';
import { IScoring } from '../../models/lead/scoring';
import { ScoringTableContext } from './EditableTable';
import SkeletonTableRow from './SkeletonTableRow';
import EditIcon from '../svgicons/EditIcon';

const FALLBACK_VALUE_SCORE = 0;

const ScoringTableRow = ({
  data,
  type,
  edit,
  isLoading,
  handleSave,
}: {
  edit: boolean;
  data: IScoring;
  type: string;
  isLoading: boolean;
  handleSave: (data: IScoring) => void;
}): React.ComponentElement<any, any> => {
  const [rowData, setRowData] = useState<IScoring>({});
  const [sum, setSum] = useState<number>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { tableError, setTableError } = useContext(ScoringTableContext);

  useMemo(() => {
    setRowData(data);
  }, [data]);

  useMemo(() => {
    const rowSum =
      Number(Object.values(rowData)[0]) +
      Number(Object.values(rowData)[1]) +
      Number(Object.values(rowData)[2]);
    setSum(rowSum);
  }, [rowData]);

  useEffect(() => {
    setTableError({
      ...tableError,
      isError: sum !== 100,
      msg: getString('text.scoringError'),
    });
  }, [rowData]);

  useEffect(() => {
    setIsEdit(edit);
  }, [edit]);

  const handleSaveData = () => {
    handleSave(rowData);
  };

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target) return;
    const { name, value } = event.target as HTMLInputElement;
    let newVal = Number(value);
    newVal = newVal > 100 ? 100 : newVal;
    newVal = newVal < 0 ? 0 : newVal;

    setRowData(
      (prevState: IScoring) =>
        ({
          ...prevState,
          [name]: newVal,
        } as IScoring)
    );
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTableRow row={1} column={6} />
      ) : (
        <>
          <MuiTableRow>
            <TableCell>
              {isEdit ? (
                <IconButton
                  aria-label="save"
                  size="small"
                  onClick={handleSaveData}
                  disabled={tableError.isError}
                >
                  <Check />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  <EditIcon fontSize="large" />
                </IconButton>
              )}
            </TableCell>
            <TableCell title={type}>{type}</TableCell>
            {/* eslint-disable camelcase */}
            <TableCell>
              <Input
                title={`${Object.values(rowData)[0] || FALLBACK_VALUE_SCORE}`}
                type="number"
                name={Object.keys(rowData)[0] || ''}
                value={Object.values(rowData)[0] || FALLBACK_VALUE_SCORE}
                onChange={handleChangeValue}
                readOnly={!isEdit}
                disableUnderline={!isEdit}
                inputProps={{ min: 0, max: 100 }}
              />
            </TableCell>
            <TableCell>
              <Input
                title={`${Object.values(rowData)[1] || FALLBACK_VALUE_SCORE}`}
                type="number"
                name={Object.keys(rowData)[1] || ''}
                value={Object.values(rowData)[1] || FALLBACK_VALUE_SCORE}
                onChange={handleChangeValue}
                readOnly={!isEdit}
                disableUnderline={!isEdit}
                inputProps={{ min: 0, max: 100 }}
              />
            </TableCell>
            <TableCell>
              <Input
                title={`${Object.values(rowData)[2] || FALLBACK_VALUE_SCORE}`}
                type="number"
                name={Object.keys(rowData)[2] || ''}
                value={Object.values(rowData)[2] || FALLBACK_VALUE_SCORE}
                onChange={handleChangeValue}
                readOnly={!isEdit}
                disableUnderline={!isEdit}
                inputProps={{ min: 0, max: 100 }}
              />
            </TableCell>
            {/* eslint-enable camelcase */}
            <TableCell title={`${sum}`} className="sum-col">
              {sum}
            </TableCell>
          </MuiTableRow>
        </>
      )}
    </>
  );
};

export default ScoringTableRow;
