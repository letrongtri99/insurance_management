import React, { useEffect, useMemo, useState } from 'react';
import RenderInputTextItem from 'presentation/pages/OrderDetailPage/InfoPanel/RenderInputTextItem';
import RenderInputSelectItem from 'presentation/pages/OrderDetailPage/InfoPanel/RenderInputSelectItem';
import RenderDOB from 'presentation/pages/OrderDetailPage/InfoPanel/RenderDOB';
import { IFieldValue, renderInputType, updateStateChange } from './helper';

interface IProps {
  objValue: IFieldValue;
  key: string;
  updateDOB: (value: string | Date) => void;
}
const RenderValue: React.FC<IProps> = ({ objValue, key, updateDOB }) => {
  const [objState, setObjState] = useState<any>(null);
  useEffect(() => {
    setObjState(objValue);
  }, [objValue]);

  const clickEditHandle = () => {
    // TODO : will be call API here
  };

  const onChangeHandle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setObjState(updateStateChange(event, objState));
  };

  const onCloseDatePicker = (value: string | Date) => {
    updateDOB(value);
  };

  const handleInput = () => {
    // TODO: will add event latter
  };

  const render = useMemo(() => {
    if (objState) {
      const arrayFields = [
        {
          id: 1,
          value: (
            <RenderInputTextItem
              valueText={objState.value}
              isEditable={objState.isEditable}
              callBackEdit={clickEditHandle}
              onChange={onChangeHandle}
              isError={objState.isError}
              error={objState.error}
              handleOnEnter={handleInput}
              handleOnBlur={handleInput}
            />
          ),
        },
        {
          id: 2,
          value: (
            <RenderInputSelectItem
              initialValue={objState.value}
              typeSelect={objState.typeSelect}
              handleUpdateOrder={handleInput}
            />
          ),
        },
        {
          id: 3,
          value: (
            <RenderDOB onClose={onCloseDatePicker} value={objState.value} />
          ),
        },
        {
          id: 4,
          value: <>{`: ${objState.value}`}</>,
        },
      ];

      return arrayFields.find((item) => item.id === renderInputType(objState))
        ?.value;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [{ ...objState }, key]);
  return <>{objState ? render : null}</>;
};

export default RenderValue;
