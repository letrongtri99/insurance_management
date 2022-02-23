import { IAction } from '../../../../shared/interfaces/common';

export enum PageActionTypes {
  DESTROY_PAGE = '[Page] DESTROY_PAGE',
}

export const destroyPage = (): IAction<any> => {
  return {
    type: PageActionTypes.DESTROY_PAGE,
  };
};
