import React, { useMemo, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from '@material-ui/core';
import './index.scss';
import { Alert } from '@material-ui/lab';
import { IScoringTableBase } from '../../../models/lead/scoring';
import { getString } from '../../../theme/localization';

export const ScoringTableContext = React.createContext<any>({});
interface IProp {
  table: IScoringTableBase;
  tableRenderRows: (props: any) => any;
  columns: any;
  tableTitle?: string;
}

const EditableTable = ({
  table,
  tableTitle,
  columns,
  tableRenderRows,
}: IProp) => {
  const [tableError, setTableError] = useState<any>({
    isError: false,
    msg: '',
  });

  const renderRow = useMemo(() => {
    return tableRenderRows(table);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);
  return (
    <ScoringTableContext.Provider value={{ tableError, setTableError }}>
      {tableTitle && (
        <Typography variant="h3" style={{ marginBottom: 10, marginLeft: 40 }}>
          {getString(tableTitle)}
        </Typography>
      )}
      <TableContainer component={Paper} className="shared-editable-table">
        <Table aria-label="simple table">
          <TableHead>
            <MuiTableRow>
              <TableCell className="table-cell" />
              {columns}
            </MuiTableRow>
          </TableHead>
          <TableBody>{renderRow}</TableBody>
        </Table>
        {tableError?.isError && (
          <Alert severity="error">{tableError.msg}</Alert>
        )}
      </TableContainer>
    </ScoringTableContext.Provider>
  );
};

EditableTable.defaultProps = {
  tableTitle: '',
};

export default EditableTable;
