#!/usr/bin/env node

import {prepareEnv, runModeInfo} from '@do-while-for-each/env';
import {logAction} from '@do-while-for-each/log-node';
import {ARGS, findArg, OPTIONS_MAP, OPTIONS_MAP_FIELD_NAME} from './util/params';
import {ALL_BUNDLERS, IRunOptions, TPossibleBundlers} from './bundler/contract';
import {arrToStr, logBundlerErr, messageRunOptionErr} from './util/common';
import {normalizeOptions, printOptions} from './util/options';
import {nodeBundler, reactBundler} from './bundler';

if (!OPTIONS_MAP || !Object.keys(OPTIONS_MAP).length) {
  logBundlerErr(`To run the bundler, specify an object with options in package.json -> field "${OPTIONS_MAP_FIELD_NAME}"`);
  throw '';
}

const [arg1] = ARGS;
const runOpt = OPTIONS_MAP[arg1] as IRunOptions;
if (!runOpt) {
  logBundlerErr(`Can't find options for key "${arg1}". Check it in package.json -> field "${OPTIONS_MAP_FIELD_NAME}"`);
  throw '';
}

if (findArg('--prod'))
  prepareEnv('production');
else if (findArg('--test'))
  prepareEnv('test');
else
  prepareEnv('development');

const opt = normalizeOptions(runOpt);
if (runOpt.printOptions)
  printOptions(opt);

const bundlers: TPossibleBundlers = {
  'react': reactBundler,
  'node': nodeBundler,
};
const bundler = bundlers[runOpt.bundler];
if (!bundler) {
  logBundlerErr(messageRunOptionErr('bundler', runOpt.bundler, arrToStr(ALL_BUNDLERS as unknown as Array<string>)));
  throw '';
}
logAction(`Start bundler "${runOpt.bundler}", ${runModeInfo().NODE_ENV}`, false);
bundler(opt);
