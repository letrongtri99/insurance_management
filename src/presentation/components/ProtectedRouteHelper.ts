// eslint-disable-next-line no-shadow
export enum UserRoleID {
  Admin = 'roles/admin',
  Manager = 'roles/manager',
  Supervisor = 'roles/supervisor',
  SalesAgent = 'roles/sales',
  InboundAgent = 'roles/inbound',
  CustomerService = 'roles/customer-service',
  DocumentsCollection = 'roles/documents-collection',
  QualityControl = 'roles/quality-control',
  Submission = 'roles/submission',
}

export const MY_LEADS_URL = '/lead/my-leads';
export const PERMISSION_DENIED_URL = '/permission/denied';

const checkListDetail = (restPath: string) => {
  return restPath.indexOf('/lead/') !== -1;
};

export const isAuthorizeRoute = (
  userRole: string,
  restPath: string
): boolean => {
  let _isAuthorizeRoute = false;
  const isLeadDetail = checkListDetail(restPath);

  switch (userRole) {
    case UserRoleID.Admin:
      _isAuthorizeRoute = true;
      break;

    case UserRoleID.Manager:
    case UserRoleID.Supervisor:
      _isAuthorizeRoute =
        restPath === '/leads/assignment' ||
        restPath === '/leads/rejection' ||
        restPath === '/leads/all' ||
        restPath === '/leads/import' ||
        restPath === '/' ||
        restPath === '/permission/denied' ||
        restPath === '/account/settings' ||
        isLeadDetail;
      break;

    case UserRoleID.SalesAgent:
      _isAuthorizeRoute =
        restPath === '/lead/my-leads' ||
        restPath === '/permission/denied' ||
        restPath === '/account/settings' ||
        isLeadDetail;
      break;

    case UserRoleID.InboundAgent:
      _isAuthorizeRoute =
        restPath === '/leads/all' ||
        restPath === '/leads/import' ||
        restPath === '/' ||
        restPath === '/permission/denied' ||
        restPath === '/account/settings' ||
        isLeadDetail;
      break;

    default:
      break;
  }

  return _isAuthorizeRoute;
};
