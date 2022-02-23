import { RabbitResource } from 'data/gateway/api/resource';
import ApiGateway from 'data/gateway/api';
import getConfig from 'data/setting';
import { ajax } from 'rxjs/ajax';
import axios from 'axios';
import { API_METHOD } from '../../../shared/constants';

const apiGateway = ApiGateway.createAPIConnection(getConfig());

const getAuthInfo = () => {
  const url = RabbitResource.Auth.getAuthInfoUrl();
  return apiGateway.doAjaxRequest(url, API_METHOD.GET);
};

const getLoginRequest = (requestToken: string) => {
  let url = RabbitResource.Auth.getLoginMethodUrl();
  url += `?id=${requestToken}`;
  return ajax({
    url,
    method: 'GET',
    withCredentials: true,
  });
};

const login = ({
  url,
  method,
  body,
}: {
  url: string;
  method: API_METHOD;
  body: any;
}) => {
  const data = new URLSearchParams();
  Object.keys(body).forEach((key: string) => {
    data.append(key, body[key]);
  });
  return axios.request({
    url,
    method,
    data,
    headers: { Accept: 'text/html' },
    withCredentials: true,
  });
};

const updateLastLogin = (id: string) => {
  const url = RabbitResource.User.getUser(id);
  const body = { loginTime: new Date().toISOString() };
  return apiGateway.doPatchAjaxRequest(url, body);
};

export default { getAuthInfo, getLoginRequest, login, updateLastLogin };
