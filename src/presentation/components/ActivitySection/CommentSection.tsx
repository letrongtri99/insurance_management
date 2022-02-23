import React, { useState, useEffect } from 'react';
import CommentSection from '../common/details/CommentSection';

export default function CommentContainer({ loadMore, state }: any) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (state.comments.length > 0) {
      setComments(state.comments);
    }
  }, [state.comments]);

  return (
    <CommentSection
      comments={comments}
      loadMore={loadMore}
      hasMore={state.nextPageToken.length > 10 || false}
    />
  );
}
