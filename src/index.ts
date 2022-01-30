#!/usr/bin/env node

import {ALL_BUNDLERS, IRunOptions, TBundler} from './bundler/contract';
import {normalizeOptions} from '@util/options.normalizer';
import {reactBundler} from './bundler/react/react.bundler';
import {ARGS, RUN_OPTIONS_ARRAY} from '@util/params';

const bundlers: { [key in TBundler]: any } = {
  react: reactBundler
}

const [arg1] = ARGS;

const runOptions = RUN_OPTIONS_ARRAY[arg1] as IRunOptions;
const bundler = bundlers[runOptions.bundler];
if (!bundler)
  throw new Error(`Incorrect bundler "${runOptions.bundler}". Possible values: ${ALL_BUNDLERS.map(b => `"${b}"`).join(', ')}`);
const opt = normalizeOptions(runOptions);
bundler(opt);


