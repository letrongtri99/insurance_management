import Controls from 'presentation/components/controls/Control';
import { FormControl, Grid } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import './createUser.scss';
import { getString } from 'presentation/theme/localization';
import {
  createUser,
  editUser,
  deleteUser,
  unDeleteUser,
  getTeamByUser,
  clearProduct,
} from 'presentation/redux/actions/admin/user';
import { getProductSelectorTypes } from 'presentation/redux/actions/typeSelector/product';
import {
  getTeamSelectorTypes,
  getAllTeams,
} from 'presentation/redux/actions/typeSelector/team';
import { getRoleSelectorTypes } from 'presentation/redux/actions/typeSelector/role';
import { hideModal, showSnackBar } from 'presentation/redux/actions/ui';
import Loader from 'presentation/components/Loader';
import { IGetRoleSelector } from 'shared/interfaces/common/typeSelector/role';
import { IGetTeamList } from 'shared/interfaces/common/typeSelector/team';
import * as CONSTANTS from 'shared/constants';
import { ICreateUser } from 'shared/interfaces/common/admin/user';
import { UserRoleID } from 'presentation/components/ProtectedRouteHelper';
import { SelectElement } from 'shared/types/controls';
import {
  scores,
  getInitialUser,
  createValidationSchema,
} from './CreateUser.helper';
import Button from '../../components/Button';
import AccountRepository from '../../../data/repository/account';

const SALES_AGENT = UserRoleID.SalesAgent;
const PAGE_SIZE = 15;
const MIN_NUMBER_INPUT_TYPE = 0;
const BACK_OFFICE_ROLES = [
  UserRoleID.CustomerService,
  UserRoleID.DocumentsCollection,
  UserRoleID.QualityControl,
  UserRoleID.Submission,
];
interface IInitialUser {
  [key: string]: string | number | boolean | any;
}
interface IConditon {
  isSalesAgent: boolean;
  isBackOffice: boolean;
  isChangeTeam: boolean;
  name: string;
  teamMember: string;
  team: string;
  isAddNewMember: boolean;
}
interface ICreateUserProps {
  user: any;
  typeSelector: any;
  userSelector: any;
  getProductSelectorTypes: () => void;
  getTeamSelectorTypes: (payload: IGetTeamList) => void;
  getRoleSelectorTypes: (payload: IGetRoleSelector) => void;
  hideModal: (payload: string) => void;
  createUser: (
    payload: ICreateUser,
    isSalesAgent: boolean,
    isBackOffice: boolean,
    team: string
  ) => void;
  editUser: (payload: ICreateUser, condition: IConditon) => void;
  getTeamByUser: (payload: string) => void;
  getAllTeams: (payload: any) => void;
  isEdit: boolean;
  deleteUser: (payload: string) => void;
  unDeleteUser: (payload: string) => void;
  clearProduct: () => void;
}

