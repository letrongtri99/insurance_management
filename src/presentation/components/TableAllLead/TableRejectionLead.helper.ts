import { makeStyles } from '@material-ui/core';
import { Column } from './TableAllLead.helper';

export enum RejectionType {
  APPROVE = 'APPROVE',
  DECLINE = 'DECLINE',
}

export const leadRejectionColumn: Column[] = [
  {
    id: 'rejectionComment',
    label: 'Rejection comment',
    sorting: 'none',
    minWidth: 80,
    sortingField: '',
    isNotSorting: true,
  },
  {
    id: 'rejectionReason',
    label: 'Rejection reason',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'rejections.reason',
  },
  {
    id: 'rejectedDate',
    label: 'Rejected date',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'rejections.decideTime',
  },
];

export const voiceModalStyles = makeStyles({
  voiceModalDialog: {
    '& .MuiDialog-container': {
      height: '70%',
    },
    '& .MuiDialogContent-root': {
      paddingLeft: '0px',
      position: 'relative',
    },
  },
  voiceFileIcon: {
    width: '1.5em',
    height: '1.5em',
    cursor: 'pointer',
  },
  tableCell: {
    whiteSpace: 'normal',
  },
  voiceModalMessage: {
    minHeight: '144px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
});
