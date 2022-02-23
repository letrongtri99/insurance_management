import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import './KeyBoardDatePicker.scss';

interface IKeyBoardDatePicker {
  name: string;
  value: string;
  className: string;
  onChange: (date: MaterialUiPickersDate, value?: string | null) => void;
  invalidDateMessage: boolean;
  minDateMessage: boolean;
  autoOk: boolean; // Auto close after select Date
  disableToolbar: boolean;
  fixedLabel: boolean;
  InputLabelProps?: any;
  label?: string;
  placeholder?: string;
  helperText?: string;
}

const KeyBoardDatePicker: React.FC<IKeyBoardDatePicker> = ({
  name,
  value,
  onChange,
  invalidDateMessage,
  minDateMessage,
  autoOk,
  disableToolbar,
  fixedLabel = false,
  InputLabelProps,
  helperText,
  ...rest
}) => {
  const [inputLabelProps, setInputLabelProps] = useState(InputLabelProps);
  const [isBlur, setIsBlur] = useState(false);
  const dateRef = useRef(null);
  useEffect(() => {
    if (fixedLabel) {
      setInputLabelProps({ ...InputLabelProps, shrink: true });
    } else if (typeof InputLabelProps === 'object' && InputLabelProps.shrink) {
      const temp = InputLabelProps;
      delete temp.shrink;
      setInputLabelProps(temp);
    }
  }, [InputLabelProps, fixedLabel]);

  const handleBlur = () => {
    setIsBlur(true);
  };

  const errorElement = (error: string) => {
    return <span className="error-text">{error}</span>;
  };

  const isDateError = useMemo(() => {
    return !value && isBlur;
  }, [value, isBlur]);

  return (
    <KeyboardDatePicker
      name={name}
      ref={dateRef}
      value={value}
      variant="inline"
      inputVariant="outlined"
      format="dd/MM/yyyy"
      onChange={onChange}
      invalidDateMessage={invalidDateMessage}
      minDateMessage={minDateMessage}
      autoOk={autoOk}
      disableToolbar={disableToolbar}
      keyboardIcon={<DateRangeIcon />}
      InputLabelProps={inputLabelProps}
      onBlur={handleBlur}
      error={isDateError}
      helperText={isDateError ? errorElement(helperText || '') : null}
      autoComplete="off"
      {...rest}
    />
  );
};

export default KeyBoardDatePicker;
