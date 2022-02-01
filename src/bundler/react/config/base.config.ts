import {Configuration, DefinePlugin} from 'webpack';
import merge from 'webpack-merge';
import {assetLoader, htmlWebpackPlugin, styleLoaders, svgLoader, tscriptLoader} from '../../../lp';
import {printConfigOverrideInfo} from '../../../util/common'
import {stringifiedProcessEnv} from '../../../util/env';
import {OVERRIDE_CONFIG} from '../../../util/params'
import {IOptions} from '../../contract';

export const getBaseConfig = ({entry, templatePath, svgLoaderType}: IOptions): Configuration => {
  printConfigOverrideInfo();
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
            svgLoader(svgLoaderType),
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
