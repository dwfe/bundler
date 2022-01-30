import {runDevelopmentBundler} from './development.bundler';
import {runProductionBundler} from './production.bundler';
import {runModeInfo} from '@util/env';
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
