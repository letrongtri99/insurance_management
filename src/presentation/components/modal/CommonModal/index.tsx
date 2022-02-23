import React from 'react';
import styled from 'styled-components';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import './index.scss';
import clsx from 'clsx';

const CustomDialogContent = styled(DialogContent)`
  min-width: 300px;
`;

interface ICommonModal {
  children: any;
  open: boolean;
  title: string;
  handleCloseModal(): void;
  isNotHeader?: boolean;
  wrapperClass?: string;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  isShowCloseBtn?: boolean;
  hasBorderRadius?: boolean;
  isHeaderCenter?: boolean;
  hasGreyBg?: boolean;
}
const CommonModal: React.FC<ICommonModal> = ({
  children,
  open,
  title,
  handleCloseModal,
  isNotHeader,
  wrapperClass,
  className,
  maxWidth = 'sm',
  isShowCloseBtn = true,
  hasBorderRadius,
  isHeaderCenter,
  hasGreyBg,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      className={clsx(
        'shared-common-modal',
        wrapperClass,
        hasBorderRadius && 'add-modal-border'
      )}
      maxWidth={maxWidth}
      fullWidth
    >
      <div
        className={clsx(
          'modal-header',
          isNotHeader && 'no-background',
          hasBorderRadius && 'add-border',
          isHeaderCenter && 'text-center',
          hasGreyBg && 'bg-grey'
        )}
      >
        {title ? (
          <DialogTitle className="unittest-title" id="form-dialog-title">
            {title}
          </DialogTitle>
        ) : null}
        {isShowCloseBtn && (
          <div className="close-btn">
            <Icon.Close
              className="unittest-close-button"
              onClick={handleCloseModal}
            />
          </div>
        )}
      </div>
      <CustomDialogContent>
        <div className={className || 'select-box'}>{children}</div>
      </CustomDialogContent>
    </Dialog>
  );
};
export default CommonModal;
