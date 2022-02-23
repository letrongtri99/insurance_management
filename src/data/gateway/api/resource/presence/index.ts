import Type from '../../type';
import { IResource } from '../../../../../shared/interfaces/common/resource';

const UpdatePresence = (userName?: string): IResource => ({
  Type: Type.Public,
  Path: `/api/presence/v1alpha1/${userName}/presence`,
});

export default {
  UpdatePresence,
};
