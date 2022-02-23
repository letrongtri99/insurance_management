import React, { useState } from 'react';
import './index.scss';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CommonModal from 'presentation/components/modal/CommonModal';
import DeleteCouponModal from 'presentation/components/modal/LeadDetailsModal/deleteCouponModal';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getString } from 'presentation/theme/localization';

interface ICouponTagProps {
  couponCode: string;
  leadStatus: string;
}

const purchaseStatus = 'PURCHASE';

const CouponTag: React.FC<ICouponTagProps> = ({ couponCode, leadStatus }) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const handleClick = () => {
    if (leadStatus !== purchaseStatus) {
      return setShowConfirmModal(true);
    }
    return null;
  };

  return (
    <>
      <div className="coupon-tag">
        <div className="coupon-tag__code">
          <span>{getString('text.coupon')}</span>
          <span> : </span>
          <span>{couponCode}</span>
        </div>
        <IconButton
          className="coupon-tag__icon"
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => handleClick()}
        >
          <CancelIcon />
        </IconButton>
        <CommonModal
          title=""
          open={showConfirmModal}
          handleCloseModal={() => {
            setShowConfirmModal(false);
          }}
        >
          <DeleteCouponModal closeModal={setShowConfirmModal} />
        </CommonModal>
      </div>
      {leadStatus === purchaseStatus ? (
        <FormHelperText error>
          {getString('text.couponValidateMessage')}
        </FormHelperText>
      ) : (
        ''
      )}
    </>
  );
};

export default CouponTag;
