import {copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync} from 'fs';
import {join} from 'path';
import {IOptions, IRunOptions} from '../bundler/contract';
import {logAction, logBundlerErr, logOption} from './log'

export const messageRunOptionErr = (optionField: keyof IRunOptions, value: any, expected: any): string =>
  `Incorrect "${optionField}" option field value: "${value}". Possible value(s): ${expected}`;

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

export function cleanDir(dir: string): void {
  if (!existsSync(dir) || !isDirectory(dir))
    return;
  readdirSync(dir)
    .map(item => join(dir, item))
    .forEach(file =>
      rmSync(file, {
        recursive: isDirectory(file),
        force: true
      })
    );
}

function isDirectory(file: string): boolean {
  return lstatSync(file).isDirectory();
}


export function printOptions(opt: IOptions): void {
  const result: { [key: number]: [keyof IOptions, string] } = {};

  for (const [option, value] of Object.entries(opt)) {
    switch (option as keyof IOptions) {
      case 'entry':
        result[1] = ['entry', JSON.stringify(value)];
        break;
      case 'outputPath':
        result[2] = ['outputPath', value];
        break;
      case 'outputFilename':
        result[3] = ['outputFilename', value];
        break;
      case 'assetPath':
        result[4] = ['assetPath', value];
        break;
      case 'templatePath':
        result[5] = ['templatePath', value];
        break;
      case 'svgLoaderType':
        result[6] = ['svgLoaderType', value];
        break;
      case 'host':
        result[7] = ['host', value];
        break;
      case 'port':
        result[8] = ['port', value];
        break;
      case 'publicPath':
        result[9] = ['publicPath', value];
        break;
      default:
        logBundlerErr(`Print unknown option "${option}"`);
        throw '';
    }
  }
  logAction('Bundler run options:');
  for (const [, [option, value]] of Object.entries(result))
    logOption(option, value);
  console.log(' ');
}
