import React from 'react';

import TypeSelector from './TypeSelector';
import { ProductTypeFilter, LeadTypeFilter } from '../../../config/TypeFilter';
import { getString } from '../../theme/localization';

export default {
  title: 'Components/Controls/TypeSelector',
  component: TypeSelector,
};

const Template = (args) => <TypeSelector {...args} />;

export const Property = Template.bind({});
Property.args = {
  label: 'text.product',
  options: ProductTypeFilter,
};

const localeLeadTypeFilter = LeadTypeFilter.map((type) => ({
  ...type,
  title: getString(type.title),
}));

export const LeadType = Template.bind({});
LeadType.args = {
  label: getString('text.leadType'),
  options: localeLeadTypeFilter,
};
