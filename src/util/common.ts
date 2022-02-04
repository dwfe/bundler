import {copyFileSync, existsSync, lstatSync, mkdirSync, PathLike, readdirSync, rmSync} from 'fs';
import {logErr, logSuccess, logWarn} from '@do-while-for-each/log-node';
import {Stats} from 'webpack';
import {join} from 'path';
import {OVERRIDE_CONFIG, OVERRIDE_CONFIG_FILE} from './params';
import {IRunOptions} from '../bundler/contract';

export const messageRunOptionErr = (optionField: keyof IRunOptions, value: any, expected: any): string =>
  `Incorrect value of the "${optionField}" option field: "${value}". Possible value(s): ${expected}`;

export function logBundlerErr(...message: string[]): void {
  logErr('Bundler:', ...message);
}

/**
 * ['hello', 'world', 123] => '"hello", "world", "123"'
 */
export const arrToStr = (arr: string[]): string => arr.map(x => `"${x}"`).join(', ');


export function onProcessExit(callback: () => void): void {
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      callback();
      process.exit();
    });
  });
}

export function copySync(
  src: string,
  dest: string,
  allowedToCopyFilter?: (srcPath: string) => boolean
): void {
  if (!existsSync(src) || allowedToCopyFilter && !allowedToCopyFilter(src))
    return;
  if (isDirectory(src)) {
    if (!existsSync(dest))
      mkdirSync(dest);
    let files = readdirSync(src);
    if (allowedToCopyFilter)
      files = files.filter(allowedToCopyFilter);
    files.forEach(item => {
      copySync(
        join(src, item),
        join(dest, item),
        allowedToCopyFilter
      );
    });
  } else
    copyFileSync(src, dest);
}

export function cleanDir(dir: PathLike): void {
  if (!existsSync(dir) || !isDirectory(dir))
    return;
  readdirSync(dir)
    .map(item => join(dir as string, item))
    .forEach(file =>
      rmSync(file, {
        recursive: isDirectory(file),
        force: true
      })
    );
}

function isDirectory(file: PathLike): boolean {
  return lstatSync(file).isDirectory();
}


export function callbackWebpack(err?: Error, stats?: Stats): void {
  const message = stats?.toString() || 'none';
  if (err || stats?.hasErrors()) {
    logErr('Bundle error:', err?.toString() || 'none');
    logErr('Webpack stats error:', message);
  } else if (stats?.hasWarnings()) {
    logWarn('Webpack stats warning:', message);
  } else
    logSuccess('', message);
}

export function printConfigOverrideInfo(): void {
  if (OVERRIDE_CONFIG)
    logSuccess('Configuration for override:', OVERRIDE_CONFIG_FILE);
}
