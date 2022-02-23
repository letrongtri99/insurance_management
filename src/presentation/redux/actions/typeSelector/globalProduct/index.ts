import { IAction } from '../../../../../shared/interfaces/common';

export enum ProductSelectorActionTypes {
  CHANGE_PRODUCT_TYPES = '[ProductSelector] CHANGE_PRODUCT_TYPES',
}

export const changeProductSelectorTypes = (payload: string): IAction<any> => {
  return {
    type: ProductSelectorActionTypes.CHANGE_PRODUCT_TYPES,
    payload,
  };
};
