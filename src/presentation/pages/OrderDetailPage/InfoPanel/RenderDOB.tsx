import { DatePicker } from '@material-ui/pickers';
import PenIcon from 'presentation/components/svgicons/PenIcon';
import React, { useEffect, useState } from 'react';
import { EditButton } from './index.style';

interface IProps {
  onClose: (value: string | Date) => void;
  value: string | Date;
}

const RenderDOB: React.FC<IProps> = ({ onClose, value }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [dateValue, setDateValue] = useState<string | Date>('');

  useEffect(() => {
    setDateValue(value);
  }, [value]);

  const onChange = (dateValue: any) => {
    setDateValue(dateValue);
  };

  return (
    <>
      {' '}
      :&nbsp;
      <DatePicker
        variant="inline"
        openTo="year"
        views={['year', 'month', 'date']}
        value={dateValue}
        format="dd/MM/yyyy"
        onChange={onChange}
        onClose={() => onClose(dateValue)}
        autoOk
        InputProps={{ disableUnderline: true }}
        className={isEdit ? 'date-time  ' : ''}
        disabled={!isEdit}
      />
      <EditButton>
        <PenIcon
          onClick={() => setIsEdit(!isEdit)}
          fontSize="small"
          color="primary"
          data-testid="pen-icon"
        />
      </EditButton>
    </>
  );
};
export default RenderDOB;
