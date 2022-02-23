import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import RenderColumn from './RenderColumn';

const item = {
  firstName: {
    value: 'John',
  },
};
const wrapper = shallow(
  <MuiThemeProvider
    theme={{
      palette: {
        gray: {
          200: '#eee',
        },
      },
    }}
  >
    <RenderColumn item={item} updateDOB={() => jest.fn()} />
  </MuiThemeProvider>
);
describe('<RenderColumn/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
