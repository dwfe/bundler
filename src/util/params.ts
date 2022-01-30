import {existsSync} from 'fs';
import {join} from 'path';
import {logErr} from './log';

//region File paths

export const BASE_DIR = process.cwd();
export const SRC_DIR = relativeToBase('src');
export const DIST_DIR = relativeToBase('dist');
export const PKG_FILE = relativeToBase('package.json');
export const DOTENV_FILE = relativeToBase('.env');
export const OVERRIDE_CONFIG_FILE = relativeToBase('webpack.config.js');

//endregion


//region Objects/Modules

const optionsMapFieldName = 'dwfeBundlerOptions';

export const PKG = require(PKG_FILE);
export const OPTIONS_MAP = PKG[optionsMapFieldName];
export const OVERRIDE_CONFIG = existsSync(OVERRIDE_CONFIG_FILE) ? require(OVERRIDE_CONFIG_FILE) : null;

if (!OPTIONS_MAP || !Object.keys(OPTIONS_MAP).length) {
  logErr('Bundler:', `To run the bundler, specify an object with options in field "${optionsMapFieldName}" of the file package.json`);
  throw '';
}

//endregion


//region Arguments

const [, , ...args] = process.argv;
export const ARGS = args;

//endregion


//region Support

export function relativeToBase(...paths: string[]): string {
  return join(BASE_DIR, ...paths)
}

export function findArg(value: string): boolean {
  const regexp = new RegExp(value);
  return ARGS.filter(a => regexp.test(a)).length > 0;
}

//endregion
