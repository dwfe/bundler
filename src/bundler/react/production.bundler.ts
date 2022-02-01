import webpack from 'webpack';
import {callbackWebpack, cleanDir, copySync} from '../../util/common';
import {getProductionConfig} from './config/config';
import {logAction} from '../../util/log';
import {IOptions} from '../contract';

export function runProductionBundler(opt: IOptions): void {
  const {outputPath, assetPath, templatePath} = opt;

  logAction('Preparing the output directory...', false);
  cleanDir(outputPath);
  if (assetPath) {
    const allowedToCopyFilter = templatePath
      ? (srcPath: string) => srcPath !== templatePath // usually the template is put in the asset dir
      : undefined;
    copySync(assetPath, outputPath, allowedToCopyFilter);
  }

  webpack(getProductionConfig(opt), callbackWebpack);

  logAction('Creating an optimized production build...', false);
}
