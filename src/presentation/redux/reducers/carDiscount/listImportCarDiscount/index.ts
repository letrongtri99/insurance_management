import { IAction } from 'shared/interfaces/common';
import { CarDiscountImportAction } from '../../../actions/carDiscount';

import {
  initialState,
  updateTokenList,
  fakeDataImportCarDiscount,
} from '../carDiscountReducer.helper';

export default function listImportCarDiscountReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case CarDiscountImportAction.GET_CAR_DISCOUNT_IMPORT: {
      const { currentPage, pageToken, pageSize, orderBy, showDeleted, filter } =
        action.payload;
      return {
        ...state,
        data: fakeDataImportCarDiscount, // Please check the data structure when we get it from API.

        isFetching: false,
        listPageToken: updateTokenList(
          state.listPageToken,
          currentPage,
          pageToken
        ),
        pageIndex: currentPage,
        pageSize,
        orderBy,
        showDeleted,
        filter,
      };
    }

    default:
      return state;
  }
}
