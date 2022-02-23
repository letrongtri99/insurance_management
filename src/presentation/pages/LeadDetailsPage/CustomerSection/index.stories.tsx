import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route } from 'react-router-dom';
import themes from 'presentation/theme';
import CustomerSection from './index';

const mockData = {
  isCustomerActive: true,
  lead: {
    customerFirstName: 'Siriwan',
    customerLastName: 'Tongkleang',
    status: true,
    gender: 'Female',
    customerDob: '1989-03-02',
    age: '30',
    customerProvince: 'Krabi',
    customerCity: 'Ao-luk',
    customerReference: 'Rabbit2020',
    leadType: 'Renewal',
    leadReference: 'Rabbit2020',
    leadParent: 'Rabbit2020',
  },
  customerHistory: {
    numOrders: 2,
    numLeads: 1,
    previousLeadDate: `2020-11-13T10:49:05.106680Z`,
    previousVisitDate: `2020-11-13T10:49:05.106680Z`,
  },
};

export default {
  title: 'Components/LeadDetails/CustomerSection',
  component: CustomerSection,
};

const Template = (args) => (
  <MemoryRouter initialEntries={['/path/12']}>
    <Route path="/path/:12">
      <MuiThemeProvider theme={themes[0]}>
        <ThemeProvider theme={themes[0]}>
          <div className="customer-info-stories" style={{ width: '400px' }}>
            <CustomerSection {...args} />
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    </Route>
  </MemoryRouter>
);

export const Primary = Template.bind({});

Primary.args = {
  data: mockData,
};
