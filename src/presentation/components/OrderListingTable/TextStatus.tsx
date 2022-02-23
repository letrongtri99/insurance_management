import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  circleStatus: (props: { color: string }) => ({
    '&:before': {
      content: '""',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: `2px solid ${props.color}`,
      display: 'inline-block',
      margin: '-1px 8px',
    },
  }),
  textColor: (props: { color: string }) => ({
    color: props.color,
  }),
});

export interface ITextStatus {
  status: 'success' | 'warning' | 'danger' | 'normal';
  label: string;
  type?: 'text' | 'circle';
}

const TextStatus = ({ status, label, type }: ITextStatus) => {
  const theme = useTheme();
  const { palette } = theme;

  const statusColors = {
    success: palette.success.main,
    warning: palette.warning.main,
    danger: palette.error.main,
    normal: palette.text.secondary,
  };

  const props = { color: statusColors[status] };
  const classes = useStyles(props);

  return (
    <span
      className={type === 'circle' ? classes.circleStatus : classes.textColor}
    >
      {label}
    </span>
  );
};

export default TextStatus;
