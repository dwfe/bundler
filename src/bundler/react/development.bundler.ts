import {logAction} from '@do-while-for-each/log-node';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import {getDevServerConfig} from './config/dev.server.config';
import {getDevelopmentConfig} from './config/config';
import {onProcessExit} from '../../util/cmmn';
import {IOptions} from '../contract';

export function developmentReactBundler(opt: IOptions): void {

  const compiler = webpack(getDevelopmentConfig(opt));
  const devServer = new WebpackDevServer(getDevServerConfig(opt), compiler);

  onProcessExit(() => devServer.close());

  devServer.startCallback(() => {
    logAction('Development server is running.');
    logAction('Starting webpack compilation...', false);
  });

}
