import * as Yup from 'yup';
import { getString } from 'presentation/theme/localization';
import { AdminTeamModel } from '../../models/admin/team';
import { IGetUserList } from '../../../shared/interfaces/common/typeSelector/user';

export interface ICreateAdminProps {
  typeSelector: any;
  createTeam: (payload: AdminTeamModel) => void;
  getSupervisorUserSelectorTypes: (payload: IGetUserList) => void;
  getManagerUserSelectorTypes: (payload: IGetUserList) => void;
  editTeam: (payload: AdminTeamModel, name: string) => void;
  data: any;
  close: any;
}

const buildValidationSchema = (roles: string[]) => {
  return Yup.object().shape({
    teamRole: Yup.string()
      .required(getString('text.error', { field: 'Team Role' }))
      .trim(),
    insurer: Yup.array().when('teamRole', {
      is: (teamRole) => !roles.includes(teamRole),
      then: Yup.array().required(getString('text.error', { field: 'Insurer' })),
    }),
    teamName: Yup.string()
      .required(getString('text.error', { field: 'Team Name' }))
      .trim(),
    product: Yup.string().when('teamRole', {
      is: (teamRole) => roles.includes(teamRole),
      then: Yup.string().required(
        getString('text.error', { field: 'Product' })
      ),
    }),
    leadType: Yup.string().when('teamRole', {
      is: (teamRole) => roles.includes(teamRole),
      then: Yup.string().required(
        getString('text.error', { field: 'Product' })
      ),
    }),
    manager: Yup.string().required(
      getString('text.error', { field: 'Manager' })
    ),
    supervisor: Yup.string().required(
      getString('text.error', { field: 'Supervisor' })
    ),
  });
};

export interface IFormData<T> {
  teamRole: T;
  insurer: T[];
  name: string;
  teamName: string;
  product: string;
  leadType: string;
  manager: T;
  supervisor: T;
}

export type TGeneric = Record<string, string> | null;

export const formValue: IFormData<TGeneric> = {
  teamRole: null,
  insurer: [],
  name: '',
  teamName: '',
  product: '',
  leadType: '',
  manager: null,
  supervisor: null,
};
export default buildValidationSchema;
