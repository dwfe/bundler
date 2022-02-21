import {stringifiedProcessEnv} from '@do-while-for-each/env';
import {Configuration, DefinePlugin} from 'webpack';
import merge from 'webpack-merge';
import {printConfigOverrideInfo} from '../../util/common';
import {assetLoader, tsLoader} from '../../loader';
import {OVERRIDE_CONFIG} from '../../util/params';
import {IOptions} from '../contract';

export const getConfig = ({target, entry, outputPath, publicPath}: IOptions): Configuration => {
  printConfigOverrideInfo();
  return merge({
    mode: 'development',
    devtool: 'cheap-module-source-map',
    bail: true,
    target,
    entry,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
      path: outputPath,
      filename: '[name].[ext]',
      publicPath
    },
    module: {
      rules: [
        {
          oneOf: [
            tsLoader(),
            assetLoader(/\.(css)$/, 'asset/resource'),
            assetLoader(/\.(png|gif|jpg|jpeg)$/),
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin(stringifiedProcessEnv()),
    ]
  } as Configuration, OVERRIDE_CONFIG || {});
}
