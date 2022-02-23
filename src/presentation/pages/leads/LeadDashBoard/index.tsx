import React, { useEffect, useMemo, useState } from 'react';
import Helmet from 'react-helmet';
import { Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import FilterPanel from 'presentation/components/FilterPanel2';
import MultiDateRangeWithType from 'presentation/components/controls/MultiDateRangeWithType';
import { IFilterFormField } from 'presentation/components/FilterPanel2/FilterField';
import { getString } from 'presentation/theme/localization';
import { formatE164, isPossiblePhoneNumber } from 'shared/helper/utilities';
import TableAllLead from 'presentation/components/TableAllLead';
import Controls from 'presentation/components/controls/Control';
import SearchField from 'presentation/components/leads/searchField/SearchField2';
import LeadSourceCloud from 'data/repository/lead/cloud';
import CarSourceCloud from 'data/repository/car/cloud';
import UserSourceCloud from 'data/repository/admin/user/cloud';
import TeamSourceCloud from 'data/repository/admin/team/cloud';
import {
  clearLeadAssignmentPageState,
  getLeadAssignment,
} from 'presentation/redux/actions/leads/lead-assignment';
import * as mockOption from 'mock-data/LeadSourceSelect.mock';
import {
  LeadType,
  SearchFieldLeadAll,
  StatusLeadAll,
  INITIAL_VALUES,
} from './LeadDashBoard.helper';

interface IProps {
  tableType: string;
  helmet: string;
}

// INFO: for update validation
const searchSchema = Yup.object().shape({
  search: Yup.object().shape({}),
  date: Yup.object().shape({}),
});

const localeSearchFieldLeadAll = SearchFieldLeadAll.map((searchField) => ({
  ...searchField,
  title: getString(searchField.title),
}));

const localeLeadType = LeadType.map((type) => ({
  ...type,
  title: getString(type.title),
}));

const localeStatusLeadAll = StatusLeadAll.map((type) => ({
  ...type,
  title: getString(type.title),
}));

const LeadDashBoard: React.FC<IProps> = ({ tableType, helmet }) => {
  const [disableExtraFilters, setDisableExtraFilters] = useState<boolean>(true);
  const fields: IFilterFormField[] = [
    {
      InputComponent: SearchField,
      inputProps: {
        name: 'search',
        label: getString('text.search'),
        searchOption: localeSearchFieldLeadAll,
        fixedLabel: true,
        filterType: 'summary',
        placeholder: getString('text.select'),
        responsive: {
          xs: 6,
          md: 6,
        },
      },
    },
    {
      InputComponent: MultiDateRangeWithType,
      inputProps: {
        name: 'date',
        label: '',
        value: '',
        filterType: 'detail',
        responsive: {
          xs: 12,
          md: 12,
        },
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'source',
        label: getString('text.leadSource'),
        async: true,
        asyncFn: LeadSourceCloud.getLeadSourcesWithScore,
        labelField: 'source',
        valueField: 'name',
        fixedLabel: true,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'leadStatus',
        label: getString('text.leadStatus'),
        options: localeStatusLeadAll,
        filterType: 'detail',
        fixedLabel: true,
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'score',
        label: getString('text.leadScore'),
        options: mockOption.Score,
        filterType: 'detail',
        fixedLabel: true,
        responsive: {
          xs: 6,
          md: 3,
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
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'carBrand',
        label: getString('text.carBrand'),
        lookupFn: CarSourceCloud.getCarBrandLookup,
        labelField: 'displayName',
        valueField: 'name',
        filterType: 'detail',
        fixedLabel: true,
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'leadType',
        label: getString('text.leadType'),
        options: localeLeadType,
        filterType: 'detail',
        fixedLabel: true,
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'assignToUser',
        label: getString('text.assignedToUser'),
        async: true,
        asyncFn: UserSourceCloud.getAssignToUser,
        labelField: 'fullName',
        valueField: 'name',
        filterType: 'detail',
        fixedLabel: true,
        startWithValue: {
          fullName: `(${getString('text.unassigned')})`,
          name: '',
        },
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'assignToTeam',
        label: getString('text.assignedToTeam'),
        async: true,
        asyncFn: TeamSourceCloud.getTeamsFilter,
        labelField: 'displayName',
        valueField: 'name',
        filterType: 'detail',
        fixedLabel: true,
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
  ];

  const pageState = useSelector(
    (state: any) => state.leadsReducer.leadAssignmentReducer.pageState
  );

  const [searchValue, setSearchValue] = useState(INITIAL_VALUES);

  const dispatch = useDispatch();

  const handleSubmit = (values: typeof INITIAL_VALUES) => {
    let search = { ...values.search };
    if (search?.key === 'customerPhone') {
      search = {
        ...search,
        value: isPossiblePhoneNumber(search.value)
          ? formatE164(search.value)
          : search.value,
      };
    }

    const newValue = {
      ...values,
      date: {
        ...values.date.startDate,
      },
      date2: {
        ...values.date.endDate,
      },
      search: {
        [search.key]: search.value,
      },
    };

    dispatch(
      getLeadAssignment({
        ...newValue,
        orderBy: pageState.orderBy,
        currentPage: 1,
        isSearching: true,
        tableType,
      })
    );
  };

  useMemo(() => {
    let isRenewal = true;
    if (searchValue?.leadType?.length) {
      searchValue.leadType.forEach((item: any) => {
        if (item.title === 'Renewal') {
          isRenewal = false;
        }
      });
    }
    setDisableExtraFilters(isRenewal);
  }, [searchValue]);

  const handleChange = (formValue: any) => {
    setSearchValue(formValue);
  };

  useEffect(() => {
    return () => {
      dispatch(clearLeadAssignmentPageState());
    };
  }, [dispatch]);

  return (
    <>
      <Helmet title={helmet} />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <FilterPanel
            fields={fields}
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            onReset={handleSubmit}
            onChangeValue={handleChange}
            validationSchema={searchSchema}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TableAllLead tableType={tableType} searchValue={searchValue} />
        </Grid>
      </Grid>
    </>
  );
};
export default LeadDashBoard;
