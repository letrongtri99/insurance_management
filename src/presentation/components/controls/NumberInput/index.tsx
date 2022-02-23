import React from 'react';
import NumberFormat from 'react-number-format';
import Controls from '../Control';

interface INumberFormat {
  suffix?: string;
  thousandSeparator?: boolean | string;
  allowLeadingZeros?: boolean;
  onValueChange: (values: any) => void;
  allowNegative?: boolean;
  value?: number;
  name?: string;
  placeholder?: string;
  onBlur?: any;
  error?: any;
  disabled?: boolean;
  label?: string;
  fixedLabel?: boolean;
  className?: string;
}

export interface INumberFormatInputValue {
  floatValue: number;
  formattedValue: string;
  value: string;
}

const NumberInput: React.FC<INumberFormat> = ({
  suffix = '',
  thousandSeparator = true,
  allowLeadingZeros = true,
  allowNegative = false,
  onValueChange,
  name,
  value,
  placeholder,
  onBlur,
  error,
  disabled = false,
  label,
  fixedLabel,
  className,
}) => {
  return (
    <NumberFormat
      suffix={suffix}
      thousandSeparator={thousandSeparator}
      allowLeadingZeros={allowLeadingZeros}
      allowNegative={allowNegative}
      customInput={Controls.Input}
      name={name}
      value={value}
      placeholder={placeholder}
      onValueChange={onValueChange}
      onBlur={onBlur}
      // Input Props
      error={error}
      disabled={disabled}
      fixedLabel={fixedLabel}
      label={label}
      className={className}
      autoComplete="off"
    />
  );
};

export default NumberInput;
