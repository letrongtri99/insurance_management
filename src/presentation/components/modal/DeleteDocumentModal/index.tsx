import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Box } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import styled from 'styled-components';

interface IProps {
  handleOpenCloseModal: () => void;
  handleRemoveDocument: () => void;
  documentType: string;
}

const ModalContainer = styled(Grid)`
  flex-direction: column;
  align-items: center;
  padding: 100px 50px;
`;

const IconWrapper = styled(Grid)`
  display: flex;
  background: #d4d4d4;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-basis: auto !important;

  svg {
    font-size: 50px;
    color: #969696;
  }
`;

const ControlButton = styled(Controls.Button)`
  text-transform: uppercase;
`;

const ButtonContainer = styled(Grid)`
  display: flex;
`;

const DeleteDocumentModal: React.FC<IProps> = ({
  handleOpenCloseModal,
  handleRemoveDocument,
  documentType,
}) => {
  return (
    <ModalContainer container xs={12} md={12} lg={12}>
      <IconWrapper item xs={12} md={12} lg={12}>
        <DeleteIcon fontSize="default" />
      </IconWrapper>
      <Box fontSize={20} fontWeight={700} mt={5} mb={5}>
        {getString('text.deleteDocumentModal', {
          type: documentType,
        })}
      </Box>
      <ButtonContainer item xs={12} md={12} lg={12}>
        <ControlButton
          text={getString('text.cancelButton')}
          color="secondary"
          onClick={handleOpenCloseModal}
        />
        <ControlButton
          text={getString('text.confirmButton')}
          color="primary"
          onClick={handleRemoveDocument}
        />
      </ButtonContainer>
    </ModalContainer>
  );
};
export default DeleteDocumentModal;
