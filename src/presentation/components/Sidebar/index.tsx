import React, { ComponentProps, useEffect, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { rgba, darken } from 'polished';
import {
  NavLink as RouterNavLink,
  useLocation,
  Link as LinkRabbitIcon,
} from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ContactSupportOutlined,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import {
  Chip,
  Collapse,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import withCircle from 'presentation/HOCs/WithCircle';
import { useSelector } from 'react-redux';
import { AdminUser, LeadAll, PackageImportIcon } from '../icons';
import getRoutesWithUserRole from './sideBar.helper';
import { getString } from '../../theme/localization';

interface ILink {
  component: any;
  exact: boolean;
  to: string;
  activeClassName: string;
}

const NavLink = React.forwardRef((props: any, ref: any) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Brand = styled.div`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(6)}px;
  padding-top: ${(props) => props.theme.spacing(4)}px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }
`;

const Items: StyledComponent<any, any> = styled.div`
  ${(props) => props.theme.breakpoints.up('lg')} {
    padding-top: ${(props) => props.theme.spacing(2.5)}px;
  }
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
  overflow: hidden;
`;

const Category: StyledComponent<any, any> = styled(ListItem)`
  padding: 15px 30px;
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  white-space: nowrap;

  &.${(props: any) => props.activeclassname} {
    // Active color
    background-color: ${(props) => props.theme.sidebar.header.background};

    span {
      color: ${(props) => props.theme.palette.primary.main};
    }

    .svg-wrapper {
      background: ${(props) => props.theme.palette.primary.main};
    }

    svg {
      color: ${(props) => props.theme.palette.primary.contrastText};

      & path {
        fill: ${(props) => props.theme.palette.primary.contrastText};
      }
    }
  }

  &.${(props: any) => props.activeclassname}:hover {
    background-color: ${(props) =>
      props.theme.sidebar.header.background} !important;
  }
`;

const RabbitIcon = styled.img`
  vertical-align: middle;
  margin: 0 auto;
  height: auto;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: ${(props) => props.theme.spacing(4)}px;

  svg {
    color: ${(props) => props.theme.palette.primary.main};
    vertical-align: middle;
  }
`;

const CategoryText: StyledComponent<any, any> = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) => props.theme.sidebar.color};
    font-size: ${(props) => props.theme.typography.sidebar.fontSize}px;
    font-weight: ${(props) => props.theme.sidebar.category.fontWeight};
  }

  &.minimize {
    display: none;
  }
`;

const CategoryIconLess: StyledComponent<any, any> = styled(ExpandLess)`
  color: ${(props) => props.theme.sidebar.color};
`;

const CategoryIconMore: StyledComponent<any, any> = styled(ExpandMore)`
  color: ${(props) => props.theme.sidebar.color};
