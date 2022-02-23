import WithFilterOptions from 'presentation/HOCs/WithFilterOptions';
import { ProductTypeFilter } from 'config/TypeFilter';
import TypeSelector from './TypeSelector';

const ProductTypeMultiSelector = WithFilterOptions(
  TypeSelector,
  ProductTypeFilter
);

export default ProductTypeMultiSelector;
