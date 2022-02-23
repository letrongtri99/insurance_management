import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';
import './index.scss';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { useDispatch } from 'react-redux';
import { deleteCoupon } from 'presentation/redux/actions/leadDetail/coupon';

interface IProps {
  closeModal: (payload: boolean) => void;
}
const DeleteCouponModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(deleteCoupon());
  };

  const handleCloseModal = (status: boolean) => {
    closeModal(status);
  };

  return (
    <Grid container xs={12} md={12} lg={12} className="assign-modal">
      <Grid item xs={12} md={12} lg={12} className="assign-modal__icon-wrapper">
        <DeleteIcon fontSize="default" />
      </Grid>
      <p className="assign-modal__content">
        {getString('text.deleteCouponModal')}
      </p>
      <Grid item xs={12} md={12} lg={12} className="assign-modal__btn">
        <Controls.Button
          text={getString('text.cancelButton')}
          color="secondary"
          className="button"
          onClick={() => handleCloseModal(false)}
        />
        <Controls.Button
          text={getString('text.confirmButton')}
          color="primary"
          onClick={() => handleSubmit()}
          className="button"
        />
      </Grid>
    </Grid>
  );
};
export default DeleteCouponModal;
