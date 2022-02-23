import React from 'react';
import { Paper as MuiPaper, withTheme } from '@material-ui/core';
import './ActivitySection.scss';
import styled from 'styled-components';
import ActivityTabContainer from './ActivityTab';

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
      <ActivityTabContainer />
    </Paper>
  );
};
