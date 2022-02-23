import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { EMPTY, of, defer, Subject } from 'rxjs';
import {
  expand,
  pluck,
  toArray,
  map,
  mergeMap,
  takeUntil,
} from 'rxjs/operators';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import CommonModal from 'presentation/components/modal/CommonModal';
import CreateOrEditUser from 'presentation/modules/users/CreateUser';
import {
  getUsers,
  filterUser,
  setImportUserFlag,
} from 'presentation/redux/actions/admin/user';

import { getRoleSelectorTypes } from 'presentation/redux/actions/typeSelector/role';
import { resetFile } from 'presentation/redux/actions/importFile';
import ImportUser from 'presentation/modules/importUser';
import { IAdminUserMock } from 'shared/helper/AdminUser.mock';
import './userPage.scss';
import { showModal, hideModal } from 'presentation/redux/actions/ui';
import * as CONSTANTS from 'shared/constants';
import withSubscription from 'presentation/HOCs/WithTableList';
import { SelectDateType } from 'mock-data/AdminPage.mock';
import DateRangeWithType from 'presentation/components/controls/DateRangeWithType';
import { AgentScore, Status } from 'mock-data/AdminUser.mock';
import { queryStringDynamic } from 'data/gateway/api/helper/queryString.helper';
import UserCloud from 'data/repository/admin/user/cloud';
import TeamCloud from 'data/repository/admin/team/cloud';
import FilterPanel from 'presentation/components/FilterPanel2';
import { IFilterFormField } from 'presentation/components/FilterPanel2/FilterField';
import { PRODUCT_TYPE } from 'config/TypeFilter';
import ProductOptions from 'shared/constants/productOptions';
import { download, columns, transformToOptions } from './userPageHelper';
import { destroyPage } from '../../../redux/actions/page';
import { formatUserList } from '../../../redux/reducers/admin/user/listUser/index';

const clearSub$ = new Subject();

