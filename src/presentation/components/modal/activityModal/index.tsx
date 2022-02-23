import React, { useMemo, useState } from 'react';
import { Button, Dialog, Grid, makeStyles } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import ActivityTable from './activityTable';
import './index.scss';
import { dataTableList } from './activityTable/activityTable.helper';
import CommunicationTable from './CommunicationTable';
import { getString } from '../../../theme/localization';

interface IPropsActivityModal {
  openDialog: boolean;
  closeDialog: (isClose: boolean) => void;
  activeId: number;
}

const useStyles = makeStyles((theme: any) => ({
  active: {
    border: '3px solid !important',
    borderColor: `${theme.palette.primary.main} !important`,
    '&:after': {
      content: '" "',
      position: 'absolute',
      bottom: '-33px',
      right: 'auto',
      width: '15px',
      height: '15px',
      border: '12px solid',
      borderColor: `transparent transparent ${theme.palette.info.main} transparent`,
    },
  },
}));

const ActivityModal: React.FC<IPropsActivityModal> = ({
  openDialog,
  closeDialog,
  activeId,
}) => {
  const classes = useStyles();
  const { id }: { id: string } = useParams();
  const buttons = [
    {
      id: 1,
      label: getString('lead.activity'),
      content: <ActivityTable listData={dataTableList} />,
    },
    {
      id: 2,
      label: getString('lead.communication'),
      content: <CommunicationTable id={id} />,
    },
    { id: 3, label: getString('lead.assignment') },
    { id: 4, label: getString('lead.audit') },
  ];
  const activityId = 1;
  const [itemActiveId, setItemActiveId] = useState(-1);

  useMemo(() => {
    setItemActiveId(activeId);
  }, [activeId]);

  const itemHandleClick = (button: any) => {
    setItemActiveId(button.id);
  };

  const handleCloseDialog = () => {
    closeDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      aria-labelledby="form-dialog-title"
      className="activity-modal-wrap shared-common-modal"
    >
      <div className="activity-modal-override">
        <div className="modal-button-close no-background">
          <div className="close-btn">
            <Icon.Close
              onClick={() => handleCloseDialog()}
              className="unittest__activity__close-btn"
            />
          </div>
        </div>
        <Grid item container xs={12} md={12} className="activity-modal">
          <Grid item container xs={12} md={12} className="group-button">
            {buttons.map((item) => (
              <Button
                className={clsx(
                  `unittest-button-${item.id}`,
                  `${itemActiveId === item.id ? classes.active : ''}`
                )}
                key={item.id}
                onClick={() => itemHandleClick(item)}
              >
                {item.label}
              </Button>
            ))}
          </Grid>
          <Grid item container xs={12} md={12}>
            {buttons.find((item: any) => item.id === itemActiveId)?.content}
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

export default ActivityModal;
