import {join} from 'path';

//region File paths

export const BASE_DIR = process.cwd();
export const SRC_DIR = relativeToBase('src');
export const DIST_DIR = relativeToBase('dist');
export const PKG_FILE = relativeToBase('package.json');
export const DOTENV_FILE = relativeToBase('.env');

//endregion


//region Objects

export const PKG = require(PKG_FILE);
export const POSSIBLE_OPTIONS = PKG.dwfeBundlerOptions;

//endregion


//region Arguments

const [, , ...args] = process.argv;
export const ARGS = args;

//endregion


//region Support

export function relativeToBase(...paths: string[]) {
  return join(BASE_DIR, ...paths)
}

export function findArg(value: string): boolean {
  const regexp = new RegExp(value);
  return ARGS.filter(a => regexp.test(a)).length > 0;
}

//endregion
