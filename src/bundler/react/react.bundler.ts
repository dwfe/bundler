import {runModeInfo} from '@do-while-for-each/env';
import {runDevelopmentBundler} from './development.bundler';
import {runProductionBundler} from './production.bundler';
import {IOptions} from '../contract';

export const reactBundler = (opt: IOptions): void => {
  switch (runModeInfo().NODE_ENV) {
    case 'production':
      runProductionBundler(opt);
      break;
    default:
      runDevelopmentBundler(opt);
  }
}
