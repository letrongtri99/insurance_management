/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const { from, logger } = require('env-var');

const env = from(process.env, {}, logger);

export const isHealthRevamp = env
  .get('REACT_APP_HEALTH_REVAMP')
  .default('false')
  .asBool();

export const isRebranding = env
  .get('REACT_APP_REBRANDING')
  .default('false')
  .asBool();
