import React from 'react';
import { PauseCircleFilled } from '@material-ui/icons';
import { IconButton, makeStyles } from '@material-ui/core';

interface IProps {
  handleClick: () => void;
}

const useStyles = makeStyles({
  root: {},
  icon: {
    width: '2.5em',
    height: '2.5em',
  },
});

const Pause = (props: IProps) => {
  const classes = useStyles();
  const { handleClick } = props;
  return (
    <IconButton size="medium" onClick={handleClick}>
      <PauseCircleFilled classes={{ root: classes.icon }} />
    </IconButton>
  );
};

export default Pause;
