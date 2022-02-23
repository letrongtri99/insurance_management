import React, { useMemo, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  getLanguage,
  getString,
  LANGUAGES,
} from 'presentation/theme/localization';
import {
  Grid,
  Hidden,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  WallpaperOutlined as MenuRoute,
} from '@material-ui/icons';
import { User } from 'react-feather';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { changeLanguage } from 'presentation/redux/actions/languages';
import { addLead } from 'presentation/redux/actions/leadDetail/addLead';
import { Link, useRouteMatch } from 'react-router-dom';
import './header.scss';
import { IHeaderRoutes } from 'presentation/routes/route.interface';
import headerRoutes, { emptyHeaderRoutes } from 'shared/constants/headerRoutes';
import CommonModal from 'presentation/components/modal/CommonModal';
import LeadPageAddLead, {
  IFormAddLead,
} from 'presentation/modules/leadPageAddLead';
import ProductTypeSelectorGlobal from 'presentation/components/ProductTypeSelectorGlobal';
import LeadRepository from 'data/repository/lead';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { ADD_LEAD_SCHEMA_ID } from 'shared/constants';
import { formatE164 } from 'shared/helper/utilities';
import LeadScheduleModal from 'presentation/components/modal/LeadScheduleModal';
import { destroyModalSchedule } from 'presentation/redux/actions/leadDetail/scheduleModal';
import i18n from 'i18next';
import { resetIsLogoutSuccess } from '../redux/actions/presence';
import LogoutModal from './modal/LogoutModal';

interface IProps {
  color: string;
}

export interface ICreateLead {
  product: string;
  schema: string;
  type: string;
  data: {
    customerFirstName?: string;
    customerLastName: string;
    customerPhoneNumber: { phone: string; status: string }[];
    customerEmail: string[];
    customerPolicyAddress: string[];
    customerShippingAddress: string[];
    customerBillingAddress: string[];
  };
  source: string;
  reference: string;
  assignedTo: string;
}

const AppBar: any = styled(MuiAppBar)<IProps>`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
  box-shadow: ${(props) => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const RabbitIcon = styled.img`
  vertical-align: middle;
  margin: 0 auto;
  height: auto;
`;

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
  object-fit: cover;
  border: 1px solid gray;
`;

const MenuItemStyle = withTheme(styled(MenuItem)`
  &&& {
    &.active {
      background: ${(props) => props.theme.palette.grey[300]};
    }
  }
`);

const ADD_LEAD_TYPE = 'addLead';
const APPOINTMENT_TYPE = 'appointment';

const SALE_AGENT_ROLE = 'roles/sales';

const flags = {
  en: '/static/img/flags/gb.png',
  thai: '/static/img/flags/th.png',
};

