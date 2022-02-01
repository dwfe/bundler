import {Configuration, DefinePlugin} from 'webpack'
import merge from 'webpack-merge';
import {printConfigOverrideInfo} from '../../util/common';
import {stringifiedProcessEnv} from '../../util/env';
import {OVERRIDE_CONFIG} from '../../util/params';
import {tsLoader} from '../../loader';
import {IOptions} from '../contract';

export const getConfig = ({target, entry, outputPath}: IOptions): Configuration => {
  printConfigOverrideInfo();
  return merge({
    target,
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
            tsLoader(),
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin(stringifiedProcessEnv()),
    ],
  } as Configuration, OVERRIDE_CONFIG || {});
};
