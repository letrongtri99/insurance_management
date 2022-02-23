import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Card, CardContent, Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import CommonModal from 'presentation/components/modal/CommonModal';
import { showModal, hideModal } from 'presentation/redux/actions/ui';
import * as CONSTANTS from 'shared/constants';
import { getString } from 'presentation/theme/localization';
import './index.scss';
import { bindActionCreators } from 'redux';
import { getUsers } from 'presentation/redux/actions/admin/user';
import {
  getTeams,
  addFilterTeams,
  getTeamsName,
} from 'presentation/redux/actions/admin/team';
import WithTableList from 'presentation/HOCs/WithTableList';
import CreateAdminTeam from 'presentation/modules/admin/CreateAdminTeam';
import { SelectDateType } from 'mock-data/AdminPage.mock';
import DateRangeWithType from 'presentation/components/controls/DateRangeWithType';
import LeadTypeMultiSelector from 'presentation/components/controls/LeadTypeMultiSelector';
import { queryStringDynamic } from 'data/gateway/api/helper/queryString.helper';
import TeamCloud from 'data/repository/admin/team/cloud';
import FilterPanel from 'presentation/components/FilterPanel2';
import { IFilterFormField } from 'presentation/components/FilterPanel2/FilterField';
import ProductOptions from 'shared/constants/productOptions';
import { columns, getInsurerOptionsByLanguage } from './teamPageHelper';
import {
  getManagerUserSelectorTypes,
  getSupervisorUserSelectorTypes,
} from '../../../redux/actions/typeSelector/user';

const MIN_SLIDER = 0;
const MAX_SLIDER = 30;
const STEP_SLIDER = 1;

const initialValues = {
  createTime: {
    criteria: '',
    range: {
      startDate: null,
      endDate: null,
    },
  },
  displayName: [],
  productType: [],
  leadType: [],
  manager: [],
  supervisor: [],
  insurer: [],
  createBy: '',
  userCount: [0, 0],
};

const AdminTeamPage: React.FC<any> = ({
  children,
  top,
  modalConfig,
  showModal: handleShowModal,
  hideModal: handleHideModal,
  addFilterTeams: handleAddFilterTeams,
  rowDataClick,
}) => {
  const [modalTitle, setModalTitle] = useState(getString('text.createTeam'));
  const [selectedValue, setSelectedValue] = React.useState({});

  const handleSubmit = (values: any) => {
    handleAddFilterTeams(queryStringDynamic(values));
  };

  const localeSelectDateType = SelectDateType.map((type) => ({
    ...type,
    title: getString(type.title),
  }));

  const localeProducts = ProductOptions.map((prod) => ({
    ...prod,
    title: getString(prod.title),
  }));

  const fields: IFilterFormField[] = [
    {
      InputComponent: DateRangeWithType,
      inputProps: {
        name: 'createTime',
        selectName: 'criteria',
        label: getString('text.selectDateType'),
        options: localeSelectDateType,
        isTeamPage: true,
        fixedLabel: true,
        filterType: 'summary',
        responsive: {
          xs: 6,
          md: 6,
        },
      },
      xs: 12,
      md: 12,
      lg: 12,
      xl: 6,
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'displayName',
        label: getString('text.teamName'),
        async: true,
        asyncFn: TeamCloud.getTeamsBySortName,
        labelField: 'displayName',
        fixedLabel: true,
        filterType: 'summary',
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'productType',
        label: getString('text.product'),
        options: localeProducts,
        fixedLabel: true,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
    {
      InputComponent: LeadTypeMultiSelector,
      inputProps: {
        name: 'leadType',
        label: getString('text.leadType'),
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
        name: 'manager',
        label: getString('text.manager'),
        lookup: true,
        async: true,
        asyncFn: TeamCloud.lookupTeamManagers,
        labelField: 'fullName',
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
        name: 'supervisor',
        label: getString('text.supervisor'),
        async: true,
        lookup: true,
        asyncFn: TeamCloud.lookupTeamSupervisors,
        labelField: 'fullName',
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
        name: 'insurer',
        label: getString('text.insurer'),
        options: getInsurerOptionsByLanguage(),
        labelField: 'title',
        valueField: 'value',
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
        name: 'createBy',
        label: getString('text.createBy'),
        async: true,
        lookup: true,
        asyncFn: TeamCloud.getElasticsearchTeam,
        multiple: false,
        labelField: 'fullName',
        valueField: 'name',
        fixedLabel: true,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
        filterDataField: 'role',
        filterDataValue: 'roles/admin',
        disableClearable: true,
      },
    },
    {
      InputComponent: Controls.Slider,
      inputProps: {
        name: 'userCount',
        min: MIN_SLIDER,
        max: MAX_SLIDER,
        step: STEP_SLIDER,
        label: getString('text.userCount'),
        fixedLabel: true,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
      },
    },
  ];

  const isOpenAdminModal: boolean = modalConfig
    ? modalConfig[CONSTANTS.ModalConfig.teamModal]
    : false;

  const openEditModal = (row?: any) => {
    if (row) {
      handleShowModal(CONSTANTS.ModalConfig.teamModal);
      setModalTitle(getString('text.editTeam'));
      setSelectedValue(row);
    } else {
      handleShowModal(CONSTANTS.ModalConfig.teamModal);
      setModalTitle(getString('text.createTeam'));
      setSelectedValue({});
    }
  };

  useMemo(() => {
    if (rowDataClick) {
      handleShowModal(CONSTANTS.ModalConfig.teamModal);
      setModalTitle(getString('text.editTeam'));
      setSelectedValue(rowDataClick);
    }
  }, [rowDataClick]);

  return (
    <div className="admin-team-page">
      <Helmet title="Admin - Team Page" />
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <FilterPanel
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onReset={handleSubmit}
          />
        </Grid>
        <Card>
          <CardContent>
            <Grid item xs={12} lg={12} className="admin-team-page__control-btn">
              <Controls.Button
                text={getString('text.createTeam')}
                color="primary"
                onClick={() => openEditModal()}
                style={{ textTransform: 'uppercase', marginLeft: 56 }}
              />
              {top}
            </Grid>

            {children}
          </CardContent>
        </Card>

        <CommonModal
          title={modalTitle}
          open={isOpenAdminModal}
          handleCloseModal={() => {
            handleHideModal(CONSTANTS.ModalConfig.teamModal);
          }}
          wrapperClass="admin-team-page-modal"
        >
          <CreateAdminTeam
            data={selectedValue}
            close={() => {
              handleHideModal(CONSTANTS.ModalConfig.teamModal);
            }}
          />
        </CommonModal>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  modalConfig: state.uiInitReducer.modal,
  userState: state.userReducer,
  teamState: state.teamReducer,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      showModal,
      hideModal,
      getTeams,
      getTeamsName,
      getUsers,
      addFilterTeams,
      getManagerUserSelectorTypes,
      getSupervisorUserSelectorTypes,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTableList(AdminTeamPage, 'team', columns));
