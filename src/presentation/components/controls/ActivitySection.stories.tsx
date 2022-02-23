import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import ActivitySection, {
  ActivityTab,
  ButtonRowContainer,
  CommentTextBox,
} from '../ActivitySection';
import themes from '../../theme';

export default {
  title: 'Components/Controls/ActivitySection',
  component: <ActivitySection />,
};

const ButtonRowTemplate = () => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <MuiThemeProvider theme={themes[0]}>
        <div style={{ width: '600px' }}>
          <ButtonRowContainer />
        </div>
      </MuiThemeProvider>
    </MemoryRouter>
  );
};

const ActivityTabTemplate = () => {
  const mockData = {
    comments: [
      {
        createTime: '2020-11-12T09:19:08.133953Z',
        name: 'attila',
        text: 'akmd',
      },
      {
        createTime: '2020-11-12T09:19:08.133953Z',
        name: 'attila',
        text: 'akmd',
      },
    ],
    loadMore: () => {
      console.log('Load more');
    },
    hasMore: false,
  };

  return (
    <div style={{ width: '600px' }}>
      <ActivityTab
        comments={mockData.comments}
        loadMore={mockData.loadMore}
        hasMore={mockData.hasMore}
      />
    </div>
  );
};

const CommentBoxTemplate = () => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <MuiThemeProvider theme={themes[0]}>
        <div style={{ width: '400px' }}>
          <CommentTextBox />
        </div>
      </MuiThemeProvider>
    </MemoryRouter>
  );
};

export { ActivityTabTemplate, ButtonRowTemplate, CommentBoxTemplate };
