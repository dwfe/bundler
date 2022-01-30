import {existsSync} from 'fs';
import {join, sep} from 'path';
import {logBundlerErr} from './log';

//region File paths

export const BASE_DIR = process.cwd();
export const SRC_DIR = relativeToBase('src');
export const DIST_DIR = relativeToBase('dist');
export const PKG_FILE = relativeToBase('package.json');
export const DOTENV_FILE = relativeToBase('.env');
export const OVERRIDE_CONFIG_FILE = relativeToBase('webpack.config.js');

//endregion


//region Objects/Modules

export const OPTIONS_MAP_FIELD_NAME = 'dwfeBundlerOptions';

export const PKG = require(PKG_FILE);
export const OPTIONS_MAP = PKG[OPTIONS_MAP_FIELD_NAME];
export const OVERRIDE_CONFIG = existsSync(OVERRIDE_CONFIG_FILE) ? require(OVERRIDE_CONFIG_FILE) : null;

if (!OPTIONS_MAP || !Object.keys(OPTIONS_MAP).length) {
  logBundlerErr(`To run the bundler, specify an object with options in field "${OPTIONS_MAP_FIELD_NAME}" of the file package.json`);
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

export function excludeBase(value: string): string {
  let result = value.replace(BASE_DIR, '');
  if (result[0] === '/' || result[0] === '\\')
    result = result.replace(sep, ''); // without lead platform-specific separator
  return result;
}

export function findArg(value: string): boolean {
  const regexp = new RegExp(value);
  return ARGS.filter(a => regexp.test(a)).length > 0;
}

//endregion
