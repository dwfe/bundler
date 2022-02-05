import {cleanDir, copySync} from '@do-while-for-each/fs';
import {logAction} from '@do-while-for-each/log-node';
import {basename} from 'path';
import webpack from 'webpack';
import {getProductionConfig} from './config/config';
import {callbackWebpack} from '../../util/common';
import {IOptions} from '../contract';

export function runProductionBundler(opt: IOptions): void {
  const {outputPath, assetPath, templatePath} = opt;

  logAction('Preparing the output directory...', false);
  cleanDir(outputPath);
  if (assetPath) {
    const templateFileName = templatePath && basename(templatePath);
    const allowedToCopyFilter = templateFileName
      ? (srcFileName: string) => srcFileName !== templateFileName // usually the template is put in the asset dir
      : undefined;
    copySync(assetPath, outputPath, allowedToCopyFilter);
  }

  webpack(getProductionConfig(opt), callbackWebpack);

  logAction('Creating an optimized production build...', false);
}
