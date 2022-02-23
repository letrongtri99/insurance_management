import WithFilterOptions from 'presentation/HOCs/WithFilterOptions';
import Select from 'presentation/components/controls/Select';
import { LeadTypeFilter } from 'config/TypeFilter';
import { getString } from 'presentation/theme/localization';

const localeLeadTypeFilter = LeadTypeFilter.map((type: any) => ({
  ...type,
  title: getString(type.title),
}));

const LeadTypeSelector = WithFilterOptions(Select, localeLeadTypeFilter);

export default LeadTypeSelector;
