import * as CONSTANTS from 'shared/constants';
import Type from '../../type';
import { IResource } from '../../../../../shared/interfaces/common/resource';
import { IPayLoad, queryString } from '../../helper/queryString.helper';

const getTeams = (payload: IPayLoad & { orderBy?: string[] }): IResource => ({
  Type: Type.Public,
  Path: `/api/${CONSTANTS.apiEndpoint.viewTeamEndpoint}/teams?${queryString(
    payload
  )}${payload.orderBy || ''}`,
});

const lookupTeam = (): IResource => {
  return {
    Type: 'nest',
    Path: `/${CONSTANTS.apiUrl.team.lookupTeam}`,
  };
};

const lookupTeamSupervisors = (): IResource => {
  return {
    Type: 'nest',
    Path: `/${CONSTANTS.apiUrl.team.lookupTeamSupervisors}`,
  };
};

const lookupTeamManagers = (): IResource => {
  return {
    Type: 'nest',
    Path: `/${CONSTANTS.apiUrl.team.lookupTeamManagers}`,
  };
};

const lookupTeamByProduct = (payload: string): IResource => {
  return {
    Type: 'nest',
    Path: `/${CONSTANTS.apiUrl.user.lookUpUser}?product=${payload}`,
  };
};

const getElasticsearchTeam = (): IResource => {
  return {
    Type: 'nest',
    Path: `/${CONSTANTS.apiEndpoint.createByTeam}`,
  };
};

export default {
  getTeams,
  lookupTeam,
  lookupTeamByProduct,
  getElasticsearchTeam,
  lookupTeamSupervisors,
  lookupTeamManagers,
};
