import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import Timeline from '@material-ui/lab/Timeline';
import React from 'react';
import CustomTimelineItem from './CustomTimelineItem';
import CustomContent from './CustomContent';

const useStyles = makeStyles(() => ({
  timeline: {
    flex: 0,
  },
  scroll: {
    padding: '10px 15px',
  },
}));

export interface IComment {
  name: string;
  createTime: string;
  text: string;
}

export interface ICommentSection {
  comments: IComment[];
  loadMore: () => any;
  hasMore: boolean;
}

const CommentSection = ({ comments, hasMore, loadMore }: ICommentSection) => {
  const classes = useStyles();

  return (
    <InfiniteScroll
      hasMore={hasMore}
      height={400}
      next={loadMore}
      dataLength={comments.length}
      loader={<h4>Loading...</h4>}
      className={classes.scroll}
    >
      <Timeline className={classes.timeline}>
        {comments.map(({ name, createTime, text }: IComment) => (
          <CustomTimelineItem key={`${name}-${createTime}`}>
            <CustomContent name={name} time={createTime} content={text} />
          </CustomTimelineItem>
        ))}
      </Timeline>
    </InfiniteScroll>
  );
};

export default CommentSection;
