import React, { useState, useMemo } from 'react';
import './index.scss';
import Helmet from 'react-helmet';
import { Card, CardContent, Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import * as mockOption from 'mock-data/LeadSourceSelect.mock';
import CommonModal from 'presentation/components/modal/CommonModal';
import { connect } from 'react-redux';
import { getString } from 'presentation/theme/localization';
import SourceModal from 'presentation/components/modal/SourceModal';
import DateRangeWithType from 'presentation/components/controls/DateRangeWithType';
import { showModal, hideModal } from 'presentation/redux/actions/ui';
import {
  getLeadSource,
  filterSource,
} from 'presentation/redux/actions/leads/sources';
import { bindActionCreators } from 'redux';
import * as CONSTANTS from 'shared/constants';
import { ILeadSourcesReponse } from 'shared/interfaces/common/lead/sources';
import { queryStringDynamic } from 'data/gateway/api/helper/queryString.helper';
import UserCloud from 'data/repository/admin/user/cloud';
import LeadSourceCloud from 'data/repository/lead/cloud';
import WithTableList from 'presentation/HOCs/WithTableList';
import FilterPanel from 'presentation/components/FilterPanel2';
import { IFilterFormField } from 'presentation/components/FilterPanel2/FilterField';
import { columns, getLocaleOptions } from './leadSourceHelper';

interface LeadSourcePageProps {
  children: any;
  top: any;
  modalConfig: any;
  rowDataClick: ILeadSourcesReponse;
  showModal: (payload: string) => void;
  hideModal: (payload: string) => void;
  filterSource: (payload: any) => void;
}

const LeadSourcePage: React.FC<LeadSourcePageProps> = ({
  children,
  top,
  modalConfig,
  showModal: handleShowModal,
  hideModal: handleHideModal,
  rowDataClick,
  filterSource: handleFilterSource,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const createSource = () => {
    setIsOpenEdit(false);
    handleShowModal(CONSTANTS.ModalConfig.leadSourcesModal);
  };
  const [selectedValue, setSelectedValue] = React.useState({});
  const isOpenLeadSourcesModal: boolean = modalConfig
    ? modalConfig[CONSTANTS.ModalConfig.leadSourcesModal]
    : false;

  useMemo(() => {
    if (rowDataClick) {
      setSelectedValue(rowDataClick);
      setIsOpenEdit(true);
      handleShowModal(CONSTANTS.ModalConfig.leadSourcesModal);
    }
  }, [rowDataClick]);

  const initialValues = {
    online: null,
    source: [],
    medium: [],
    campaign: [],
    hidden: null,
    autoAssign: null,
    score: [],
    createBy: null,
    updateBy: null,
    createTime: {
      criteria: '',
      range: {
        startDate: null,
        endDate: null,
      },
    },
  };

  const handleSubmit = (values: any) => {
    handleFilterSource(queryStringDynamic(values));
  };

  const localeSelectDateType = getLocaleOptions(
    mockOption.SelectDateType,
    'title'
  );

  const localeAutoAssign = getLocaleOptions(mockOption.AutoAssign, 'title');

  const localeHide = getLocaleOptions(mockOption.Hide, 'title');

  const localeOnlineType = getLocaleOptions(mockOption.Type, 'title');

  const fields: IFilterFormField[] = [
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'online',
        label: getString('text.type'),
        options: localeOnlineType,
        fixedLabel: true,
        multiple: false,
        filterType: 'summary',
        responsive: {
          xs: 6,
          md: 3,
        },
        disableClearable: true,
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'source',
        label: getString('text.source'),
        async: true,
        asyncFn: LeadSourceCloud.getLeadSourcesWithScore,
        labelField: 'source',
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
        name: 'medium',
        label: getString('text.utmMedium'),
        async: true,
        asyncFn: LeadSourceCloud.getUtmMedium,
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
        name: 'campaign',
        label: getString('text.utmCampaign'),
        async: true,
        asyncFn: LeadSourceCloud.getUtmCampaign,
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
        name: 'hidden',
        label: getString('text.hide'),
        options: localeHide,
        fixedLabel: true,
        multiple: false,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
        disableClearable: true,
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'autoAssign',
        label: getString('text.autoAssign'),
        options: localeAutoAssign,
        fixedLabel: true,
        multiple: false,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
        disableClearable: true,
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'score',
        label: getString('text.score'),
        options: mockOption.Score,
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
        asyncFn: UserCloud.getAdminsLookup,
        multiple: false,
        labelField: 'fullName',
        valueField: 'name',
        fixedLabel: true,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
        disableClearable: true,
      },
    },
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'updateBy',
        label: getString('text.updateBy'),
        async: true,
        lookup: true,
        asyncFn: UserCloud.lookUpUser,
        multiple: false,
        labelField: 'fullName',
        valueField: 'name',
        fixedLabel: true,
        filterType: 'detail',
        responsive: {
          xs: 6,
          md: 3,
        },
        disableClearable: true,
      },
    },
    {
      InputComponent: DateRangeWithType,
      inputProps: {
        name: 'createTime',
        selectName: 'criteria',
        label: getString('text.selectDateType'),
        options: localeSelectDateType,
        fixedLabel: true,
        filterType: 'detail',
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
  ];

  return (
    <div className="lead-source-page">
      <Helmet title="Leads - Sources" />

      <Grid container>
        <Grid item xs={12} lg={12}>
          <FilterPanel
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onReset={handleSubmit}
          />
        </Grid>
        <Card>
          <CardContent>
            <Grid
              item
              xs={12}
              lg={12}
              className="lead-source-page__control-btn"
            >
              <Controls.Button
                text={getString('text.createSource')}
                color="primary"
                onClick={() => {
                  createSource();
                }}
                style={{ textTransform: 'uppercase', marginLeft: 56 }}
                className="button"
              />
              {top}
              <CommonModal
                title={
                  isOpenEdit
                    ? `${getString('text.update')} Lead Source`
                    : `${getString('text.create')} Lead Source`
                }
                open={isOpenLeadSourcesModal}
                handleCloseModal={() => {
                  handleHideModal(CONSTANTS.ModalConfig.leadSourcesModal);
                }}
              >
                <SourceModal
                  data={selectedValue}
                  isEdit={isOpenEdit}
                  close={setIsOpenEdit}
                />
              </CommonModal>
            </Grid>
            {children}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  modalConfig: state.uiInitReducer.modal,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getLeadSource,
      showModal,
      hideModal,
      filterSource,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTableList(LeadSourcePage, 'leadSource', columns));
