import webpack from 'webpack';
import {logAction, logErr, logSuccess, logWarn} from '../../util/log';
import {cleanDir, copySync} from '../../util/common';
import {getProductionConfig} from './config/config';
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

  webpack(getProductionConfig(opt), (err, stats) => {
    const message = stats?.toString() || 'none';
    if (err || stats?.hasErrors()) {
      logErr('Bundle error:', err?.toString() || 'none');
      logErr('Webpack stats error:', message);
    } else if (stats?.hasWarnings()) {
      logWarn('Webpack stats warning:', message);
    } else
      logSuccess('', message);
  });

  logAction('Creating an optimized production build...');
}
