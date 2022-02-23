import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ActivityModal from '../modal/activityModal';
import { getString } from '../../theme/localization';

interface IActivity {
  sequenceNumber: number;
  userName: string;
  date: string;
  status: string;
  summary: string;
}

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    { id: 1, label: getString('lead.activity') },
    { id: 2, label: getString('lead.communication') },
    { id: 3, label: getString('lead.assignment') },
    { id: 4, label: getString('lead.audit') },
  ];

  const [itemActiveId, setItemActiveId] = useState(0);

  const itemHandleClick = (button: any) => {
    setIsOpen(true);
    setItemActiveId(button.id);
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: theme.spacing(4),
    },
  }));
  const classes = useStyles();
  const setIsAddLeadSuccess = (flag: boolean) => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className={classes.container}>
        {buttons.map((item) => (
          <Button
            variant="outlined"
            color="primary"
            key={item.id}
            onClick={() => itemHandleClick(item)}
            style={{ minHeight: 40, marginRight: 16 }}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <Grid item xs={12} lg={12}>
        <ActivityModal
          openDialog={isOpen}
          closeDialog={() => setIsAddLeadSuccess(false)}
          activeId={itemActiveId}
        />
      </Grid>
    </div>
  );
};
