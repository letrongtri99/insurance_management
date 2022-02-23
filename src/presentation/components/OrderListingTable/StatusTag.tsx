import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import { ITextStatus } from './TextStatus';

type IProp = {
  text: string | number | ITextStatus;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    display: 'inline-block',
    color: 'white',
    padding: '0.2rem 0.5rem',
    marginTop: '0.3rem',
    borderRadius: '0.4rem',
  },
}));

const StatusTag = ({ text }: IProp) => {
  const classes = useStyles();

  return (
    <Box component="span" className={classes.root}>
      {text}
    </Box>
  );
};

export default StatusTag;
