import React from 'react';
import Controls from 'presentation/components/controls/Control';
import CommonModal from 'presentation/components/modal/CommonModal';
import AddressModal from 'presentation/components/modal/LeadDetailsModal/AddressModal';
import EmailModal from 'presentation/components/modal/LeadDetailsModal/EmailModal';
import PhoneModal from 'presentation/components/modal/LeadDetailsModal/PhoneModal';
import OrderUpdateModal from 'presentation/components/modal/OrderDetailModal/UpdateModal';

enum ButtonType {
  Email = 'email',
  Address = 'address',
  Phone = 'phone',
  OrderUpdate = 'update--order',
}

interface IButtonProps {
  open: boolean;
  handleCloseModal: () => void;
  type: 'email' | 'address' | 'phone' | 'update--order';
  text?: string;
  close: () => void;
  title: string;
  children: any;
  onClick: () => void;
  modalClass: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  warning?: any;
  hasGreyBg?: any;
}

const CommonButton = ({
  open,
  handleCloseModal,
  type,
  text = '',
  close,
  title,
  children,
  modalClass = '',
  warning = null,
  hasGreyBg,
  ...rest
}: IButtonProps) => {
  const filterModal: any = {
    [ButtonType.Email]: <EmailModal close={close} />,
    [ButtonType.Address]: <AddressModal close={close} />,
    [ButtonType.Phone]: <PhoneModal close={close} />,
    [ButtonType.OrderUpdate]: (
      <OrderUpdateModal
        close={close}
        warning={warning}
        data-testid="order-update-modal"
      />
    ),
  };

  return (
    <>
      <Controls.Button className="shared-button__matbutton" {...rest}>
        {text || children}
      </Controls.Button>

      <CommonModal
        title={title}
        open={open}
        handleCloseModal={handleCloseModal}
        className={modalClass}
        wrapperClass="scroll-address-modal"
        hasGreyBg={hasGreyBg}
      >
        {filterModal[type]}
      </CommonModal>
    </>
  );
};

CommonButton.defaultProps = {
  text: '',
  variant: 'contained',
  color: 'default',
  size: 'medium',
};

export default CommonButton;
