import * as CONSTANTS from 'shared/constants';
import Type from '../../type';
import { IResource } from '../../../../../shared/interfaces/common/resource';

interface IPayLoad {
  [key: string]: number | string | boolean;
}

const getListLeadScore = (): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiUrl.scoring.getListLeadScore}`,
});

const editLeadScoreByName = (params: any): IResource => ({
  Type: Type.Public,
  Path: `/${CONSTANTS.apiEndpoint.scoreEndpoint}/${params}`,
});

export default {
  getListLeadScore,
  editLeadScoreByName,
};
