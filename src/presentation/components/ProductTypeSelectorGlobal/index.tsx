import React, { useEffect, useState } from 'react';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { useDispatch } from 'react-redux';
import { changeProductSelectorTypes } from 'presentation/redux/actions/typeSelector/globalProduct';
import ProductOptions from 'shared/constants/productOptions';
import { Color } from 'presentation/theme/variants';
import { initialProduct } from '../../redux/reducers/typeSelector/globalProduct';

const ProductTypeSelectorGlobal = () => {
  const [value, setValue] = useState<string>(initialProduct);
  const dispatch = useDispatch();

  const localeProducts = ProductOptions.map((prod) => ({
    ...prod,
    title: getString(prod.title),
  }));

  useEffect(() => {
    dispatch(changeProductSelectorTypes(value));
  }, []);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setValue(e.target.value);
    dispatch(changeProductSelectorTypes(e.target.value));
  };

  return (
    <Controls.Select
      value={value}
      onChange={handleChange}
      selectField="value"
      options={localeProducts}
      color={Color.BLUE_BOLD}
    />
  );
};

export default ProductTypeSelectorGlobal;
