import React from 'react';
import { IField } from './type';
import RenderInputTextItem from './RenderInputTextItem';
import RenderInputDateItem from './RenderInputDateItem';
import { Field, FieldItem } from './index.style';
import { getFieldTitle } from '../leadDetailsPage.helper';
import RenderInputSelectItem from './RenderInputSelectItem';

const RenderItem: React.FC<any> = ({ props, handleUpdateOrder }: any) => {
  let ComponentRender;

  return props.map((field: IField) => {
    if (field.type === 'text') {
      ComponentRender = (
        <RenderInputTextItem
          valueText={field.value as string}
          isEditable={field.isEditable}
          handleOnBlur={field.onChange ?? handleUpdateOrder}
          handleOnEnter={field.onChange ?? handleUpdateOrder}
          name={field.name}
        />
      );
    } else if (field.type === 'select') {
      ComponentRender = (
        <RenderInputSelectItem
          typeSelect={field.title}
          initialValue={field.value}
          handleUpdateOrder={handleUpdateOrder}
          name={field.name}
        />
      );
    } else {
      ComponentRender = (
        <RenderInputDateItem
          value={field.value as Date | null}
          onUpdateOrder={handleUpdateOrder}
          name={field.name}
        />
      );
    }

    return (
      <Field key={field.title}>
        <FieldItem>{getFieldTitle(field.title)}</FieldItem>
        {ComponentRender}
      </Field>
    );
  });
};

export default RenderItem;
