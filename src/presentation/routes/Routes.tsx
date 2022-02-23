import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthLayout from 'presentation/layouts/Auth';
import Page404 from 'presentation/pages/auth/Page404';
import {
  account as accountRoutes,
  dashboard as dashboardRoutes,
  auth as authRoutes,
  lead as leadRoutes,
  permissionDenied,
  flattenRoutes,
  packages as packageRoutes,
  carDiscount as carDiscountRoutes,
  order as orderRoutes,
} from './index';
import ProtectedRoute from '../components/ProtectedRoute';
import { IRoutes } from './route.interface';
import PublicRoute from '../components/PublicRoute';

const Routes = () => {
  const baseProtectedRoutes = [
    ...accountRoutes,
    ...leadRoutes,
    ...dashboardRoutes,
    ...permissionDenied,
    ...packageRoutes,
    ...carDiscountRoutes,
    ...orderRoutes,
  ];
  const protectedRoutes = flattenRoutes(baseProtectedRoutes, []);
  const publicRoutes = flattenRoutes(authRoutes, [], true);
  return (
    <Router>
      <Switch>
        {publicRoutes.map((route: IRoutes) => (
          <PublicRoute
            key={route.path}
            component={route.component}
            layout={route.layout}
            path={route.path}
            exact
          />
        ))}
        {protectedRoutes.map((route: IRoutes) => (
          <ProtectedRoute
            key={route.layout}
            component={route.component}
            layout={route.layout}
            path={route.path}
            exact
          />
        ))}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
