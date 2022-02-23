import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';
import AuthRepository from 'data/repository/auth';
import { Paper } from '@material-ui/core';
import './index.scss';
import { RabbitResource } from '../../../../data/gateway/api/resource';
import Loading from '../../../../Loading';
import Form, { KratosFormConfig } from '../../../components/Kratos/Form';

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const SignIn = (): any => {
  const [requestToken, setRequestToken] = useState<string>('');
  const { search } = useLocation();
  const history = useHistory();
  const authInfo = useSelector((state: any) => state.authReducer);
  const [formConfig, setFormConfig] = useState<KratosFormConfig>();

  useEffect(() => {
    if (authInfo.data.updatedLastLogin) {
      history.push('/');
    }
  }, [authInfo.data.updatedLastLogin]);

  const getRequestContext = () => {
    const request = search.split('=')[1];
    const loginUrl = RabbitResource.Auth.getLoginUrl();
    if (!request) {
      window.location.replace(loginUrl);
      return;
    }
    setRequestToken(request);
    AuthRepository.getLoginRequest(request).subscribe(
      ({ response }: any) => {
        setFormConfig(response.methods.password.config);
      },
      () => {
        window.location.replace(loginUrl);
      }
    );
  };

  useEffect(() => {
    getRequestContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!requestToken ? (
        <Loading />
      ) : (
        <Wrapper className="sign-in-page">
          <Helmet title="Sign In" />
          {formConfig ? (
            <Form config={formConfig} isFetching={authInfo.isFetching} />
          ) : (
            ''
          )}
        </Wrapper>
      )}
    </>
  );
};

export default memo(SignIn);