function LanguageMenu(props: any) {
  const [anchorMenu, setAnchorMenu] = useState(null);

  const toggleMenu = (event: any) => {
    setAnchorMenu(event.currentTarget);
  };

  const selectedLang = getLanguage();
  const [flag, setFlag] = useState(
    selectedLang === LANGUAGES.ENGLISH ? flags.en : flags.thai
  );

  const closeMenu = async () => {
    setAnchorMenu(null);
  };

  const onChangeLanguage = async (language: string) => {
    const newFlag = language === LANGUAGES.ENGLISH ? flags.en : flags.thai;
    setFlag(newFlag);
    props.changeLanguage(language);
    setAnchorMenu(null);
    window.location.reload();
  };

  return (
    <>
      <IconButton
        aria-owns={anchorMenu ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
      >
        <Flag src={flag} alt="English" />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={closeMenu}
      >
        <MenuItemStyle
          className={i18n.language === LANGUAGES.ENGLISH ? 'active' : ''}
          onClick={() => onChangeLanguage(LANGUAGES.ENGLISH)}
        >
          <Flag src={flags.en} alt="English" />
          &nbsp; English
        </MenuItemStyle>
        <MenuItemStyle
          className={i18n.language === LANGUAGES.THAI ? 'active' : ''}
          onClick={() => onChangeLanguage(LANGUAGES.THAI)}
        >
          <Flag src={flags.thai} alt="Thai" />
          &nbsp; Thai
        </MenuItemStyle>
      </Menu>
    </>
  );
}

interface IRouteMenu {
  routes: IHeaderRoutes[];
}
const LeadRouteMenu = ({ routes }: IRouteMenu) => {
  const [openAddLead, setOpenAddLead] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: any) => state.authReducer?.data || {}
  );

  const setOpenScheduleModalOnPage = () => {
    setOpenScheduleModal(true);
  };

  const handleHeaderClick = (item: IHeaderRoutes) => {
    if (item.type === ADD_LEAD_TYPE) {
      setOpenAddLead(!openAddLead);
    }
    if (item.type === APPOINTMENT_TYPE) {
      setOpenScheduleModalOnPage();
    }
  };

  const closeModalSchedule = (close: boolean) => {
    destroyModalSchedule();
    setOpenScheduleModal(close);
  };

  const customFormValue = (formValue: IFormAddLead) => {
    // INFO: after that, need to get schema id from api
    const phoneDefaultStatus = 'unverified';

    return {
      product: formValue.product || '',
      schema: ADD_LEAD_SCHEMA_ID,
      type: formValue.type || '',
      data: {
        customerFirstName: formValue.firstName,
        customerLastName: formValue.lastName,
        customerPhoneNumber: [
          {
            phone: formatE164(formValue.phone),
            status: phoneDefaultStatus,
          },
        ],
        customerEmail: [formValue.email],
      },
      assignedTo: currentUser?.user?.name || '',
      reference: formValue?.reference || '',
      source: formValue.source?.value || '',
    };
  };

  const handleResultSubmitForm = () => {
    setOpenAddLead(false);
    dispatch(
      showSnackBar({
        isOpen: true,
        message: getString('text.addLeadSuccess'),
        status: 'success',
      })
    );
  };

  const handleError = (error: any) => {
    dispatch(
      showSnackBar({
        isOpen: true,
        message: error.message || getString('text.createLeadFail'),
        status: 'error',
      })
    );
  };

  const callBackAddLead = (value: IFormAddLead) => {
    const form = customFormValue(value);

    const leadRepository = new LeadRepository();
    leadRepository
      .createLead(form as ICreateLead)
      .subscribe(handleResultSubmitForm, handleError);
  };

  return (
    <>
      <CommonModal
        title={getString('text.addLeadButton')}
        open={openAddLead}
        handleCloseModal={() => setOpenAddLead(false)}
      >
        <LeadPageAddLead
          callBackAddLead={(value: IFormAddLead) => callBackAddLead(value)}
          close={setOpenAddLead}
        />
      </CommonModal>
      <Grid item xs={12} lg={12}>
        {openScheduleModal && (
          <LeadScheduleModal
            isOpen={openScheduleModal}
            onClose={() => closeModalSchedule(false)}
          />
        )}
      </Grid>
      <Grid container item xs={9} md={9}>
        <Grid
          item
          container
          xs={12}
          md={12}
          lg={2}
          className="header-rabbit-icon"
        >
          <Link to="/">
            <RabbitIcon
              alt="Rabbit Finance"
              src="/static/img/rabbit-care-logo.svg"
              style={{ width: '150px' }}
            />
          </Link>
        </Grid>
        <Grid
          item
          container
          className="general-header__detail-buttons"
          xs={12}
          md={12}
          lg={10}
        >
          <Grid container>
            <div className="menu-route">
              {routes.map((item: IHeaderRoutes) => {
                return (
                  <div
                    color="inherit"
                    aria-label="Route Manu"
                    className="menu-route__items"
                    key={item.id}
                  >
                    <span className="menu-route__icon">
                      <MenuRoute />
                    </span>
                    <Link
                      to={item.path}
                      className="menu-route__link"
                      onClick={() => handleHeaderClick(item)}
                    >
                      <span>{item.text}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

function UserMenu() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const openLogoutModal = () => {
    dispatch(resetIsLogoutSuccess());
    setOpen(!open);
  };
  const user = useSelector((state: any) => state.authReducer.data.user);
  const userName = `${user.firstName || ''} ${user.lastName || ''}`;

  return (
    <>
      <Button
        onClick={openLogoutModal}
        startIcon={<User />}
        className="user-logout-button"
      >
        {userName}
      </Button>
      <CommonModal
        title="Logout"
        open={open}
        handleCloseModal={() => {
          setOpen(false);
        }}
      >
        <LogoutModal closeModal={() => setOpen(false)} />
      </CommonModal>
    </>
  );
}

const DefaultMenu = ({ toggleCollapse }: any) => (
  <>
    <Hidden smDown>
      <Grid container>
        <Grid
          item
          container
          xs={12}
          md={12}
          lg={2}
          className="header-rabbit-icon"
        >
          <Link to="/">
            <RabbitIcon
              alt="Rabbit Finance"
              src="/static/img/rabbit-care-logo.svg"
              style={{ width: '150px' }}
            />
          </Link>
        </Grid>
      </Grid>
    </Hidden>
    <Hidden mdUp>
      <Grid container>
        <Grid item>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleCollapse}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Hidden>
  </>
);

const Header = ({
  toggleCollapse,
  langProps,
  headerConfig,
  changeLanguage: changeLocaleLanguage,
}: any) => {
  const [isSaleAgent, setIsSaleAgent] = useState(false);
  const routeMatch: any = useRouteMatch('/lead/:id');
  const routeMatchOrder: any = useRouteMatch('/order/:id');

  const isProductSelectorShown = React.useMemo(() => {
    return !routeMatch && !routeMatchOrder;
  }, [routeMatch, routeMatchOrder]);

  const currentUser = useSelector(
    (state: any) => state.authReducer?.data || {}
  );
  useMemo(() => {
    if (currentUser.user?.role === SALE_AGENT_ROLE) {
      setIsSaleAgent(true);
    }
  }, [currentUser]);

  return (
    <>
      <div className="general-header">
        <AppBar position="sticky" color="inherit">
          <Toolbar
            className={`general-header__toolbar${
              headerConfig.params ? ' toolbar-lead-detail' : ''
            }`}
          >
            {!headerConfig.params && (
              <DefaultMenu toggleCollapse={toggleCollapse} />
            )}
            <Grid container alignItems="center">
              {headerConfig.params ? (
                <LeadRouteMenu
                  routes={isSaleAgent ? headerRoutes : emptyHeaderRoutes}
                />
              ) : (
                <Grid item xs />
              )}
              <Grid
                item
                className={`general-header__user-buttons${
                  headerConfig.params ? ' user-buttons-lead-detail' : ''
                }`}
                justify-content="flex-end"
                lg={headerConfig.params ? 3 : 6}
              >
                {isProductSelectorShown ? (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={10}
                    lg={9}
                    style={{ paddingRight: '10px' }}
                  >
                    <ProductTypeSelectorGlobal />
                  </Grid>
                ) : (
                  ''
                )}

                <UserMenu />
                <LanguageMenu
                  changeLanguage={changeLocaleLanguage}
                  lang={langProps}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    props: state,
    langProps: state.languageReducer,
    headerConfig: state.headerLayoutReducer,
  };
};
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      changeLanguage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Header));
