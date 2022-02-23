import React from 'react';
import { Paper as MuiPaper, withTheme } from '@material-ui/core';
import './ActivitySection.scss';
import styled from 'styled-components';
import ButtonRowContainer from './ButtonRow';
import ActivityTabContainer, { ActivityTab } from './ActivityTab';
import CommentTextBox from '../CommentTextBox/CommentTextBox';

const Paper = withTheme(styled(MuiPaper)`
  &&& {
    background: white;
    border: 1px solid ${({ theme }) => theme.border.color};
    border-radius: 6px;

    .MuiButton-outlinedPrimary {
      border: 1px solid ${({ theme }) => theme.palette.info.main};
    }
  }
`);

export default () => {
  return (
    <Paper elevation={3} component="div" className="activity-section">
      <ButtonRowContainer />
      <CommentTextBox />
      <ActivityTabContainer />
    </Paper>
  );
};

export { ButtonRowContainer, ActivityTab, CommentTextBox };
