import { UserRoleID } from '../ProtectedRouteHelper';

const getRoutesWithUserRole = (userRole: string, routes: any[]) => {
  let newRoutes;
  switch (userRole) {
    case UserRoleID.Admin:
      newRoutes = routes;
      break;
    case UserRoleID.Manager:
    case UserRoleID.Supervisor:
      newRoutes = routes.filter(
        (route) =>
          route.path === '/leads/assignment' ||
          route.path === '/leads/rejection' ||
          route.path === '/leads/all' ||
          route.path === '/leads/import'
      );
      break;
    case UserRoleID.InboundAgent:
      newRoutes = routes.filter(
        (route) => route.path === '/leads/all' || route.path === '/leads/import'
      );
      break;
    default:
      break;
  }

  return newRoutes;
};

export default getRoutesWithUserRole;
