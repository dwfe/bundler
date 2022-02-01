#!/usr/bin/env node

import {ARGS, findArg, OPTIONS_MAP, OPTIONS_MAP_FIELD_NAME} from './util/params';
import {ALL_BUNDLERS, IRunOptions, TPossibleBundlers} from './bundler/contract';
import {normalizeOptions, printOptions} from './util/options';
import {arrToStr, messageRunOptionErr} from './util/common';
import {reactBundler} from './bundler/react/react.bundler';
import {logAction, logBundlerErr} from './util/log';
import {prepareEnv, runModeInfo} from './util/env';

const [arg1] = ARGS;
const runOpt = OPTIONS_MAP[arg1] as IRunOptions;
if (!runOpt) {
  logBundlerErr(`Can't find options for key "${arg1}". Check it in package.json -> field "${OPTIONS_MAP_FIELD_NAME}"`);
  throw '';
}

const opt = normalizeOptions(runOpt);
if (runOpt.printOptions)
  printOptions(opt);

if (findArg('--prod'))
  prepareEnv('production');
else if (findArg('--test'))
  prepareEnv('test');
else
  prepareEnv('development');

const bundlers: TPossibleBundlers = {
  react: reactBundler
};
const bundler = bundlers[runOpt.bundler];
if (!bundler) {
  logBundlerErr(messageRunOptionErr('bundler', runOpt.bundler, arrToStr(ALL_BUNDLERS as unknown as Array<string>)));
  throw '';
}
logAction(`Start bundler "${runOpt.bundler}", ${runModeInfo().NODE_ENV}`, false);
bundler(opt);
