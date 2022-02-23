import Controls from 'presentation/components/controls/Control';
import React, { useMemo, useState, useEffect } from 'react';
import { FormControl, Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';

import {
  getManagerUserSelectorTypes,
  getSupervisorUserSelectorTypes,
} from 'presentation/redux/actions/typeSelector/user';
import {
  editTeam,
  createTeam,
  getTeamDetailSelector,
} from 'presentation/redux/actions/admin/team';
import { getString } from 'presentation/theme/localization';
import ProductTypeSelector from 'presentation/components/controls/ProductTypeSelector';
import LeadTypeSelector from 'presentation/components/controls/LeadTypeSelector';
import { getTeamRoleSelector } from 'presentation/redux/actions/typeSelector/team';
import { getAllInsurersSelector } from 'presentation/redux/actions/typeSelector/insurer';
import { getProductSelectorTypes } from 'presentation/redux/actions/typeSelector/product';
import './createAdminTeam.scss';
import { IGetUserList } from 'shared/interfaces/common/typeSelector/user';
import { ICreateTeam } from 'shared/interfaces/common/admin/team';
import { AdminTeamModel } from 'presentation/models/admin/team';
import * as CONSTANTS from 'shared/constants';
import { lowercaseFirstLetter } from 'shared/helper/utilities';
import { IGetRoleSelector } from 'shared/interfaces/common/typeSelector/role';
import buildValidationSchema from 'presentation/modules/admin/CreateAdminTeam.helper';
import TeamRole from 'shared/constants/teamRole';
import Spinner from 'presentation/components/Spinner';
import { SelectElement } from 'shared/types/controls';

interface ICreateAdminProps {
  typeSelector: any;
  teamSelector: any;
  createTeam: (payload: AdminTeamModel) => void;
  getSupervisorUserSelectorTypes: (payload: IGetUserList) => void;
  getManagerUserSelectorTypes: (payload: IGetUserList) => void;
  getProductSelectorTypes: () => void;
  getTeamRoleSelector: (payload: IGetRoleSelector) => void;
  getTeamDetailSelector: (payload: any) => void;
  getAllInsurersSelector: (payload: any) => void;
  editTeam: (payload: AdminTeamModel, name: string) => void;
  data: any;
  close: any;
  isFetching: boolean;
}

const useStyles = makeStyles({
  popper: {
    border: '1px solid grey !important',
  },
});
const SALE_AND_INBOUND: TeamRole[] = [TeamRole.Sales, TeamRole.Inbound];

const CreateAdminTeam: React.FC<ICreateAdminProps> = ({
  typeSelector,
  teamSelector,
  data,
  close,
  getSupervisorUserSelectorTypes: handleGetSupervisorSelectorTypes,
  getManagerUserSelectorTypes: handleGetManagerSelectorTypes,
  getTeamRoleSelector: handleGetTeamRoleSelector,
  getTeamDetailSelector: handleGetTeamDetailSelector,
  getAllInsurersSelector: handleGetAllInsurersSelector,
  getProductSelectorTypes: handleGetProductSelectorTypes,
  editTeam: handleEditTeam,
  createTeam: createAdminTeam,
  isFetching,
}) => {
  const [buttonText, setButtonText] = useState(getString('text.createTeam'));
  const [formData, setFormData] = useState({
    teamRole: null,
    insurer: [],
    name: '',
    teamName: '',
    product: '',
    leadType: '',
    manager: {},
    supervisor: {},
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isSaleOrInbound, setIsSaleOrInbound] = useState<boolean | null>(null);
  const managerTypeSelectors =
    typeSelector.userSelectorReducer.managerSelectorReducer.data?.users || [];
  const supervisorTypeSelectors =
    typeSelector.userSelectorReducer.supervisorSelectorReducer.data?.users ||
    [];
  const classes = useStyles();
  const roleSelectors = typeSelector.teamSelectorReducer.data?.roles || [];
  const insurersSelectors =
    typeSelector.insurerSelectorReducer.data?.insurers || [];
  const teamDetail = teamSelector?.teamDetailReducer?.data;

  const formatRoleSelectors = roleSelectors.map((role: any) => ({
    title: getString(`api.${role.name}`),
    value: role.name,
  }));

  const formatInsurersSelectors = insurersSelectors.map((insurer: any) => ({
    title: insurer.displayName,
    value: insurer.displayName,
  }));

  const getOptionFromValue = (value: string, options: any = []) =>
    options.filter((option: any) => option.value === value)[0];

  const handleCloseButton = () => {
    close(false);
  };
  const customManagerSelector = useMemo(() => {
    const customManager = managerTypeSelectors.map((item: any) => {
      return {
        title: `${item.firstName} ${item.lastName}`,
        value: item.name,
      };
    });
    return customManager;
  }, [managerTypeSelectors]);

  const customSupervisorSelector = useMemo(() => {
    return supervisorTypeSelectors.map((item: any) => {
      return {
        title: `${item.firstName} ${item.lastName}`,
        value: item.name,
      };
    });
  }, [supervisorTypeSelectors]);

  useEffect(() => {
    if (teamDetail && isEdit) {
      setButtonText(getString('text.updateTeam'));
      const body = {
        teamRole: teamDetail.role || null,
        insurer: teamDetail.insurers.map((insurer: string) => ({
          title: insurer,
          value: insurer,
        })),
        name: teamDetail.name,
        teamName: teamDetail.displayName,
        product: teamDetail.productType,
        leadType: lowercaseFirstLetter(teamDetail.leadType),
        manager: getOptionFromValue(teamDetail.manager, customManagerSelector),
        supervisor: getOptionFromValue(
          teamDetail.supervisor,
          customSupervisorSelector
        ),
      };

      setIsSaleOrInbound(
        body.teamRole ? !!SALE_AND_INBOUND.includes(body.teamRole) : false
      );
      setFormData(body);
    }
  }, [teamDetail, isEdit, customManagerSelector, customSupervisorSelector]);

  const PAGE_SIZE = 1000;
  const handleGetManagerTypeSelector = () => {
    handleGetManagerSelectorTypes({
      filter: CONSTANTS.userFilter.manager,
      pageSize: PAGE_SIZE,
    });
  };

  const handleGetSupervisorTypeSelector = () => {
    handleGetSupervisorSelectorTypes({
      filter: CONSTANTS.userFilter.supervisor,
      pageSize: PAGE_SIZE,
    });
  };

  const handleSubmit = (values: any) => {
    const teamModel: ICreateTeam = {
      name: values.name,
      displayName: values.teamName.trim(),
      productType: values.product,
      leadType: values.leadType,
      manager: values.manager.value,
      supervisor: values.supervisor.value,
      role: values.teamRole,
      insurers: values.insurer.map((item: any) => item.value),
    };
    const editTeamModel: ICreateTeam = {
      displayName: values.teamName.trim(),
      productType: values.product,
      leadType: values.leadType,
      manager: values.manager.value,
      supervisor: values.supervisor.value,
      insurers: values.insurer.map((item: any) => item.value),
    };

    if (isEdit) {
      handleEditTeam(editTeamModel, values.name);
    } else {
      createAdminTeam(teamModel);
    }
  };

  useEffect(() => {
    handleGetTeamRoleSelector({
      pageSize: PAGE_SIZE,
    });
    handleGetAllInsurersSelector({
      pageSize: PAGE_SIZE,
    });
    handleGetManagerTypeSelector();
    handleGetSupervisorTypeSelector();
  }, []);

  useEffect(() => {
    if (data?.name) {
      handleGetTeamDetailSelector({
        name: data.name,
      });
      setIsEdit(true);
    }
  }, [data, handleGetTeamDetailSelector]);

  const onChangeRole = (event: React.ChangeEvent<SelectElement>) => {
    const role = event?.target?.value;
    if (role) {
      setIsSaleOrInbound(SALE_AND_INBOUND.includes(role as TeamRole));
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          teamRole: formData.teamRole,
          name: formData.name,
          insurer: formData.insurer,
          teamName: formData.teamName,
          product: formData.product,
          supervisor: formData.supervisor,
          leadType: formData.leadType,
          manager: formData.manager,
        }}
        onSubmit={handleSubmit}
        validationSchema={buildValidationSchema(SALE_AND_INBOUND)}
      >
        {(props) => {
          const { values, touched, errors, isValid, dirty, handleChange } =
            props;
          return (
            <Form
              className={`admin-team-create-team ${isEdit && 'is-editable'}`}
            >
              <FormControl
                margin="normal"
                required
                style={{ position: 'relative' }}
              >
                <Controls.Select
                  label={getString('text.teamRole')}
                  name="teamRole"
                  value={values.teamRole}
                  onChange={(event) => {
                    handleChange(event);
                    onChangeRole(event);
                  }}
                  options={formatRoleSelectors}
                  selectField="value"
                  title="title"
                  key="value"
                  disabled={isEdit}
                />
              </FormControl>

              {isSaleOrInbound === false && (
                <FormControl
                  margin="normal"
                  required
                  style={{ position: 'relative' }}
                >
                  <Controls.Autocomplete
                    label={getString('text.insurer')}
                    name="insurer"
                    value={values.insurer}
                    onChange={handleChange}
                    options={formatInsurersSelectors}
                    labelField="title"
                    valueField="value"
                    hasSelectAll
                  />
                </FormControl>
              )}

              <FormControl
                margin="normal"
                required
                style={{ position: 'relative' }}
              >
                <Controls.Input
                  label={getString('text.teamName')}
                  name="teamName"
                  value={values.teamName}
                  onChange={handleChange}
                  className="team-name-field"
                />
              </FormControl>

              {isSaleOrInbound && (
                <>
                  <FormControl
                    margin="normal"
                    required
                    style={{ position: 'relative' }}
                  >
                    <ProductTypeSelector
                      name="product"
                      label={getString('text.product')}
                      value={values.product}
                      onChange={handleChange}
                      selectField="value"
                    />
                  </FormControl>

                  <FormControl
                    margin="normal"
                    required
                    style={{ position: 'relative' }}
                  >
                    <LeadTypeSelector
                      name="leadType"
                      label={getString('text.leadType')}
                      value={values.leadType}
                      onChange={handleChange}
                      selectField="value"
                    />
                  </FormControl>
                </>
              )}
              <FormControl
                margin="normal"
                required
                style={{ position: 'relative' }}
              >
                <Controls.TypeSelector
                  options={customManagerSelector}
                  label={getString('text.manager')}
                  name="manager"
                  selectField="value"
                  value={values.manager}
                  onChange={handleChange}
                  multiple={false}
                  disableCloseOnSelect={false}
                  helperText={
                    errors.manager && touched.manager && errors.manager
                  }
                  margin="none"
                  classes={{ popper: classes.popper }}
                  popper="none"
                />
              </FormControl>
              <FormControl
                margin="normal"
                required
                style={{ position: 'relative' }}
              >
                <Controls.TypeSelector
                  options={customSupervisorSelector || []}
                  label={getString('text.supervisor')}
                  name="supervisor"
                  selectField="value"
                  value={values.supervisor}
                  onChange={handleChange}
                  helperText={
                    errors.supervisor && touched.supervisor && errors.supervisor
                  }
                  multiple={false}
                  disableCloseOnSelect={false}
                  margin="none"
                  classes={{ popper: classes.popper }}
                  popper="none"
                />
              </FormControl>
              <Grid container className="button-group">
                <Controls.Button
                  color="secondary"
                  variant="text"
                  text={getString('text.cancelButton')}
                  onClick={() => handleCloseButton()}
                />
                <Controls.Button
                  type="submit"
                  color="primary"
                  disabled={!(isValid && dirty)}
                  text={buttonText}
                />
              </Grid>
            </Form>
          );
        }}
      </Formik>
      {isFetching ? <Spinner /> : null}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  typeSelector: state.typeSelectorReducer,
  teamSelector: state.teamReducer,
  isFetching: state.teamReducer.createTeamReducer.isFetching,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createTeam,
      editTeam,
      getManagerUserSelectorTypes,
      getSupervisorUserSelectorTypes,
      getProductSelectorTypes,
      getTeamRoleSelector,
      getAllInsurersSelector,
      getTeamDetailSelector,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminTeam);
