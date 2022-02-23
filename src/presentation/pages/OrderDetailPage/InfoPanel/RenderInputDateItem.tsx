import React, { useEffect } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { thaiDateFormat } from 'shared/helper/thaiDateFormat';
import { Colon, FieldItem } from './index.style';

const RenderInputDateItem = ({
  name = '',
  value,
  onUpdateOrder,
  format = '',
  onHandleChangeDate,
  error = '',
  addColon = true,
  isDisabled = false,
  isPossibleInput = true,
}: {
  // INFO: base props
  value: Date | null | string;
  name: string | undefined;
  onUpdateOrder: (payload: any) => void;
  format?: string;

  // INFO: the props using for custom
  onHandleChangeDate?: (value: any) => void;
  error?: string;
  addColon?: boolean;
  isDisabled?: boolean;
  isPossibleInput?: boolean;
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null | string>(
    value
  );
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const formatDate = (date: Date | null) => {
    if (date) {
      const day = date?.getDate();
      const month = date?.getMonth() + 1;
      return `${date?.getFullYear()}-${month <= 9 ? `0${month}` : month}-${
        day <= 9 ? `0${day}` : day
      }`;
    }
    return null;
  };

  const handleAcceptDate = (date: Date | null) => {
    setSelectedDate(date);
    onUpdateOrder({
      name,
      value: formatDate(date),
    });
  };

  const onChangeDate = (val: any) => {
    if (val && onHandleChangeDate) {
      onHandleChangeDate(val);
    }
    return null;
  };

  return (
    <FieldItem>
      {addColon ? <Colon>: </Colon> : null}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          format={format || thaiDateFormat(selectedDate)}
          value={selectedDate || ''}
          onChange={onChangeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
            disabled: isDisabled,
          }}
          helperText={error}
          onAccept={handleAcceptDate}
          InputProps={{
            readOnly: !isPossibleInput,
          }}
        />
      </MuiPickersUtilsProvider>
    </FieldItem>
  );
};

export default RenderInputDateItem;
