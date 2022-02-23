import React, { useEffect, useState } from 'react';
import PenIcon from 'presentation/components/svgicons/PenIcon';
import { Colon, EditButton, FieldInput, FieldItem } from './index.style';

export interface IInputTextPayload {
  name: string;
  value: string;
}

interface IRenderInputTextItem {
  valueText: string;
  isEditable?: boolean;
  name?: string;
  handleOnEnter?: (payload: IInputTextPayload) => void;
  handleOnBlur?: (payload: IInputTextPayload) => void;
  className?: string;
  callBackEdit?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  error?: string;
}

const RenderInputTextItem = ({
  valueText,
  isEditable = false,
  name = '',
  handleOnEnter = () => null,
  handleOnBlur = () => null,
  className = '',
  callBackEdit = () => null,
  onChange = () => null,
  isError = false,
  error = '',
}: IRenderInputTextItem) => {
  const [isEditText, setIsEditText] = useState(false);
  const [valueItem, setValueItem] = useState('');

  const makeTextEditable = () => {
    if (!isError) {
      setIsEditText(!isEditText);
      callBackEdit();
    }
  };

  const handleChangeValueItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValueItem(value);
    onChange(e);
  };

  useEffect(() => {
    if (valueText) {
      setValueItem(valueText);
    }
  }, [valueText]);

  const onEnter = (ev: any) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleOnEnter({
        name,
        value: valueItem,
      });
      if (!isError) {
        setIsEditText(false);
      }
    }
  };

  const onBlur = () => {
    handleOnBlur({
      name,
      value: valueItem,
    });
  };
  return (
    <FieldItem>
      <Colon>: </Colon>
      <FieldInput
        name={name}
        value={valueItem}
        onChange={handleChangeValueItem}
        onKeyPress={onEnter}
        onBlur={onBlur}
        className={className}
        error={isError}
        helperText={error}
        inputProps={{ readOnly: !isEditText, disableUnderline: true }}
      />
      {isEditable && (
        <EditButton onClick={makeTextEditable}>
          <PenIcon fontSize="small" color="primary" />
        </EditButton>
      )}
    </FieldItem>
  );
};

export default RenderInputTextItem;
