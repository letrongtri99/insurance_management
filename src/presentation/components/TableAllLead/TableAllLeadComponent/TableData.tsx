import { TableCell, TableRow, makeStyles } from '@material-ui/core';
import TABLE_LEAD_TYPE from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import { Link } from 'react-router-dom';
import React from 'react';
import { IData } from 'presentation/components/DataTableMyLeadHelper';
import {
  Checkbox,
  StickyTableCell,
} from 'presentation/components/table/TableStyledComponent';
import { Column } from '../TableAllLead.helper';
import FolderOpenIcon from '../../svgicons/FolderOpenIcon';
import PlayIcon from '../../svgicons/PlayIcon';

interface IProps {
  leadData: any;
  page: number;
  rowsPerPage: number;
  tableType: string;
  changeCheckedItem: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: IData
  ) => void;
  handleVoiceModal: (payload: string) => void;
  configTable: Column[];
}

const useStyles = makeStyles({
  statusGreen: {
    color: '#1AA886',
    '&:before': {
      content: '""',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: '2px solid #1AA886',
      display: 'inline-block',
      margin: '-1px 8px',
    },
  },
  statusOrange: {
    color: '#FF9D00',
    '&:before': {
      content: '""',
      width: '12px',
      height: '12px',
      'border-radius': '50%',
      border: '2px solid #FF9D00',
      display: 'inline-block',
      margin: '-1px 8px',
    },
  },
  statusGray: {
    color: '#A9A9A9',
    '&:before': {
      content: '""',
      width: '12px',
      height: '12px',
      'border-radius': '50%',
      border: '2px solid #A9A9A9',
      display: 'inline-block',
      margin: '-1px 8px',
    },
  },
});

const TableData: React.FC<IProps> = ({
  leadData,
  page,
  rowsPerPage,
  tableType,
  changeCheckedItem,
  configTable,
  handleVoiceModal,
}) => {
  const classes = useStyles();

  const noneRejectedStatus = (rejections: any[]) => {
    const isPending = !!rejections.find((item) => !item.decideTime);
    return isPending ? classes.statusOrange : classes.statusGreen;
  };

  return leadData
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
            {tableType === TABLE_LEAD_TYPE.LEAD_ASSIGNMENT ||
            tableType === TABLE_LEAD_TYPE.LEAD_REJECTION ? (
              <TableCell component="div" className="remove-padding">
                <Checkbox
                  checked={row.isChecked}
                  onChange={(event) => {
                    changeCheckedItem(event, row);
                  }}
                  data-cy="checkbox-lead"
                />
              </TableCell>
            ) : null}
            <TableCell
              align="center"
              component="div"
              className="remove-padding"
              style={{ paddingLeft: 36 }}
            >
              <Link to={`/lead/${row.leadDetailId}`} target="_blank">
                <FolderOpenIcon fontSize="large" />
              </Link>
            </TableCell>
            {tableType === TABLE_LEAD_TYPE.LEAD_REJECTION ? (
              <TableCell
                align="center"
                component="div"
                className="remove-padding"
                onClick={() => {
                  handleVoiceModal(row.leadDetailId);
                }}
              >
                <PlayIcon fontSize="large" />
              </TableCell>
            ) : null}
          </StickyTableCell>

          {configTable.map((column: any) => {
            const value = row[column.id];

            if (column.id === 'leadStatus') {
              return (
                <TableCell
                  key={Math.random()}
                  align={column.align}
                  title={value}
                  className={
                    row.isRejected
                      ? classes.statusGray
                      : noneRejectedStatus(row.rejections)
                  }
                >
                  {value}
                  {column.customField && column.icon}
                </TableCell>
              );
            }

            return (
              <TableCell
                key={Math.random()}
                align={column.align}
                title={value}
                style={{
                  whiteSpace:
                    column.id === 'rejectedDate' ||
                    column.id === 'rejectionReason'
                      ? 'normal'
                      : 'nowrap',
                }}
              >
                {value}
                {column.customField && column.icon}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
};

export default TableData;
