import {Configuration, DefinePlugin} from 'webpack'
import merge from 'webpack-merge';
import {printConfigOverrideInfo} from '../../util/common';
import {stringifiedProcessEnv} from '../../util/env';
import {OVERRIDE_CONFIG} from '../../util/params';
import {tscriptLoader} from '../../lp';
import {IOptions} from '../contract';

export const getConfig = ({entry, outputPath}: IOptions): Configuration => {
  printConfigOverrideInfo();
  // @ts-ignore
  return merge({
    target: 'node',
    mode: 'production',
    bail: true,
    entry,
    output: {
      path: outputPath,
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          oneOf: [
            tscriptLoader(/\.(tsx|ts|js|jsx)$/),
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin(stringifiedProcessEnv()),
    ],
    optimization: {
      minimizer: [],
      splitChunks: {
        chunks: 'all'
      }
    },
  } as Configuration, OVERRIDE_CONFIG || {});
};
