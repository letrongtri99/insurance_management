import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import LeadImportDefault from 'images/icons/lead.svg';
import { RejectionType } from '../TableRejectionLead.helper';

export const useStyles = makeStyles(() => ({
  root: {
    padding: '100px 50px',
  },
  wrapper: {
    display: 'flex',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 'auto !important',
  },
  icon: {
    fontSize: '50px',
    color: '#969696',
  },
  text: {
    fontSize: '20px',
    fontWeight: 700,
  },
}));

interface IProps {
  closeModal: (payload: boolean) => void;
  type: string;
  quantity: number;
  handleConfirm: (val: string) => void;
}

const LeadRejectionModal: React.FC<IProps> = ({
  closeModal,
  type,
  quantity,
  handleConfirm,
}) => {
  const classes = useStyles();
  const handleConfirmApproveLead = (rejectionType: string) => {
    handleConfirm(rejectionType);
  };

  const handleCloseModal = (status: boolean) => {
    closeModal(status);
  };

  return (
    <Grid
      container
      xs={12}
      md={12}
      lg={12}
      direction="column"
      alignItems="center"
      classes={{ root: classes.root }}
    >
      <Grid item xs={12} md={12} lg={12} classes={{ root: classes.wrapper }}>
        <img
          style={{ width: '100%' }}
          className="placeholder-image"
          alt="placeholder-add-lead"
          src={LeadImportDefault}
        />
      </Grid>
      <p className={classes.text}>
        {`Do you want ${
          type === RejectionType.APPROVE ? 'approve' : 'decline'
        } ${quantity} ${quantity < 2 ? 'lead' : 'leads'} ?`}
      </p>
      <Grid container justify="center" xs={12} md={12} lg={12}>
        <Controls.Button
          text="Cancel"
          color="primary"
          className="button"
          onClick={() => handleCloseModal(false)}
        />
        <Controls.Button
          text="Confirm"
          color="primary"
          onClick={() => handleConfirmApproveLead(type)}
          className="button"
        />
      </Grid>
    </Grid>
  );
};
export default LeadRejectionModal;
