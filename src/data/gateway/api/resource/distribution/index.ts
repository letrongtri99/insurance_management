import Type from '../../type';
import { IResource } from '../../../../../shared/interfaces/common/resource';

const GetRetainer = (): IResource => ({
  Type: Type.Public,
  Path: `/api/assign/v1alpha1/products/car-insurance/distribution/leadtypes/retainer`,
});

const GetNewLeads = (): IResource => ({
  Type: Type.Public,
  Path: `/api/assign/v1alpha1/products/health-insurance/distribution/leadtypes/new`,
});

const UpdateNewLeads = (): IResource => ({
  Type: Type.Public,
  Path: `/api/assign/v1alpha1/products/health-insurance/distribution/leadtypes/new`,
});

const UpdateRetainerLeads = (): IResource => ({
  Type: Type.Public,
  Path: `/api/assign/v1alpha1/products/car-insurance/distribution/leadtypes/retainer`,
});

export default {
  GetRetainer,
  GetNewLeads,
  UpdateNewLeads,
  UpdateRetainerLeads,
};
