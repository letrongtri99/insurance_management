import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { getString } from 'presentation/theme/localization';
import SearchField from 'presentation/components/leads/searchField/SearchField2';

import FilterPanel from 'presentation/components/FilterPanel2/index';
import Controls from 'presentation/components/controls/Control';
import { SelectDateTypeMyLeads, SearchLeads } from 'mock-data/AdminPage.mock';
import { IFilterFormField } from 'presentation/components/FilterPanel2/FilterField';
import MultiDateRangeWithType from 'presentation/components/controls/MultiDateRangeWithType';
import { INITIAL_VALUES } from './myLeadsFilterHelper';
import { StatusLeadAll } from '../../leads/LeadDashBoard/LeadDashBoard.helper';

import './index.scss';

// INFO: for update validation
const searchSchema = Yup.object().shape({
  search: Yup.object().shape({}),
  date: Yup.object().shape({}),
});

type TSearchData = {
  searchData: (body: any) => void;
  handleChangeForm: (body: typeof INITIAL_VALUES) => void;
};
const MyLeadsFilter: React.FC<TSearchData> = ({
  searchData,
  handleChangeForm,
}) => {
  const fields: IFilterFormField[] = [
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'leadStatus',
        label: getString('text.leadStatus'),
        options: StatusLeadAll,
        filterType: 'summary',
        fixedLabel: true,
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: MultiDateRangeWithType,
      inputProps: {
        name: 'date',
        label: '',
        value: '',
        options: SelectDateTypeMyLeads,
        filterType: 'summary',
        responsive: {
          xs: 12,
          md: 6,
        },
      },
    },
    {
      InputComponent: Controls.Slider,
      inputProps: {
        name: 'sumInsured',
        label: getString('text.sumInsuredLabel'),
        min: 0,
        max: 9999999,
        step: 10000,
        marks: false,
        isPlaceHolder: false,
        filterType: 'detail',
        fixedLabel: true,
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: SearchField,
      inputProps: {
        name: 'search',
        label: getString('text.search'),
        searchOption: SearchLeads,
        fixedLabel: true,
        filterType: 'detail',
        placeholder: getString('text.select'),
        responsive: {
          xs: 12,
          md: 6,
        },
      },
    },
  ];

  const [searchValue, setSearchValue] = useState(INITIAL_VALUES);

  const handleSubmit = (values: typeof INITIAL_VALUES) => {
    const newValue = {
      ...values,
      date: {
        ...values.date.startDate,
      },
      date2: {
        ...values.date.endDate,
      },
      search: {
        [values.search.key]: values.search.value,
      },
    };

    searchData(newValue);
  };

  const handleChange = (rest: any) => {
    const { values } = rest;
    setSearchValue(values);
  };

  return (
    <Grid container className="my-lead-filter">
      <FilterPanel
        fields={fields}
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        onReset={handleSubmit}
        onChangeValue={handleChange}
        validationSchema={searchSchema}
      />
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  lang: state.languageReducer,
});

export default connect(mapStateToProps)(MyLeadsFilter);
