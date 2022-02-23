import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@material-ui/core';

export default function Checkbox(props: any) {
  const { label, value, ...rest } = props;

  return (
    <FormControl className="shared-check-box">
      <FormControlLabel
        control={<MuiCheckbox checked={value} {...rest} />}
        label={label}
      />
    </FormControl>
  );
}
