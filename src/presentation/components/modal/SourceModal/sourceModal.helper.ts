import * as Yup from 'yup';
import { ILeadSources } from 'shared/interfaces/common/lead/sources';

export const getInitialLeadSources = (): ILeadSources => {
  return {
    product: '',
    online: false,
    hidden: false,
    source: '',
    medium: '',
    campaign: '',
    score: '',
  };
};

// INFO: Just fake data, remove later
export const getFakeLeadSources = (): ILeadSources => {
  return {
    name: 'sources/3d53000e-935f-414b-a432-53811fd0ee47',
    product: 'products/health-insurance',
    online: false,
    hidden: true,
    source: 'source test 4 5',
    medium: '',
    campaign: '',
  };
};

export const createValidationSchema = () => {
  return Yup.object().shape({
    source: Yup.string().trim().required('Required'),
    hidden: Yup.string().trim().required('Required'),
    score: Yup.string().trim().required('Required'),
  });
};
