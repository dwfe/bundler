import {runModeInfo} from '@do-while-for-each/env';
import {developmentReactBundler} from './development.bundler';
import {productionReactBundler} from './production.bundler';
import {IOptions} from '../contract';

export const reactBundler = (opt: IOptions): void => {
  switch (runModeInfo().NODE_ENV) {
    case 'production':
      productionReactBundler(opt);
      break;
    default:
      developmentReactBundler(opt);
  }
}
