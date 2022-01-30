import {runDevelopmentBundler} from './development.bundler';
import {runProductionBundler} from './production.bundler';
import {runModeInfo} from '@util/env';
import {IOptions} from '../contract';

export const reactBundler = (opt: IOptions): void => {
  const {isProduction} = runModeInfo();
  if (isProduction) {
    runProductionBundler(opt);
    return;
  }
  runDevelopmentBundler(opt);
}
