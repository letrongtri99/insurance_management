import React from 'react';
import { Meta } from '@storybook/react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route } from 'react-router-dom';
import themes from '../../theme';
import CommentTextBox from './CommentTextBox';
import './CommentTextBox.story.scss';

export default {
  title: 'Components/Controls/CommentTextBox',
  component: CommentTextBox,
} as Meta;

const Template = () => (
  <>
    <div style={{ width: 500 }}>
      <MemoryRouter initialEntries={['/']}>
        <MuiThemeProvider theme={themes[0]}>
          <ThemeProvider theme={themes[0]}>
            <CommentTextBox />
          </ThemeProvider>
        </MuiThemeProvider>
      </MemoryRouter>
    </div>
  </>
);

export const Basic = Template.bind({});
