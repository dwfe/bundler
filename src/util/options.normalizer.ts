import {DIST_DIR, excludeBase, relativeToBase} from './params';
import {IOptions, IRunOptions} from '../bundler/contract';
import {logAction, logBundlerErr, logOption} from './log';
import {messageRunOptionErr} from './common';

/**
 * We must ensure that:
 *  - all required fields passed;
 *  - all paths are aligned relative to the base directory;
 *  - if there is no parameter value, its default value is used.
 */
export const normalizeOptions = (
  {
    entryPoint, outputPath, outputFilename,
    assetPath, templatePath,
    svgLoaderType,
    host, port, publicPath
  }: IRunOptions
): IOptions => {

  if (!entryPoint) {
    logBundlerErr(messageRunOptionErr('entryPoint', entryPoint, 'non empty string'));
    throw '';
  }
  outputPath = outputPath ? relativeToBase(outputPath) : DIST_DIR;
  outputFilename = outputFilename || 'index.js';
  assetPath = assetPath ? relativeToBase(assetPath) : '';
  templatePath = templatePath ? relativeToBase(templatePath) : '';
  svgLoaderType = svgLoaderType || 'raw';
  host = host || 'localhost';
  port = port || 3000;
  publicPath = publicPath || '/';

  const entry = {
    main: relativeToBase(entryPoint)
  }

  return {
    entry,
    outputPath,
    outputFilename,
    assetPath,
    templatePath,
    svgLoaderType,
    host,
    port,
    publicPath
  }
}

export function printOptions(opt: IOptions): void {
  const result: { [key: number]: [keyof IOptions, string] } = {};

  for (let [option, value] of Object.entries(opt)) {
    switch (option as keyof IOptions) {
      case 'entry':
        const value2 = Object
          .entries<string>(value)
          .reduce<{ [key in string]: string }>((acc, [k, v]) => {
            acc[k] = excludeBase(v);
            return acc;
          }, {});
        result[1] = ['entry', JSON.stringify(value2)];
        break;
      case 'outputPath':
        result[2] = ['outputPath', excludeBase(value)];
        break;
      case 'outputFilename':
        result[3] = ['outputFilename', value];
        break;
      case 'assetPath':
        value = value || 'unset';
        result[4] = ['assetPath', excludeBase(value)];
        break;
      case 'templatePath':
        value = value || 'unset';
        result[5] = ['templatePath', excludeBase(value)];
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
  logAction('Bundler options:');
  for (const [, [option, value]] of Object.entries(result))
    logOption(option, value);
  console.log(' ');
}
