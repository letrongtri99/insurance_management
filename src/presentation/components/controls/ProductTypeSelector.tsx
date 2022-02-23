import WithFilterOptions from 'presentation/HOCs/WithFilterOptions';
import Select from 'presentation/components/controls/Select';
import { ProductTypeFilter } from 'config/TypeFilter';

const ProductTypeSelector = WithFilterOptions(Select, ProductTypeFilter);

export default ProductTypeSelector;
