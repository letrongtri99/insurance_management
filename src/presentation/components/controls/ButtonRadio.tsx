import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import styled from 'styled-components';
import React from 'react';

const Label = styled(FormControlLabel)`
  .checked,
  .checked + .label {
    background: red !important;
  }

  .MuiIconButton-root {
    display: none;
  }
`;

const ButtonRadio = ({ label, value, Control = Radio, ...rest }: any) => {
  return (
    <Label
      className="multiselect-form-label"
      value={value}
      control={<Control {...rest} />}
      label={label}
    />
  );
};

ButtonRadio.defaultProps = {
  control: <Radio />,
};

export default ButtonRadio;
