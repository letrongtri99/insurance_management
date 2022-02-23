import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getComment,
  clearComment,
} from 'presentation/redux/actions/leadActivity';
import { RootState } from 'presentation/redux/reducers';
import CommentSection, {
  ICommentSection,
} from 'presentation/components/common/details/CommentSection';
import CustomTab from 'presentation/components/common/details/CustomTab';
import CommentSectionContainer from './CommentSection';
import { getString } from '../../theme/localization';

export default () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const state = useSelector(
    (currentState: RootState) => currentState.leadActivityReducer.comment
  );

  async function getData(pageToken: any) {
    const name = `leads/${id}/`;
    const userPageSize = 200;
    const users = { pageSize: userPageSize };
    const comments = { name, params: { pageToken, pageSize: 5 } };
    await dispatch(getComment({ users, comments }));
  }

  const clearAllComment = async () => {
    await dispatch(clearComment());
  };

  useEffect(() => {
    clearAllComment();
    getData(state.nextPageToken);
  }, []);

  const loadMore = () => {
    if (state.nextPageToken.length > 10) {
      setTimeout(async () => {
        getData(state.nextPageToken);
      }, 1500);
    }
  };

  const props = { loadMore, getData, state };

  const tabs = [
    {
      label: getString('lead.allActivity'),
      component: <CommentSectionContainer {...props} />,
    },
    {
      label: getString('lead.communication'),
      component: <div className="fake-section" />,
    },
    {
      label: getString('lead.comment'),
      component: <CommentSectionContainer {...props} />,
    },
  ];
  return <CustomTab tabs={tabs} />;
};

export const ActivityTab = ({
  comments,
  loadMore,
  hasMore,
}: ICommentSection) => {
  const tabs = [
    {
      label: getString('lead.allActivity'),
      component: (
        <CommentSection
          comments={comments}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      ),
    },
    {
      label: getString('lead.communication'),
      component: <div className="fake-section" />,
    },
    {
      label: getString('lead.comment'),
      component: (
        <CommentSection
          comments={comments}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      ),
    },
  ];
  return <CustomTab tabs={tabs} />;
};
