import { Route } from 'react-router-dom';
import React, { memo } from 'react';

const PublicRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}: any) => (
  <Layout>
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  </Layout>
);

export default memo(PublicRoute);
