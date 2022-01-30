#!/usr/bin/env node

import {ALL_BUNDLERS, IOptions, IRunOptions, TBundler} from './bundler/contract';
import {ARGS, findArg, RUN_OPTIONS_ARRAY} from '@util/params';
import {reactBundler} from './bundler/react/react.bundler';
import {normalizeOptions} from '@util/options.normalizer';
import {prepareEnv} from '@util/env';

const bundlers: { [key in TBundler]: (opt: IOptions) => void } = {
  react: reactBundler
}

const [arg1] = ARGS;
const runOptions = RUN_OPTIONS_ARRAY[arg1] as IRunOptions;
const bundler = bundlers[runOptions.bundler];
if (!bundler)
  throw new Error(`Incorrect bundler "${runOptions.bundler}". Possible values: ${ALL_BUNDLERS.map(b => `"${b}"`).join(', ')}`);

const opt = normalizeOptions(runOptions);

if (findArg('--prod'))
  prepareEnv('production');
else if (findArg('--test'))
  prepareEnv('test');
else
  prepareEnv('development');

bundler(opt);
