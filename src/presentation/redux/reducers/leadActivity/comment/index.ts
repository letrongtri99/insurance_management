import { IAction } from 'shared/interfaces/common';
import { LeadActivityTypes } from 'presentation/redux/actions/leadActivity/comment';

const initialState = {
  comments: [],
  nextPageToken: '',
  isCommentCreating: false,
  isFetching: false,
  error: '',
};

export default function getComment(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case LeadActivityTypes.CLEAR_ALL_COMMENT: {
      return {
        ...state,
        comments: [],
      };
    }

    case LeadActivityTypes.GET_COMMENT: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case LeadActivityTypes.GET_COMMENT_FAIL: {
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    }

    case LeadActivityTypes.GET_COMMENT_SUCCESS: {
      const { comments, nextPageToken } = action.payload;
      return {
        ...state,
        comments: [...state.comments, ...comments],
        nextPageToken,
        isFetching: false,
      };
    }

    case LeadActivityTypes.GET_COMMENT_AFTER_CREATE: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case LeadActivityTypes.GET_COMMENT_AFTER_CREATE_FAIL: {
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    }

    case LeadActivityTypes.GET_COMMENT_AFTER_CREATE_SUCCESS: {
      const { comments, nextPageToken } = action.payload;
      return {
        ...state,
        comments: [...comments],
        nextPageToken,
        isFetching: false,
      };
    }

    default:
      return state;
  }
}
