import {logAction} from '@do-while-for-each/log-node';
import {cleanDir, copy} from '@do-while-for-each/fs';
import {basename} from 'path';
import {existsSync} from 'fs';
import webpack from 'webpack';
import {getProductionConfig} from './config/config';
import {callbackWebpack} from '../../util/cmmn';
import {IOptions} from '../contract';

export function productionReactBundler(opt: IOptions): void {
  const {outputPath, assetPath, templatePath} = opt;

  logAction('Preparing the output directory...', false);
  if (existsSync(outputPath))
    cleanDir(outputPath, {showLog: true});
  if (assetPath) {
    const templateFileName = templatePath && basename(templatePath);
    copy(assetPath, outputPath, {
      showLog: true,
      skipSystemFiles: true,
      allowedToCopyFilter: templateFileName
        ? ({iSrcFileName}) => iSrcFileName !== templateFileName // usually the template is put in the asset dir
        : undefined,
    });
  }

  webpack(getProductionConfig(opt), callbackWebpack);

  logAction('Creating an optimized production build...', false);
}
