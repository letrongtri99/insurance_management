import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route } from 'react-router-dom';
import themes from 'presentation/theme';
import InsurerInfoSection from './InsurerInfoSection';

import {
  fakeInsurerObject,
  fakeInsurers,
  fakeTypes,
} from '../../pages/LeadDetailsPage/leadDetailsPage.helper';

export default {
  title: 'Components/LeadDetails/InsurerInfoSection',
  component: InsurerInfoSection,
};

const Template = (args) => (
  <MemoryRouter initialEntries={['/path/12']}>
    <Route path="/path/:12">
      <MuiThemeProvider theme={themes[0]}>
        <ThemeProvider theme={themes[0]}>
          <div className="insurer-info-story" style={{ width: 350 }}>
            <InsurerInfoSection {...args} />
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    </Route>
  </MemoryRouter>
);

export const Primary = Template.bind({});

Primary.args = {
  insurerObject: fakeInsurerObject,
  insurers: fakeInsurers,
  types: fakeTypes,
};
