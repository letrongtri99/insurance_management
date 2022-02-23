import { IFilterFormField } from 'presentation/components/FilterPanel2/FilterField';
import SearchField from 'presentation/components/leads/searchField/SearchField2';
import { getString } from 'presentation/theme/localization';
import Controls from 'presentation/components/controls/Control';
import LeadSourceCloud from 'data/repository/lead/cloud';
import MultiDateRangeWithType from 'presentation/components/controls/MultiDateRangeWithType';
import UserSourceCloud from 'data/repository/admin/user/cloud';
import TeamSourceCloud from 'data/repository/admin/team/cloud';
import { SearchFieldLeadAll } from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import {
  documentStatusOptions,
  qcStatusOptions,
  submissionStatusOptions,
  approvalStatusOptions,
  documentStatusSubmissionOptions,
  qcStatusSubmissionOptions,
  submissionStatusSubmissionOptions,
} from 'shared/constants/ordersAllSearchFields';
import { insuranceTypeCollection } from 'shared/constants/packageStaticData';
import InsurerAPI from 'data/gateway/api/services/insurer';
import { map } from 'rxjs/operators';

const localeSearchFieldLeadAll = SearchFieldLeadAll.map((searchField) => ({
  ...searchField,
  title: getString(searchField.title),
}));

export const INITIAL_VALUES = {
  search: { key: '', value: '' },
  date: {
    startDate: {
      criteria: '',
      range: { startDate: null, endDate: null },
    },
    endDate: {
      criteria: '',
      range: { startDate: null, endDate: null },
    },
  },
  source: [],
  leadStatus: [],
  assignToUser: [],
  assignToTeam: [],
  insuranceType: [],
  insurer: [],
  paymentDaysOverdue: [0, 0],
};

export const fields: IFilterFormField[] = [
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
    InputComponent: MultiDateRangeWithType,
    inputProps: {
      name: 'date',
      label: '',
      value: '',
      filterType: 'detail',
      responsive: {
        xs: 12,
        md: 9,
      },
      hasExpand: true,
    },
  },
  {
    InputComponent: Controls.Autocomplete,
    inputProps: {
      name: 'paymentType',
      label: getString('text.paymentType'),
      options: [],
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
      name: 'paymentStatus',
      label: getString('text.paymentStatus'),
      options: [],
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
      name: 'paymentDaysOverdue',
      label: getString('text.paymentDaysOverdue'),
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
  /**
   * ************************* BUG ******************************
   * This field does absolutely nothing from the looks of it
   * But if you remove it, a bug occurs where the document status
   * gets duplicated over and over again.
   */
  {
    InputComponent: Controls.Select,
    inputProps: {
      name: '',
      label: '',
      placeholder: '',
      options: [],
      filterType: 'detail-empty',
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
      name: 'documentStatus',
      label: getString('text.documentStatus'),
      placeholder: getString('text.select'),
      options: documentStatusOptions,
      filterType: 'detail',
      fixedLabel: true,
      responsive: {
        xs: 6,
        md: 3,
      },
      hasSelectAll: true,
    },
  },
  {
    InputComponent: Controls.Autocomplete,
    inputProps: {
      name: 'qcStatus',
      label: getString('text.qcStatus'),
      placeholder: getString('text.select'),
      options: qcStatusOptions,
      filterType: 'detail',
      fixedLabel: true,
      responsive: {
        xs: 6,
        md: 3,
      },
      hasSelectAll: true,
    },
  },
  {
    InputComponent: Controls.Autocomplete,
    inputProps: {
      name: 'submissionStatus',
      label: getString('text.submissionStatus'),
      placeholder: getString('text.select'),
      options: submissionStatusOptions,
      filterType: 'detail',
      fixedLabel: true,
      responsive: {
        xs: 6,
        md: 3,
      },
      hasSelectAll: true,
    },
  },
  {
    InputComponent: Controls.Autocomplete,
    inputProps: {
      name: 'approvalStatus',
      label: getString('text.approvalStatus'),
      placeholder: getString('text.select'),
      options: approvalStatusOptions,
      filterType: 'detail',
      fixedLabel: true,
      responsive: {
        xs: 6,
        md: 3,
      },
      hasSelectAll: true,
    },
  },
  {
    InputComponent: Controls.Autocomplete,
    inputProps: {
      name: 'assignToUser',
      label: getString('text.assignedToUser'),
      async: true,
      asyncFn: UserSourceCloud.getUsersWithTeams,
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

export const submissionFields: IFilterFormField[] = [
  ...fields.slice(0, 7),
  {
    InputComponent: Controls.Select,
    inputProps: {
      name: 'documentStatus',
      label: getString('text.documentStatus'),
      placeholder: getString('text.select'),
      options: documentStatusSubmissionOptions,
      filterType: 'detail',
      fixedLabel: true,
      responsive: {
        xs: 6,
        md: 3,
      },
    },
  },
  {
    InputComponent: Controls.Select,
    inputProps: {
      name: 'qcStatus',
      label: getString('text.qcStatus'),
      placeholder: getString('text.select'),
      options: qcStatusSubmissionOptions,
      filterType: 'detail',
      fixedLabel: true,
      responsive: {
        xs: 6,
        md: 3,
      },
    },
  },
  {
    InputComponent: Controls.Select,
    inputProps: {
      name: 'submissionStatus',
      label: getString('text.submissionStatus'),
      placeholder: getString('text.select'),
      options: submissionStatusSubmissionOptions,
      filterType: 'detail',
      fixedLabel: true,
      responsive: {
        xs: 6,
        md: 3,
      },
    },
  },
  ...fields.slice(11),
];

interface InsurerAPIOptions {
  pageSize: number;
  pageToken?: string;
}

/**
 * Returns an Observable of all the different insurers and their
 * relevant informations.
 * @param
 * @returns Obseravble of insurers
 */
const getInsurersList = ({ pageSize, pageToken }: InsurerAPIOptions) => {
  const insurerAPI = new InsurerAPI();
  return insurerAPI.getInsurers(pageSize, pageToken).pipe(
    map((response) => {
      const { data } = response;

      if (data == null) {
        return [];
      }

      return {
        nextPageToken: data.nextPageToken,
        data: data.insurers.map(({ name, displayName }, index) => {
          // Only return relevant data
          return { id: index, displayName, name };
        }),
      };
    })
  );
};

export const insuranceTypeField: IFilterFormField = {
  InputComponent: Controls.Autocomplete,
  inputProps: {
    name: 'insuranceType',
    label: getString('package.insuranceTypeSearchLabel'),
    // Specifies what property in the option should be used as the label
    labelField: 'title',
    // Specifies which property will serve as the value.
    valueField: 'value',
    options: insuranceTypeCollection().map(
      ({ value, title }, index: number) => ({ id: index + 1, value, title })
    ),
    filterType: 'detail',
    fixedLabel: true,
    responsive: {
      xs: 6,
      md: 3,
    },
  },
};

export const insurerField: IFilterFormField = {
  InputComponent: Controls.Autocomplete,
  inputProps: {
    name: 'insurer',
    label: getString('text.insurer'),
    labelField: 'displayName',
    valueField: 'name',
    filterType: 'detail',
    paginate: true,
    async: true,
    asyncFn: getInsurersList,
    fixedLabel: true,
    responsive: {
      xs: 6,
      md: 3,
    },
  },
};
