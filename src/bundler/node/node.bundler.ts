import {logAction} from '@do-while-for-each/log-node';
import webpack from 'webpack';
import {callbackWebpack} from '../../util/common';
import {IOptions} from '../contract';
import {getConfig} from './config';

export const nodeBundler = (opt: IOptions): void => {
  webpack(getConfig(opt), callbackWebpack);
  logAction('Creating an optimized production build...', false);
};
