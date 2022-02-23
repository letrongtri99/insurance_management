import React from 'react';
import CommentSection from '../common/details/CommentSection';

const fakeListActivities = [
  {
    name: 'Pailin left a comment',
    createTime: '2021-07-08T03:27:20.232408Z',
    text: 'some documents still missing, but urgent case',
  },
  {
    name: 'Pailin uploaded documents',
    createTime: '2021-07-08T03:27:20.232408Z',
    text: 'ID Card',
  },
];

const CommentContainer = () => (
  <CommentSection
    comments={fakeListActivities}
    hasMore={false}
    loadMore={() => undefined}
  />
);

export default CommentContainer;
