#!/usr/bin/env node

import {ALL_BUNDLERS, IOptions, IRunOptions, TBundler} from './bundler/contract';
import {reactBundler} from './bundler/react/react.bundler';
import {normalizeOptions} from './util/options.normalizer';
import {ARGS, findArg, OPTIONS_MAP} from './util/params';
import {messageRunOptionErr} from './util/common';
import {prepareEnv} from './util/env';

const bundlers: { [key in TBundler]: (opt: IOptions) => void } = {
  react: reactBundler
}

const [arg1] = ARGS;
const runOpt = OPTIONS_MAP[arg1] as IRunOptions;
const bundler = bundlers[runOpt.bundler];
if (!bundler)
  throw new Error(messageRunOptionErr('bundler', runOpt.bundler, ALL_BUNDLERS.map(b => `"${b}"`).join(', ')));

const opt = normalizeOptions(runOpt);

if (findArg('--prod'))
  prepareEnv('production');
else if (findArg('--test'))
  prepareEnv('test');
else
  prepareEnv('development');

bundler(opt);
