import { Configuration, DefinePlugin } from 'webpack';
import { assetLoader, htmlWebpackPlugin, styleLoaders, tscriptLoader } from '../common';
import {stringifiedProcessEnv} from '@util/env';
import {IOptions} from '../../contract';

export const getBaseConfig = (opt: IOptions): Configuration=> {
  const {entry, templatePath} = opt;
  return {
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
            assetLoader(/\.(woff|woff2|eot|ttf)$/, "asset/resource")
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin(stringifiedProcessEnv()),
      htmlWebpackPlugin(templatePath)
    ]
  } as Configuration;
};
