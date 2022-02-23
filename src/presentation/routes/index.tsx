import React from 'react';

import { Monitor, Sliders, Users, UserX, Settings, Star } from 'react-feather';
import async from '../components/Async';
import { IRoutes } from './route.interface';
import DashboardLayout from '../layouts/Dashboard';
import AuthLayout from '../layouts/Auth';
import LeadLayout from '../layouts/Lead';
import OrderLayout from '../layouts/Order';

const LeadRejectionPage = async(
  () => import('../pages/leads/LeadRejectionPage')
);
const LeadAllPage = async(() => import('../pages/leads/LeadAllPage'));
const LeadAssignmentPage = async(
  () => import('../pages/leads/LeadAssignmentPage')
);
// Auth components
const SignIn = async(() => import('../pages/auth/SignIn'));
const Page404 = async(() => import('../pages/auth/Page404'));
const Page500 = async(() => import('../pages/auth/Page500'));

// Home
// const Presentation = async(() => import('../pages/docs/Presentation'));
const Home = async(() => import('../pages/Home'));

// Leads
const LeadScoringPage = async(() => import('../pages/leads/LeadScoringPage'));
const LeadSourcePage = async(() => import('../pages/leads/LeadSourcePage'));
const LeadOverFlowPage = async(() => import('../pages/leads/LeadOverFlowPage'));
const LeadDistribution = async(
  () => import('../pages/leads/LeadDistributionPage')
);

// Lead Page
const LeadPage = async(() => import('../pages/LeadDetailsPage'));
const OrderPage = async(() => import('../pages/OrderDetailPage'));
const CustomQuotePage = async(
  () => import('../pages/LeadDetailsPage/CustomQuote')
);

// Orders Pages
const OrdersAllPage = async(() => import('../pages/orders/All'));
const OrderDocumentsPage = async(() => import('../pages/orders/Documents'));
const QCModulePage = async(() => import('../pages/orders/QCModule'));
const OrderSubmissionPage = async(() => import('../pages/orders/Submission'));
const OrderApprovalPage = async(() => import('../pages/orders/Approval'));

const MyLeadPage = async(() => import('../pages/myLeads'));

// Admin
const ImportLeadPage = async(() => import('../pages/leads/ImportLeadPage'));
const UserPage = async(() => import('../pages/admin/users'));

// Admin Routes
const AdminTeamPage = async(() => import('../pages/admin/Team'));

// Package Routes
const PackageImportPage = async(
  () => import('../pages/package/ImportPackagePage')
);

// Car Discount Routes
const CarDiscountImportPage = async(
  () => import('../pages/carDiscount/ImportCarDiscountPage')
);

// Permission Denied
const PermissionDeniedPage = async(() => import('../pages/permissionDenied'));
const PackageSearchPage = async(() => import('../pages/package/packageSearch'));

// Account Settings
const AccountSettingsPage = async(() => import('../pages/Account/Settings'));

const presentationRoutes: IRoutes = {
  id: 'Home',
  path: '/',
  icon: <Monitor />,
  component: Home,
  children: null,
  layout: DashboardLayout,
};

const accountRoutes: IRoutes = {
  id: 'Settings',
  path: '/account/settings',
  icon: <Monitor />,
  component: AccountSettingsPage,
  children: null,
  layout: AuthLayout,
};

const leadsRoutes: IRoutes = {
  id: 'Leads',
  path: '/leads',
  icon: <Star />,
  layout: DashboardLayout,
  children: [
    {
      path: '/leads/all',
      name: 'All',
      component: LeadAllPage,
    },
    {
      path: '/leads/assignment',
      name: 'Assignment',
      component: LeadAssignmentPage,
    },
    {
      path: '/leads/rejection',
      name: 'Rejection',
      component: LeadRejectionPage,
    },
    {
      path: '/leads/import',
      name: 'Import',
      component: ImportLeadPage,
    },
  ],
};

const ordersRoutes: IRoutes = {
  id: 'Orders',
  path: '/orders',
  icon: <Star />,
  layout: DashboardLayout,
  children: [
    {
      path: '/orders/all',
      name: 'All',
      component: OrdersAllPage,
    },
    {
      path: '/orders/documents',
      name: 'Documents',
      component: OrderDocumentsPage,
    },
    {
      path: '/orders/qc',
      name: 'QC',
      component: QCModulePage,
    },
    {
      path: '/orders/submission',
      name: 'Submission',
      component: OrderSubmissionPage,
    },
    {
      path: '/orders/approval',
      name: 'Approval',
      component: OrderApprovalPage,
    },
  ],
};

