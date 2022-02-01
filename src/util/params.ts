import {join, sep} from 'path';
import {existsSync} from 'fs';

//region File paths

export const BASE_DIR = process.cwd();
export const SRC_DIR = relativeToBase('src');
export const DIST_DIR = relativeToBase('dist');
export const DOTENV_FILE = relativeToBase('.env');
export const PKG_FILE = relativeToBase('package.json');
export const OVERRIDE_CONFIG_FILE = relativeToBase('webpack.config.js');

//endregion


//region Objects/Modules

export const OPTIONS_MAP_FIELD_NAME = 'dwfeBundlerOptions';

export const PKG = require(PKG_FILE);
export const OPTIONS_MAP = PKG[OPTIONS_MAP_FIELD_NAME];
export const OVERRIDE_CONFIG = existsSync(OVERRIDE_CONFIG_FILE) ? require(OVERRIDE_CONFIG_FILE) : null;

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
  const unixSeparator = '/';
  const winSeparator = '\\';
  let result = value.replace(BASE_DIR, '');
  if (sep === winSeparator)
    result = result.replaceAll(winSeparator, unixSeparator);
  if (result[0] === unixSeparator)
    result = result.replace(unixSeparator, ''); // without lead separator
  return result;
}

export function findArg(value: string): boolean {
  const regexp = new RegExp(value);
  return ARGS.filter(a => regexp.test(a)).length > 0;
}

//endregion
