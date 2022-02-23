import { IRemoteConfig } from '../shared/interfaces/common';

let configs: IRemoteConfig | undefined;

export const initConfig = (): Promise<IRemoteConfig> => {
  return new Promise((resolve, reject) => {
    /**
     * Some data from remote config API place here
     */
    /**
     * Some data from remote config API place here
     */
    const config: IRemoteConfig = {
      endpoint: process.env.REACT_APP_API_ENDPOINT,
      gateway: process.env.REACT_APP_GATEWAY_ENDPOINT,
      domain: 'http://localhost:8000',
      accessToken: '7645dbab3206527a2d8120e1736fi4u44c',
      googleApiKey: 'AIzaSyDe2Kk6i-VPLHmGq-0_RH7JYk1QlaxSYMsI',
      sitecoreApiKey: '7A3E0468-E733-4F81-AABE-2BC0E797E5E0',
    };
    configs = config;
    if (configs) {
      resolve(config);
    } else {
      reject();
    }
  });
};

export const getBaseConfig = (): IRemoteConfig | undefined => {
  return configs;
};
