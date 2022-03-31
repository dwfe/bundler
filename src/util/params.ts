import {join, sep} from 'path';
import {existsSync} from 'fs';

//region File paths

export const BASE_DIR: Readonly<string> = process.cwd();
export const SRC_DIR: Readonly<string> = relativeToBase('src');
export const DIST_DIR: Readonly<string> = relativeToBase('dist');
export const PUBLIC_DIR: Readonly<string> = relativeToBase('public');
export const PKG_FILE: Readonly<string> = relativeToBase('package.json');
export const OVERRIDE_CONFIG_FILE: Readonly<string> = relativeToBase('webpack.config.js');
export const OVERRIDE_DEV_SERVER_CONFIG_FILE: Readonly<string> = relativeToBase('webpack-dev-server.config.js');

//endregion


//region Objects/Modules

export const OPTIONS_MAP_FIELD_NAME: Readonly<string> = 'dwfeBundlerOptions';

export const PKG: Readonly<Record<string, any>> = require(PKG_FILE);
export const OPTIONS_MAP: Readonly<Record<string, any>> = PKG[OPTIONS_MAP_FIELD_NAME];
export const OVERRIDE_CONFIG: Readonly<any> = existsSync(OVERRIDE_CONFIG_FILE) ? require(OVERRIDE_CONFIG_FILE) : null;
export const OVERRIDE_DEV_SERVER_CONFIG: Readonly<any> = existsSync(OVERRIDE_DEV_SERVER_CONFIG_FILE) ? require(OVERRIDE_DEV_SERVER_CONFIG_FILE) : null;

//endregion


//region Arguments

const [, , ...args] = process.argv;
export const ARGS: Readonly<string[]> = args;

//endregion


//region Support

export function relativeToBase(...paths: string[]): string {
  return join(BASE_DIR, ...paths)
}

export function excludeBase(value: string): string {
  if (!value)
    return value;
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
