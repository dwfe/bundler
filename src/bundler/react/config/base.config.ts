import {stringifiedProcessEnv} from '@do-while-for-each/env';
import {Configuration, DefinePlugin} from 'webpack';
import merge from 'webpack-merge';
import {assetLoader, styleLoaders, svgLoader, tsLoader} from '../../../loader';
import {printConfigOverrideInfo} from '../../../util/cmmn'
import {OVERRIDE_CONFIG} from '../../../util/param'
import {htmlWebpackPlugin} from '../../../plugin';
import {IOptions} from '../../contract';

export const getBaseConfig = ({target, entry, templatePath, svgLoaderType}: IOptions): Configuration => {
  printConfigOverrideInfo();
  return merge({
    target,
    entry,
    resolve: {
      symlinks: false, // https://webpack.js.org/configuration/resolve/#resolvesymlinks
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          oneOf: [
            tsLoader(),
            ...styleLoaders(),
            assetLoader(/\.(png|gif|jpg|jpeg)$/),
            svgLoader(svgLoaderType),
            assetLoader(/\.(woff2|woff|ttf)$/, 'asset/resource')
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
