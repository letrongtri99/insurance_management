import React from 'react';
import moment from 'moment';
import { getString } from 'presentation/theme/localization';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface CustomContentProps {
  name: any;
  time: string;
  content: string;
}

const CustomContent = ({ name, content, time }: CustomContentProps) => {
  const useStyles = makeStyles((theme) => ({
    title: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(1),
    },
    content: {
      backgroundColor: theme.palette.info.light,
      padding: theme.spacing(1),
    },
    time: {
      paddingTop: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  const timeFormated = `${moment(time).format('DD/MM/yyy')} (${moment(
    time
  ).format('hh:mm:ss')} PM)`;

  return (
    <>
      <Typography className={classes.title} variant="body1">
        {getString('text.leftComment', {
          name: name || getString('text.systemUser'),
        })}
      </Typography>
      <Typography className={classes.content} variant="body1">
        {content}
      </Typography>
      <Typography
        className={classes.time}
        variant="body2"
        color="textSecondary"
        align="right"
      >
        {timeFormated}
      </Typography>
    </>
  );
};

export default CustomContent;
