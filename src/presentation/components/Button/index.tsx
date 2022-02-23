import React from 'react';
import './index.scss';
import { Box, Button as MatButton, CircularProgress } from '@material-ui/core';

const Button = ({
  loading,
  children,
  text,
  style,
  size,
  variant,
  color,
  onClick,
  disabled,
  active = false,
  icon,
  ...rest
}: any & {
  text?: string;
  loading?: boolean;
  children?: any;
  style?: any;
  size?: string;
  variant?: string;
  color?: string;
  onClick?: any;
  active: boolean;
  disabled?: boolean;
}): JSX.Element => (
  <>
    <div className="shared-button">
      <MatButton
        {...rest}
        style={{ ...style, opacity: disabled ? 0.5 : 1 }}
        variant={variant}
        size={size}
        color={color}
        onClick={onClick}
        disabled={disabled}
        className={
          active
            ? `shared-button__matbutton ${rest.className} active`
            : `shared-button__matbutton ${rest.className}`
        }
      >
        {icon && (
          <Box display="flex" mr="5px">
            {icon}
          </Box>
        )}
        {text || children}
        {loading && <CircularProgress size={20} className="loading" />}
      </MatButton>
    </div>
  </>
);

Button.defaultProps = {
  loading: false,
  children: '',
  style: {},
  variant: 'contained',
  size: 'large',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
  text: '',
  color: 'default',
  disabled: false,
};

export default Button;
