import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import './Input.scss';

export default function Input({
  fixedLabel = false,
  placeholder,
  InputLabelProps,
  error,
  style,
  disabled = false,
  className = '',
  ...rest
}: any) {
  const [inputLabelProps, setInputLabelProps] = useState(InputLabelProps);
  useEffect(() => {
    if (fixedLabel) {
      setInputLabelProps({ ...InputLabelProps, shrink: true });
    } else if (typeof InputLabelProps === 'object' && InputLabelProps.shrink) {
      const temp = InputLabelProps;
      delete temp.shrink;
      setInputLabelProps(temp);
    }
  }, [fixedLabel]);

  return (
    <TextField
      className={`shared-input ${
        error ? 'shared-input--error' : ''
      } ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      InputLabelProps={inputLabelProps}
      InputProps={{
        disableUnderline: true,
      }}
      style={style}
      {...(error && { error: true, helperText: error })}
      {...rest}
    />
  );
}
