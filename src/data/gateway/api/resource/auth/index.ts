import { IResource } from '../../../../../shared/interfaces/common/resource';
import Type from '../../type';

const KRATOS_LOGIN = '/self-service/login/browser';
const KRATOS_SETTINGS = '/self-service/settings/browser';
const KRATOS_LOGOUT = '/public/self-service/browser/flows/logout';
const KRATOS_LOGIN_REQUEST = '/self-service/login/flows';
const KRATOS_SETTINGS_REQUEST = '/self-service/settings/flows';
const KRATOS_WHOAMI = '/sessions/whoami';

const baseKratosUrl = process.env.REACT_APP_KRATOS_URL;
const recoveryLinkUrl = process.env.REACT_APP_RECOVERY_URL;

const getLoginUrl = (): string => `${baseKratosUrl}${KRATOS_LOGIN}`;

const getSettingsUrl = (): string => `${baseKratosUrl}${KRATOS_SETTINGS}`;

const getLogoutUrl = (): string => `${baseKratosUrl}${KRATOS_LOGOUT}`;

const getAuthInfoUrl = (): string => `${baseKratosUrl}${KRATOS_WHOAMI}`;

const getLoginMethodUrl = (): string =>
  `${baseKratosUrl}${KRATOS_LOGIN_REQUEST}`;

const getSettingsMethodUrl = (flow: string): string =>
  `${baseKratosUrl}${KRATOS_SETTINGS_REQUEST}?id=${flow}`;

const getRecoveryLinkUrl = (user: string): string => {
  if (!recoveryLinkUrl) {
    throw new Error('Recovery Link URL not configured');
  }

  return recoveryLinkUrl.replace('{user}', user);
};

const login = (): IResource => ({
  Type: Type.Public,
  Path: `${baseKratosUrl}${KRATOS_LOGIN}`,
});

export default {
  getAuthInfoUrl,
  getLoginUrl,
  getLogoutUrl,
  getLoginMethodUrl,
  getSettingsUrl,
  getSettingsMethodUrl,
  getRecoveryLinkUrl,
  login,
};