const leadSettingsRoutes: IRoutes = {
  id: 'Lead Setting',
  path: '/leads-settings',
  icon: <Settings />,
  layout: DashboardLayout,
  children: [
    {
      path: '/leads-settings/scoring',
      name: 'Scoring',
      component: LeadScoringPage,
    },
    {
      path: '/leads-settings/distribution',
      name: 'Distribution',
      component: LeadDistribution,
    },
    {
      path: '/leads-settings/sources',
      name: 'Sources',
      component: LeadSourcePage,
    },
    {
      path: '/leads-settings/overflow',
      name: 'Overflow',
      component: LeadOverFlowPage,
    },
    {
      path: '/leads-settings/segmentation',
      name: 'Segmentation',
      component: Home,
    },
    {
      path: '/leads-settings/slip',
      name: 'Slip Upload',
      component: Home,
    },
  ],
};

const adminRoutes: IRoutes = {
  id: 'Admin',
  path: '/admin',
  icon: <UserX />,
  layout: DashboardLayout,
  children: [
    {
      path: '/admin/teams',
      name: 'Teams',
      component: AdminTeamPage,
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: UserPage,
    },
  ],
};

const packageRoutes: IRoutes = {
  id: 'Package',
  path: '/package',
  icon: <UserX />,
  layout: DashboardLayout,
  children: [
    {
      path: '/package/search',
      name: 'Search',
      component: PackageSearchPage,
    },
    {
      path: '/package/import',
      name: 'Import',
      component: PackageImportPage,
    },
  ],
};

const authRoutes: IRoutes = {
  id: 'Auth',
  path: '/auth',
  icon: <Users />,
  name: 'Auth',
  layout: AuthLayout,
  children: [
    {
      path: '/auth/sign-in',
      name: 'Sign In',
      component: SignIn,
    },
    {
      path: '/auth/404',
      name: '404 Page',
      component: Page404,
    },
    {
      path: '/auth/500',
      name: '500 Page',
      component: Page500,
    },
  ],
};

const leadRoutes: IRoutes = {
  id: 'Lead',
  path: '/lead',
  name: 'Lead',
  layout: LeadLayout,
  children: [
    {
      path: '/lead/my-leads',
      name: 'My Leads',
      component: MyLeadPage,
    },
    {
      path: '/lead/:id',
      name: 'Lead',
      component: LeadPage,
    },
    {
      path: '/lead/:id/custom-quote',
      name: 'Custom Quote Page',
      component: CustomQuotePage,
    },
  ],
};

const orderRoutes: IRoutes = {
  id: 'Order',
  path: '/order',
  name: 'Order',
  layout: OrderLayout,
  children: [
    {
      path: '/order/:id',
      name: 'Order',
      component: OrderPage,
    },
  ],
};

const carDiscountRoutes: IRoutes = {
  id: 'CarDiscount',
  path: '/car-discount',
  name: 'Car Discount',
  layout: DashboardLayout,
  children: [
    {
      path: '/car-discount/import',
      name: 'Import',
      component: CarDiscountImportPage,
    },
  ],
};

const permissionDeniedRoutes: IRoutes = {
  id: 'PermissionDenied',
  path: '/permission',
  name: 'Permission Denied',
  layout: LeadLayout,
  children: [
    {
      path: '/permission/denied',
      name: 'Permission Denied',
      component: PermissionDeniedPage,
    },
  ],
};

export const account = [accountRoutes];
export const dashboard = [
  leadsRoutes,
  leadSettingsRoutes,
  ordersRoutes,
  adminRoutes,
  packageRoutes,
  presentationRoutes,
  carDiscountRoutes,
  orderRoutes,
];
export const lead = [leadRoutes];
export const auth = [authRoutes];
export const permissionDenied = [permissionDeniedRoutes];
export const packages = [packageRoutes];
export const carDiscount = [carDiscountRoutes];
export const order = [orderRoutes];
export const flattenRoutes = (
  routes: IRoutes[],
  collection: IRoutes[],
  hasPathLanguage = false
) => {
  const localesString = '/:locale(th|en)?';
  routes.forEach((route: IRoutes) => {
    if (!route.component && !route.children?.length) {
      return;
    }
    const { children, ...parent } = route;
    if (parent.component) {
      collection.push(parent);
    } else if (children?.length) {
      const childWithLayout = children.map((item: IRoutes) => ({
        ...item,
        path: hasPathLanguage ? `${localesString}${item.path}` : item.path,
        layout: item.layout || parent.layout,
      }));
      flattenRoutes(childWithLayout, collection);
    }
  });
  return collection;
};

export default [
  accountRoutes,
  authRoutes,
  leadsRoutes,
  leadSettingsRoutes,
  adminRoutes,
  packageRoutes,
  permissionDeniedRoutes,
  packageRoutes,
  carDiscountRoutes,
  orderRoutes,
];
