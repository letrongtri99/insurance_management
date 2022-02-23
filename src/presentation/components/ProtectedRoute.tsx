import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import presentRoute from 'presentation/components/controls/Services/serviceHandleRoute';
import {
  UserRoleID,
  isAuthorizeRoute,
  MY_LEADS_URL,
  PERMISSION_DENIED_URL,
} from './ProtectedRouteHelper';
import { authenticate } from '../redux/actions/auth';
import { RabbitResource } from '../../data/gateway/api/resource';
import { intervalObservable, triggerEventObservable } from '../../app.helper';
import { updatePresence } from '../redux/actions/presence';
import Loading from '../../Loading';

const ProtectedRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}: any) => {
  const dispatch = useDispatch();
  const {
    isFetching,
    success,
    data: { user, isAuth, isAuthorized, isSuspend },
  } = useSelector((state: any) => state.authReducer, shallowEqual);
  useEffect(() => {
    if (!isAuth) {
      dispatch(authenticate());
    }
  }, [isAuth]); // eslint-disable-line

  useEffect(() => {
    if (user) {
      let interactTime = new Date().toISOString();
      const interactTimeSubscription = triggerEventObservable().subscribe(
        () => {
          interactTime = new Date().toISOString();
        }
      );
      const intervalTimeSubscription = intervalObservable().subscribe(() => {
        const body = {
          interactTime,
        };
        dispatch(updatePresence(body, user.name));
      });
      return () => {
        interactTimeSubscription.unsubscribe();
        intervalTimeSubscription.unsubscribe();
      };
    }
    return () => null;
  }, [updatePresence, user]); // eslint-disable-line

  const renderRedirectPage = () => {
    let redirectURL = '';
    if (user && user.role && rest.path) {
      if (user.role === UserRoleID.SalesAgent) {
        redirectURL = rest.path === '/' ? MY_LEADS_URL : PERMISSION_DENIED_URL;
        return (
          <Redirect
            to={{
              pathname: redirectURL,
            }}
          />
        );
      }
      redirectURL = PERMISSION_DENIED_URL;

      return <Redirect to={{ pathname: redirectURL }} />;
    }
    return <Redirect to={{ pathname: redirectURL }} />;
  };

  useEffect(() => {
    presentRoute.next(rest.path);
  }, [rest.path]);

  if (isSuspend) {
    // INFO: if user has been suspended => redirect to login page
    return <Redirect to={{ pathname: '/auth/sign-in' }} />;
  }

  if (isFetching || !success) {
    return <Loading />;
  }
  if (!isAuth) {
    window.location.replace(RabbitResource.Auth.getLoginUrl());
  }

  if (!isAuthorized) {
    return <Loading />;
  }

  return (
    <Layout>
      <Route
        {...rest}
        render={(props) => {
          return isAuthorizeRoute(user.role, rest.path) ? (
            <Component {...props} authInfo={user} />
          ) : (
            renderRedirectPage()
          );
        }}
      />
    </Layout>
  );
};

export default memo(ProtectedRoute);
