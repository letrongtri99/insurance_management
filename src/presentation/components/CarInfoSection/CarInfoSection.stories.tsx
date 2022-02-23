import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route } from 'react-router-dom';
import themes from 'presentation/theme';
import CarInfoSection from './CarInfoSection';

const mockData = {
  year: '2017',
  brand: 'Nissan',
  model: 'Juke',
  sumInsured: 500000,
  engineSize: 1.4,
  transmission: 'Auto',
  dashCam: true,
  purpose: 'Personal',
  province: 'Krabi',
  modification: true,
  licensePlate: '',
};

export default {
  title: 'Components/LeadDetails/CarInfoSection',
  component: CarInfoSection,
};

const Template = (args) => (
  <MemoryRouter initialEntries={['/path/12']}>
    <Route path="/path/:12">
      <MuiThemeProvider theme={themes[0]}>
        <ThemeProvider theme={themes[0]}>
          <div className="car-info-story" style={{ width: 400 }}>
            <CarInfoSection {...args} />
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    </Route>
  </MemoryRouter>
);

export const Primary = Template.bind({});

Primary.args = {
  carInfo: mockData,
  abbreviation: 'ปท',
};
