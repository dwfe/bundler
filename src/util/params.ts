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
export const RUN_OPTIONS_ARRAY = PKG.bundlerRunOptions;

//endregion


//region Arguments

const [, , ...args] = process.argv;
export const ARGS = args;
export const isProduction = args.filter(a => /--prod/.test(a)).length > 0;

//endregion


//region Support

export function relativeToBase(...paths: string[]) {
  return join(BASE_DIR, ...paths)
}

//endregion
