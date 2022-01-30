import {Configuration, DefinePlugin} from 'webpack';
import merge from 'webpack-merge';
import {assetLoader, htmlWebpackPlugin, styleLoaders, tscriptLoader} from '../common';
import {OVERRIDE_CONFIG, OVERRIDE_CONFIG_FILE} from '../../../util/params'
import {stringifiedProcessEnv} from '../../../util/env';
import {logSuccess} from '../../../util/log';
import {IOptions} from '../../contract';

export const getBaseConfig = (opt: IOptions): Configuration => {
  const {entry, templatePath} = opt;
  if (OVERRIDE_CONFIG)
    logSuccess('Configuration for override:', OVERRIDE_CONFIG_FILE);
  return merge({
    target: 'web',
    entry,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          oneOf: [
            tscriptLoader(/\.(tsx|ts|js|jsx)$/),
            ...styleLoaders(),
            assetLoader(/\.(png|gif|jpg|jpeg)$/),
            assetLoader(/\.svg$/, 'asset/source'),
            assetLoader(/\.(woff|woff2|eot|ttf)$/, 'asset/resource')
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin(stringifiedProcessEnv()),
      htmlWebpackPlugin(templatePath)
    ]
  } as Configuration, OVERRIDE_CONFIG || {});
};
