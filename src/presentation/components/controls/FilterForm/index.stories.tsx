import React from 'react';
import Grid from '@material-ui/core/Grid';
import { IFilterFormField } from '../../../../shared/interfaces/common';
import { getString } from '../../../theme/localization';
import Controls from '../Control';
import FilterForm from './index';
import { TeamName, Manager } from '../../../../mock-data/AdminPage.mock';

const initialFormData = {
  date: { criteria: '', range: {} },
  teamName: [],
  product: [],
  leadType: [],
  manager: [],
  supervisor: [],
  createdBy: [],
  userCount: [0, 0],
};

const filterFormFields: IFilterFormField[] = [
  {
    Tag: Controls.Autocomplete,
    name: 'teamName',
    label: 'text.teamName',
    value: initialFormData.teamName,
    onChange: (e: any) => {
      console.log(e);
    },
    options: TeamName,
  },
  {
    Tag: Controls.Autocomplete,
    name: 'manager',
    label: getString('text.manager'),
    value: initialFormData.manager,
    onChange: (e: any) => {
      console.log(e);
    },
    options: Manager,
  },
  {
    Tag: Controls.Autocomplete,
    name: 'supervisor',
    label: getString('text.supervisor'),
    value: initialFormData.supervisor,
    onChange: (e: any) => {
      console.log(e);
    },
    options: Manager,
  },
  {
    Tag: Controls.Autocomplete,
    name: 'createdBy',
    label: getString('text.createBy'),
    value: initialFormData.createdBy,
    onChange: (e: any) => {
      console.log(e);
    },
    options: Manager,
  },
  {
    Tag: Controls.Slider,
    name: 'userCount',
    value: initialFormData.userCount,
    onChange: (e: any) => {
      console.log(e);
    },
    min: 0,
    max: 100000,
    step: 10000,
  },
];

export default {
  title: 'Components/Controls/FilterForm',
  component: FilterForm,
};

const Template = (args) => (
  <Grid container>
    <FilterForm {...args} />
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  onSubmit: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  },
  onCancel: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  },
  fields: filterFormFields,
};
