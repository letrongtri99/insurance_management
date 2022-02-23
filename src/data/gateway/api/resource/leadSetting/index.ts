import * as CONSTANTS from 'shared/constants';
import Type from '../../type';
import { IResource } from '../../../../../shared/interfaces/common/resource';

interface IPayLoad {
  [key: string]: number | string | boolean;
}

const getAllNewlead = (): IResource => ({
  Type: Type.Public,
  Path: `/api/${CONSTANTS.apiUrl.leadSetting.getAll}/car-insurance/overflow/leadtypes/new/ranks`,
});

const getAllRetainerlead = (): IResource => ({
  Type: Type.Public,
  Path: `/api/${CONSTANTS.apiUrl.leadSetting.getAll}/car-insurance/overflow/leadtypes/retainer/ranks`,
});

const editNewLead = (productName: string): IResource => ({
  Type: Type.Public,
  Path: `/api/${CONSTANTS.apiUrl.leadSetting.editOverflow}/${productName}`,
});

const editRetainerlead = (productName: string): IResource => ({
  Type: Type.Public,
  Path: `/api/${CONSTANTS.apiUrl.leadSetting.editOverflow}/${productName}`,
});

export default {
  getAllNewlead,
  getAllRetainerlead,
  editNewLead,
  editRetainerlead,
};
