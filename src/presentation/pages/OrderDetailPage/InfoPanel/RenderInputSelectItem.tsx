import React, { useEffect, useState } from 'react';
import { SelectElement } from 'shared/types/controls';
import { Colon, FieldItem } from './index.style';
import Controls from '../../../components/controls/Control';
import {
  fakeGenders,
  fakeLanguage,
  fakeTitle,
} from '../leadDetailsPage.helper';

const RenderInputSelectItem = ({
  typeSelect,
  initialValue,
  name,
  handleUpdateOrder,
  className,
}: any) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<SelectElement>) => {
    const { value: newValue } = event.target;
    setValue(newValue);
    handleUpdateOrder({
      name,
      value: newValue,
    });
  };
  return (
    <FieldItem>
      <Colon>: </Colon>
      <Controls.Select
        options={
          typeSelect === 'Gender'
            ? fakeGenders
            : typeSelect === 'Title'
            ? fakeTitle
            : fakeLanguage
        }
        selectField="name"
        title="displayName"
        name="preferredInsurer"
        value={value}
        onChange={handleChange}
        className={className}
        placeholder="Select"
      />
    </FieldItem>
  );
};

export default RenderInputSelectItem;
