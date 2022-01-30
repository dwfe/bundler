import webpack from 'webpack';
import {logAction, logErr, logSuccess, logWarn} from '@util/log';
import {getProductionConfig} from './config/config';
import {cleanDir, copySync} from '@util/common';
import {IOptions} from '../contract';
import {prepareEnv} from '@util/env';

export function runProductionBundler(opt: IOptions): void {
  const {outputPath, assetPath, templatePath} = opt;

  prepareEnv('production');

  logAction('Preparing the output directory...');
  cleanDir(outputPath);
  if (assetPath) {
    const allowedToCopyFilter = templatePath
      ? (srcPath: string) => srcPath !== templatePath // usually the template is put in the asset dir
      : undefined;
    copySync(assetPath, outputPath, allowedToCopyFilter);
  }

  logAction('Creating an optimized production build...');
  webpack(getProductionConfig(opt), (err, stats) => {
    const message = stats?.toString() || 'none';
    if (err || stats?.hasErrors()) {
      logErr('Bundle error:', err?.toString() || 'none');
      logErr('Webpack stats error:', message);
      return;
    }
    if (stats?.hasWarnings()) {
      logWarn('Webpack stats warning:', message);
      return;
    }
    logSuccess('', message);
  });

}
