import webpack from 'webpack'
import {callbackWebpack} from '../../util/common'
import {IOptions} from '../contract'
import {getConfig} from './config'
import {logAction} from '@do-while-for-each/log-node'

export function reactLibBundler(opt: IOptions): void {
  webpack(getConfig(opt), callbackWebpack);
  logAction('Building the library...', false);
}