`;

const Link: StyledComponent<any, any> = styled(ListItem)<ILink>`
  width: 77.5%;
  float: right;
  padding-left: ${(props) => props.theme.spacing(2.75)}px;
  padding-top: ${(props) => props.theme.spacing(4)}px;
  padding-bottom: ${(props) => props.theme.spacing(4)}px;

  span {
    font-weight: ${(props) => props.theme.typography.sidebar.fontWeight};
  }

  &:hover span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${(props: any) => props.activeClassName} {
    background-color: ${(props) => props.theme.palette.common.white};
    border-top-left-radius: ${(props) => props.theme.spacing(2)}px;
    border-bottom-left-radius: ${(props) => props.theme.spacing(2)}px;

    span {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const LinkText: StyledComponent<any, any> = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  span {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge: StyledComponent<any, any> = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge: StyledComponent<any, any> = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection: StyledComponent<any, any> = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  padding: ${(props) => props.theme.spacing(4)}px
    ${(props) => props.theme.spacing(6)}px
    ${(props) => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

const Wrapper: StyledComponent<any, any> = styled.div`
  border-right: 0;
  height: 100vh;
  width: ${(props: any) =>
    `${props.collapse ? props.collapsedWidth : props.width}px`};
  overflow-y: auto;
  align-self: start;
  position: sticky;
  -webkit-transition: width 0.1s ease-in-out;
  -moz-transition: width 0.1s ease-in-out;
  -o-transition: width 0.1s ease-in-out;
  transition: width 0.1s ease-in-out;
  top: 0;
  z-index: 2;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  height: fit-content;
  min-height: 100vh;
`;

type SidebarLinkContainerProps = {
  readonly isActive: boolean;
};

const SidebarLinkContainer = styled.div<SidebarLinkContainerProps>`
  position: relative;
  &::before {
    content: '';
    border: 1px solid
      ${(props) =>
        props.isActive ? props.theme.palette.common.blue : 'transparent'};
    position: absolute;
    top: -15px;
    left: 40px;
    height: 100%;
    z-index: 1;
  }
`;

const EmptySidebarCategory = styled(SidebarCategory)`
  &&& {
    pointer-events: none;
  }
`;

const CollapseButton = styled.button`
  position: fixed;
  border: 1px solid ${(props) => props.theme.palette.common.blue};
  box-shadow: ${(props) => props.theme.shadows[25]};
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  z-index: 1200;
  top: 75px;
  border-radius: 50%;
  left: 236px;
  cursor: pointer;
  transition: all 0.1s ease 0s;

  &.minimize {
    left: 70px;
  }

  &:focus {
    outline: 0;
  }
`;

const cypressClass = (name: string) => {
  const nameFormatted = name ? name.toLowerCase().replace(/ /g, '') : '';

  return `list-item_${nameFormatted}`;
};

function SidebarCategory({
  name,
  icon,
  collapse,
  isOpen,
  isCollapsable,
  badge,
  activeClassName,
  ...rest
}: any) {
  return (
    <Category activeclassname={activeClassName} {...rest}>
      <Icon>{icon}</Icon>
      <CategoryText
        className={clsx('category-text', collapse && 'minimize')}
        data-cy={cypressClass(name)}
      >
        {name}
      </CategoryText>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isCollapsable && !collapse ? (
        isOpen ? (
          <CategoryIconMore className="icon-collapsible" />
        ) : (
          <CategoryIconLess className="icon-collapsible" />
        )
      ) : null}
      {badge ? <CategoryBadge label={badge} /> : ''}
    </Category>
  );
}

function SidebarLink({ name, to, badge }: any) {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ''}
    </Link>
  );
}

export const routes = () => [
  {
    id: getString('menu.lead.root'),
    path: '/leads/assignment',
    icon: withCircle(LeadAll),
    children: [
      {
        name: getString('menu.lead.assignment'),
        path: '/leads/assignment',
        id: 'Assignment',
      },
      {
        name: getString('menu.lead.rejections'),
        path: '/leads/rejection',
        id: 'Rejections',
      },
      {
        name: getString('menu.lead.all'),
        path: '/leads/all',
        id: 'All',
      },
      {
        name: getString('menu.lead.import'),
        path: '/leads/import',
        id: 'Import',
      },
      {
        name: getString('menu.lead.distribution'),
        path: '/leads-settings/distribution',
        id: 'Distribution',
      },
      {
        name: getString('menu.lead.sources'),
        path: '/leads-settings/sources',
        id: 'Sources',
      },
      {
        name: getString('menu.lead.scoring'),
        path: '/leads-settings/scoring',
        id: 'Scoring',
      },
      {
        name: getString('menu.lead.overflow'),
        path: '/leads-settings/overflow',
        id: 'Overflow',
      },
      {
        name: getString('menu.lead.segmentation'),
        path: '/leads-settings/segmentation',
        id: 'Segmentation',
      },
    ],
  },
  {
    id: getString('menu.order.root'),
    path: '/orders/all',
    icon: withCircle(LeadAll),
    children: [
      {
        name: getString('menu.order.all'),
        path: '/orders/all',
        id: 'All',
      },
      {
        name: getString('menu.order.documents'),
        path: '/orders/documents',
        id: 'Documents',
      },
      {
        name: getString('menu.order.QC'),
        path: '/orders/qc',
        id: 'QC',
      },
      {
        name: getString('menu.order.submission'),
        path: '/orders/submission',
        id: 'Submission',
      },
      {
        name: getString('menu.order.approval'),
        path: '/orders/approval',
        id: 'Approval',
      },
    ],
  },
  {
    id: getString('menu.userManagement.root'),
    path: '/admin/teams',
    icon: withCircle(AdminUser),
    children: [
      {
        name: getString('menu.userManagement.users'),
        path: '/admin/users',
        id: 'Users',
      },
      {
        name: getString('menu.userManagement.teams'),
        path: '/admin/teams',
        id: 'Teams',
      },
    ],
  },
  {
    id: getString('menu.package.root'),
    path: '/package/import',
    icon: withCircle(PackageImportIcon),
    children: [
      {
        name: getString('menu.package.search'),
        path: '/package/search',
        id: 'Search',
      },
      {
        name: getString('menu.package.import'),
        path: '/package/import',
        id: 'Import',
      },
    ],
  },
  {
    id: getString('menu.carDiscount.root'),
    path: '/car-discount/import',
    icon: withCircle(PackageImportIcon),
  },
];

function Sidebar({
  routes,
  collapse,
  toggleCollapse,
  ...rest
}: ComponentProps<any>) {
  const location = useLocation();
  const [routesWithRole, setRoutesWithRole] = useState(routes);

  const currentUser = useSelector(
    (state: any) => state.authReducer?.data || {}
  );

  useEffect(() => {
    if (currentUser.user.role) {
      setRoutesWithRole(getRoutesWithUserRole(currentUser.user.role, routes()));
    }
  }, [currentUser, routes]);

  const initOpenRoutes = () => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname;
    const pathNameArr = pathName.split('/');
    pathNameArr.shift();
    const [category] = pathNameArr;

    let _routes = {};

    routes().forEach((route: any, index: number) => {
      const isActive = category === route.path.split('/').join('');
      const isOpen = route.open;
      const isHome = !!(route.containsHome && pathName === '/');

      _routes = { ..._routes, [index]: isActive || isOpen || isHome };
    });

    return _routes;
  };

  const [openRoutes, setOpenRoutes]: any = useState(() => initOpenRoutes());

  const toggle = (index: any) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      (item) =>
        openRoutes[index] ||
        setOpenRoutes((openedRoutes: any) => ({
          ...openedRoutes,
          [item]: false,
        }))
    );

    // Toggle selected element
    setOpenRoutes((openedRoutes: any) => ({
      ...openedRoutes,
      [index]: !openedRoutes[index],
    }));
  };

  // @ts-ignore
  return (
    <Wrapper
      className="general-side-bar"
      variant="permanent"
      collapse={collapse}
      {...rest}
    >
      <Scrollbar>
        <List>
          <Items>
            <Hidden smDown>
              <React.Fragment key="empty">
                <EmptySidebarCategory isCollapsable={false} />
                <EmptySidebarCategory isCollapsable={false} />
                <CollapseButton
                  type="button"
                  className={clsx('collapse-button', collapse && 'minimize')}
                  onClick={toggleCollapse}
                >
                  {collapse ? (
                    <ChevronRight style={{ fontSize: 28 }} />
                  ) : (
                    <ChevronLeft style={{ fontSize: 28 }} />
                  )}
                </CollapseButton>
              </React.Fragment>
            </Hidden>
            <Hidden mdUp>
              <Brand>
                <LinkRabbitIcon to="/">
                  <RabbitIcon
                    alt="Rabbit Finance"
                    src="/static/img/rabbit-care-logo.svg"
                    style={{ width: '150px' }}
                  />
                </LinkRabbitIcon>
              </Brand>
            </Hidden>
            {routesWithRole.map((navItem: any, index: number) => (
              <React.Fragment key={index}>
                {navItem.header ? (
                  <SidebarSection>{navItem.header}</SidebarSection>
                ) : null}

                {navItem.children && navItem.children.length ? (
                  <React.Fragment key={index}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable
                      name={navItem.id}
                      icon={navItem.icon}
                      collapse={collapse}
                      button
                      onClick={() => toggle(index)}
                      className="list-item"
                    />
                    {!collapse && (
                      <SidebarLinkContainer isActive={openRoutes[index]}>
                        <Collapse
                          in={openRoutes[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          {navItem.children.map((route: any, index: number) => (
                            <SidebarLink
                              key={index}
                              name={route.name}
                              to={route.path}
                              icon={route.icon}
                              badge={route.badge}
                            />
                          ))}
                        </Collapse>
                      </SidebarLinkContainer>
                    )}
                  </React.Fragment>
                ) : (
                  <SidebarCategory
                    isCollapsable={false}
                    name={navItem.id}
                    to={navItem.path}
                    activeClassName="active"
                    component={NavLink}
                    icon={navItem.icon}
                    collapse={collapse}
                    exact
                    badge={navItem.badge}
                  />
                )}
              </React.Fragment>
            ))}
          </Items>
        </List>
      </Scrollbar>
    </Wrapper>
  );
}

export default Sidebar;
