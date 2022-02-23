import React from 'react';
import MyAutocomplete from './Autocomplete/Autocomplete';

enum FilterType {
  Product = 'product',
  LeadType = 'leadType',
}

// TODO: Use hook context to update filter in other screen:
// interface TypeContext {
//   id: number;
// }
// const TypeContextProvider = React.createContext<TypeContext | null>(null);

export default function TypeSelector({
  popper,
  classes,
  type,
  label,
  name,
  value,
  onChange,
  multiple,
  disableCloseOnSelect,
  options,
  ...rest
}: any & {
  label?: string;
  type: FilterType;
  name: string;
  value: string;
  multiple: boolean;
  onChange: () => unknown;
}) {
  return (
    <MyAutocomplete
      popper={popper}
      options={options}
      onChange={onChange}
      label={label}
      name={name}
      value={value}
      multiple={multiple}
      disableCloseOnSelect={disableCloseOnSelect}
      // classes={classes}
      {...rest}
    />
  );
}

TypeSelector.defaultProps = {
  label: '',
};

/*
<Controls.TypeSelector
  type="product | leadType"
  onChange={handleChange}
  value={formData.product}
  name="product"
  label={getString('text.product')}


  single =>   multiple={false}
/>
 */