const CreateUser: React.FC<ICreateUserProps> = ({
  typeSelector,
  userSelector,
  user,
  getProductSelectorTypes: handleGetProductSelectorTypes,
  getTeamSelectorTypes: handleGetTeamSelectorTypes,
  getRoleSelectorTypes: handleGetRoleSelectorTypes,
  hideModal: handleHideModal,
  createUser: handleCreateUser,
  editUser: handleEditUser,
  getTeamByUser: handleGetTeamByUser,
  getAllTeams: handleGetTeamsByRole,
  isEdit,
  deleteUser: handleDeleteUser,
  unDeleteUser: handleUndeleteUser,
  clearProduct: handleClearProduct,
}) => {
  const dispatch = useDispatch();
  const [isSalesAgent, setIsSaleAgent] = useState<boolean>(false);
  const [isBackOffice, setIsBackOffice] = useState<boolean>(false);
  const [initialUser, setInitialUser] = useState<IInitialUser>();
  const [oldTeam, setOldTeam] = useState<string>('');

  const roleSelectors = typeSelector.roleSelectorReducer.data?.roles || [];
  const localeRoles = useMemo(
    () =>
      roleSelectors.map((role: any) => ({
        ...role,
        displayName: getString(`api.${role.name}`),
      })),
    [roleSelectors]
  );
  const teamSelectors = typeSelector.allTeamsSelectorReducer.data?.teams || [];

  const currentUserTeam =
    userSelector.editUserReducer.currentTeamMemberName || null;

  const handleClose = () => {
    handleHideModal(CONSTANTS.ModalConfig.userModal);
  };

  const handleSubmit = (values: any) => {
    const userModel: ICreateUser = {
      humanId: values.humanId.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      role: values.role,
    };

    if (isSalesAgent) {
      userModel.annotations = {
        daily_limit: values.dailyLimit.toString(),
        score: values.agentScore.toString(),
        total_limit: values.totalLimit.toString(),
      };
    } else {
      userModel.annotations = {};
    }

    if (isEdit) {
      const condition: IConditon = {
        isSalesAgent,
        isBackOffice,
        name: values.name,
        teamMember: currentUserTeam,
        team: values.team,
        isChangeTeam: false,
        isAddNewMember: false,
      };
      if (values.team !== oldTeam && oldTeam) {
        condition.isChangeTeam = true;
      }
      if (values.team !== oldTeam && !oldTeam) {
        condition.isAddNewMember = true;
      }

      handleEditUser(userModel, condition);
    } else {
      handleCreateUser(userModel, isSalesAgent, isBackOffice, values.team);
    }
  };

  const handleDeleteUserButton = () => {
    if (user.deleteTime === null) {
      handleDeleteUser(user.name);
    } else {
      handleUndeleteUser(user.name);
    }
  };

  const handleRecoveryLinkButton = () => {
    AccountRepository.getRecoveryLink(user.name).subscribe(
      ({ response }: any) => {
        // Copy to Clipboard
        navigator.clipboard.writeText(response.recoveryLink).then(() => {
          dispatch(
            showSnackBar({
              isOpen: true,
              message: getString('text.copiedRecoveryLinkToClipboard'),
              status: 'success',
            })
          );
        });
      },
      () => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: getString('text.errorGettingRecoveryLink'),
            status: 'error',
          })
        );
      }
    );
  };

  const handleGetTypeSelector = () => {
    handleGetProductSelectorTypes();
    if (!roleSelectors.length) {
      handleGetRoleSelectorTypes({
        pageSize: PAGE_SIZE,
      });
    }
  };

  useEffect(() => {
    handleGetTypeSelector();
    handleClearProduct();
  }, []);

  const changeRoleHandle = (role: string) => {
    setIsSaleAgent(role === SALES_AGENT);
    setIsBackOffice(BACK_OFFICE_ROLES.includes(role as UserRoleID));

    const filterTeamByRole = {
      filter: `role="${role}"`,
    };
    handleGetTeamsByRole(filterTeamByRole);
  };

  const onChangeRole = (event: React.ChangeEvent<SelectElement>) => {
    changeRoleHandle(event.target.value as string);
  };

  useEffect(() => {
    const team = userSelector.editUserReducer.currentTeam;
    setOldTeam(team);
    setInitialUser({
      ...initialUser,
      team: userSelector.editUserReducer.currentTeam,
    });
  }, [userSelector.editUserReducer.currentTeam]);

  useMemo(() => {
    if (isEdit) {
      const { role, name } = user;
      const teamFilter = encodeURI(`filter=user="${name}"`);
      if (role) {
        changeRoleHandle(role);
        handleGetTeamByUser(teamFilter);
      }
      setInitialUser({
        ...user,
        product: '',
        team: '',
        dailyLimit: user.annotations?.daily_limit,
        agentScore: user.annotations?.score,
        totalLimit: user.annotations?.total_limit,
      });
      return;
    }
    setInitialUser(getInitialUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createFormSchema = () => {
    return createValidationSchema(SALES_AGENT, BACK_OFFICE_ROLES);
  };

  if (!teamSelectors) {
    return <Loader />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialUser as IInitialUser}
      onSubmit={handleSubmit}
      validationSchema={createFormSchema}
    >
      {(props) => {
        const {
          values,
          isValid,
          dirty,
          handleChange,
          handleBlur,
          setFieldValue,
        } = props;

        return (
          <Form className="user-create-user">
            <FormControl margin="normal" required>
              <Controls.Select
                options={localeRoles}
                label={getString('text.userRole')}
                name="role"
                key="name"
                title="displayName"
                selectField="name"
                value={values.role}
                onChange={(event) => {
                  // Clear team field when role change
                  values.team = '';
                  onChangeRole(event);
                  handleChange(event);
                }}
                disabled={isEdit && user?.deleteTime}
              />
            </FormControl>

            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.firstName')}
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isEdit && user?.deleteTime}
              />
            </FormControl>

            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.lastName')}
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isEdit && user?.deleteTime}
              />
            </FormControl>

            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.userName')}
                name="humanId"
                value={values.humanId}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isEdit || false}
              />
            </FormControl>
            {(isSalesAgent || isBackOffice) && (
              <>
                <FormControl margin="normal" required>
                  <Controls.Select
                    options={teamSelectors || []}
                    label={getString('text.team')}
                    name="team"
                    key="name"
                    title="displayName"
                    selectField="name"
                    value={values.team}
                    onChange={handleChange}
                    disabled={
                      (isEdit && user?.deleteTime) || !teamSelectors.length
                    }
                  />
                </FormControl>
              </>
            )}
            {isSalesAgent && (
              <>
                <FormControl margin="normal" required>
                  <Controls.Input
                    label={getString('text.dailyLimit')}
                    name="dailyLimit"
                    type="number"
                    value={values.dailyLimit}
                    step={1}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                      // eslint-disable-next-line radix
                      setFieldValue('dailyLimit', parseInt(event.target.value));
                    }}
                    onBlur={handleBlur}
                    inputProps={{ min: MIN_NUMBER_INPUT_TYPE }}
                    disabled={isEdit && user?.deleteTime}
                  />
                </FormControl>
                <FormControl margin="normal" required>
                  <Controls.Input
                    label={getString('text.totalLeadLimit')}
                    name="totalLimit"
                    type="number"
                    value={values.totalLimit}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                      // eslint-disable-next-line radix
                      setFieldValue('totalLimit', parseInt(event.target.value));
                    }}
                    onBlur={handleBlur}
                    inputProps={{ min: MIN_NUMBER_INPUT_TYPE }}
                    disabled={isEdit && user?.deleteTime}
                  />
                </FormControl>
                <FormControl margin="normal">
                  <Controls.Select
                    options={scores || []}
                    label={getString('text.agentScore')}
                    name="agentScore"
                    value={values.agentScore}
                    onChange={handleChange}
                    disabled={isEdit && user?.deleteTime}
                  />
                </FormControl>
              </>
            )}

            <Grid container justify="space-between">
              {isEdit ? (
                <div className="button-group">
                  <Button
                    className="btn-suspend"
                    onClick={handleDeleteUserButton}
                  >
                    {getString(
                      user.deleteTime !== null
                        ? 'text.activate'
                        : 'text.suspend'
                    )}
                  </Button>
                  <Button
                    className="btn-recovery"
                    onClick={handleRecoveryLinkButton}
                  >
                    {getString('text.recoveryLink')}
                  </Button>
                </div>
              ) : (
                <div />
              )}

              <div className="button-group">
                <Controls.Button
                  type="button"
                  color="secondary"
                  variant="text"
                  onClick={handleClose}
                  text={getString('text.cancelButton')}
                />
                {!user?.deleteTime && (
                  <Controls.Button
                    type="submit"
                    color="primary"
                    className="button-save"
                    disabled={!(isValid && dirty)}
                    text={
                      isEdit
                        ? getString('text.update')
                        : getString('text.create')
                    }
                  />
                )}
              </div>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: any) => ({
  typeSelector: state.typeSelectorReducer,
  userSelector: state.userReducer,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createUser,
      editUser,
      getProductSelectorTypes,
      getTeamSelectorTypes,
      getRoleSelectorTypes,
      hideModal,
      deleteUser,
      unDeleteUser,
      getTeamByUser,
      getAllTeams,
      clearProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
