#!/usr/bin/env node

import {ARGS, findArg, OPTIONS_MAP, OPTIONS_MAP_FIELD_NAME} from './util/params';
import {ALL_BUNDLERS, IRunOptions, TPossibleBundlers} from './bundler/contract';
import {arrToStr, messageRunOptionErr, printOptions} from './util/common';
import {reactBundler} from './bundler/react/react.bundler';
import {normalizeOptions} from './util/options.normalizer';
import {logBundlerErr} from './util/log';
import {prepareEnv} from './util/env';

const bundlers: TPossibleBundlers = {
  react: reactBundler
}

const [arg1] = ARGS;
const runOpt = OPTIONS_MAP[arg1] as IRunOptions;
if (!runOpt) {
  logBundlerErr(`Can't find options for key "${arg1}". Check it in package.json -> field "${OPTIONS_MAP_FIELD_NAME}"`);
  throw '';
}

const bundler = bundlers[runOpt.bundler];
if (!bundler) {
  logBundlerErr(messageRunOptionErr('bundler', runOpt.bundler, arrToStr(ALL_BUNDLERS)));
  throw '';
}

const opt = normalizeOptions(runOpt);
printOptions(opt);

if (findArg('--prod'))
  prepareEnv('production');
else if (findArg('--test'))
  prepareEnv('test');
else
  prepareEnv('development');

bundler(opt);
