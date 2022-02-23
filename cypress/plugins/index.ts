import resolve from 'resolve';
import browserify from '@cypress/browserify-preprocessor';
import del from 'del';
import { some } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cucumber = require('cypress-cucumber-preprocessor').default;

export default (
  on: (
    arg0: string,
    arg1: { (spec: any, results: any): void; (browser: any, args: any): any }
  ) => void,
  config: { projectRoot: any }
) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { basedir: config.projectRoot }),
  };
  on('file:preprocessor', cucumber(options));
};