const UserPage: React.FC<any> = ({
  modalConfig,
  showModal: handleShowModal,
  hideModal: handleHideModal,
  filterUser: handleFilterUser,
  resetFile: handleResetFile,
  children,
  top,
  rowDataClick,
  userState,
  typeSelector,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isImportUser, setIsImportUser] = useState(false);
  const [user, setUser] = useState<IAdminUserMock>();
  const [disableDownload, setDisableDownload] = useState(false);
  const isOpenUserModal: boolean = modalConfig
    ? modalConfig[CONSTANTS.ModalConfig.userModal]
    : false;
  const isImportUserSuccess =
    userState.importUserReducer.importUserSuccess === 'success';

  const initialValues = {
    humanId: null,
    fullName: null,
    userFullName: '',
    annotations: [],
    createTime: {
      criteria: '',
      range: {
        startDate: null,
        endDate: null,
      },
    },
    teamProduct: [],
    teamDisplayName: [],
    role: [],
    status: [],
    createBy: null,
  };
  const MIN_LENGTH_STATUS = 1;

  const dispatch = useDispatch();
  const pageStage = {
    currentPage: 1,
    pageSize: 100,
    pageToken: '',
    showDeleted: true,
  };
  const roleSelectors = transformToOptions(
    typeSelector.roleSelectorReducer.data?.roles || []
  );
  const localeRoles = roleSelectors.map((role) => ({
    ...role,
    title: getString(`api.${role.value}`),
  }));

  const localeProducts = ProductOptions.map((prod) => ({
    ...prod,
    title: getString(prod.title),
  }));

  useEffect(() => {
    if (isImportUserSuccess) {
      setIsImportUser(false);
    }
  }, [isImportUserSuccess]);

  const handleSubmit = (values: any) => {
    const showDeleted = !(
      values.status.length === MIN_LENGTH_STATUS &&
      values.status[0]?.title === 'Active'
    );
    handleFilterUser(
      queryStringDynamic({
        ...values,
        'annotations.score': values.annotations,
      }),
      showDeleted
    );
  };

  const createUser = () => {
    setIsEdit(false);
    handleShowModal(CONSTANTS.ModalConfig.userModal);
  };

  useMemo(() => {
    if (rowDataClick) {
      setUser(rowDataClick);
      setIsEdit(true);
      handleShowModal(CONSTANTS.ModalConfig.userModal);
    }
  }, [rowDataClick]);

  useEffect(() => {
    return () => {
      dispatch(destroyPage());
    };
  }, []);

  const localeSelectDateType = SelectDateType.map((type) => ({
    ...type,
    title: getString(type.title),
  }));

  const localeStatus = Status.map((status) => ({
    ...status,
    title: getString(status.title),
  }));

  const fields: IFilterFormField[] = [
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'humanId',
        label: getString('text.user'),
        async: true,
        asyncFn: UserCloud.getAllUsers,
        labelField: 'humanId',
        placeholder: getString('text.inputUser'),
        multiple: false,
        fixedLabel: true,
        filterType: 'summary',
        responsive: {
          xs: 6,
          md: 3,
        },
        disableClearable: true,
      },
    },
    {
      InputComponent: Controls.Input,
      inputProps: {
        name: 'userFullName',
        label: getString('text.name'),
        placeholder: getString('text.inputName'),
        multiple: false,
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
        name: 'annotations',
        label: getString('text.agentScore'),
        options: AgentScore,
        fixedLabel: true,
        filterType: 'summary',
        responsive: {
          xs: 6,
          md: 3,
        },
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
    {
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'teamProduct',
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
      InputComponent: Controls.Autocomplete,
      inputProps: {
        name: 'teamDisplayName',
        label: getString('text.team'),
        async: true,
        lookup: true,
        asyncFn: TeamCloud.getTeamsCarInsuranceLookup,
        labelField: 'displayName',
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
        name: 'role',
        label: getString('text.userRole'),
        options: localeRoles,
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
        name: 'status',
        label: getString('text.status'),
        options: localeStatus,
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
        asyncFn: UserCloud.getElasticsearchUser,
        labelField: 'name',
        multiple: false,
        valueField: 'key',
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
  ];

  const handleDownload = () => {
    const roleSelectors = typeSelector.roleSelectorReducer.data?.roles || [];
    setDisableDownload(true);
    const getUserList = UserCloud.getUsers(pageStage).pipe(
      expand((response: any) =>
        defer(() =>
          response.nextPageToken
            ? UserCloud.getUsers({
                pageSize: 100,
                pageToken: response.nextPageToken,
                showDeleted: true,
              })
            : EMPTY
        )
      ),
      pluck('usersWithTeam'),
      mergeMap((item: any) => of(...item)),
      toArray(),
      map((res: any[]) => {
        return res.map((userData: any) => {
          return {
            ...userData,
            teamProduct: userData.teamProduct
              ? PRODUCT_TYPE[userData.teamProduct]
              : '',
          };
        });
      })
    );
    getUserList.pipe(takeUntil(clearSub$)).subscribe((data: any) => {
      download(formatUserList(data, roleSelectors));
      setDisableDownload(false);
    });
  };

  useEffect(() => {
    return () => {
      clearSub$.next(true);
    };
  }, []);

  return (
    <>
      <Helmet title="User Page" />
      <Grid container className="user-page">
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
              container
              item
              xs={12}
              lg={12}
              className="user-page__control-btn"
            >
              <Grid
                item
                style={{ marginLeft: 56 }}
                className="control-btn-group"
              >
                <Controls.Button
                  text={getString('text.addUser')}
                  color="primary"
                  onClick={() => createUser()}
                  style={{ textTransform: 'uppercase' }}
                />

                <Controls.Button
                  text={getString('text.importedUser')}
                  color="primary"
                  onClick={() => {
                    dispatch(setImportUserFlag('idle'));
                    setIsImportUser(true);
                  }}
                  style={{ textTransform: 'uppercase' }}
                />
                <Controls.Button
                  text={getString('text.templateButton')}
                  color="primary"
                  disabled={disableDownload}
                  onClick={handleDownload}
                  style={{ textTransform: 'uppercase' }}
                />
              </Grid>
              {top}
              <CommonModal
                title={
                  isEdit
                    ? getString('text.updateUser')
                    : getString('text.addUser')
                }
                open={isOpenUserModal}
                handleCloseModal={() => {
                  handleHideModal(CONSTANTS.ModalConfig.userModal);
                }}
              >
                <CreateOrEditUser user={user} isEdit={isEdit} />
              </CommonModal>
              <CommonModal
                title={getString('text.importedUser')}
                open={isImportUser}
                handleCloseModal={() => {
                  handleResetFile();
                  setIsImportUser(false);
                }}
              >
                <ImportUser close={setIsImportUser} />
              </CommonModal>
            </Grid>
            {children}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  propsData: state.typeSelectorReducer.userSelectorReducer,
  modalConfig: state.uiInitReducer.modal,
  userState: state.userReducer,
  teamState: state.teamReducer,
  typeSelector: state.typeSelectorReducer,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getUsers,
      showModal,
      hideModal,
      filterUser,
      getRoleSelectorTypes,
      resetFile,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSubscription(UserPage, 'user', columns));
