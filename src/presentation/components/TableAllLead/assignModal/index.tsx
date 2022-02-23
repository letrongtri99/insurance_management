import React from 'react';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { Grid } from '@material-ui/core';
import './assignModal.scss';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { TypeAssign } from '../TableAllLead.helper';

interface IProps {
  closeModal: (payload: boolean) => void;
  type: string;
  quantity: number;
  handleConfirm: (val: string) => void;
  typeAssign?: string;
}

const AssignModal: React.FC<IProps> = ({
  closeModal,
  type,
  quantity,
  handleConfirm,
  typeAssign,
}) => {
  const handleConfirmAssignLead = (assignType: string) => {
    handleConfirm(assignType);
  };

  const handleCloseModal = (status: boolean) => {
    closeModal(status);
  };

  return (
    <Grid container xs={12} md={12} lg={12} className="assign-modal">
      <Grid item xs={12} md={12} lg={12} className="assign-modal__icon-wrapper">
        <CropOriginalIcon />
      </Grid>
      <p className="assign-modal__content">
        {`${getString('text.doYouWantTo')} ${
          type === TypeAssign.ASSIGN
            ? getString('text.assign')
            : getString('text.unassign')
        } ${quantity} ${
          quantity < 2
            ? getString(`text.${typeAssign}Assign`)
            : getString(`text.${typeAssign}sAssign`)
        }?`}
      </p>
      <Grid item xs={12} md={12} lg={12} className="assign-modal__btn">
        <Controls.Button
          text="Cancel"
          color="primary"
          className="button"
          onClick={() => handleCloseModal(false)}
        />
        <Controls.Button
          text="Confirm"
          color="primary"
          onClick={() => handleConfirmAssignLead(type)}
          className="button"
          data-cy="button-assign-handle"
        />
      </Grid>
    </Grid>
  );
};
export default AssignModal;
