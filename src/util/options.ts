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
    bundler,
    entryPoint, outputPath, outputFilename,
    assetPath, templatePath,
    svgLoaderType,
    host, port, publicPath
  }: IRunOptions
): IOptions => {

  let target: IOptions['target'] = 'web';
  if (bundler === 'node')
    target = 'node';

  if (!entryPoint) {
    logBundlerErr(messageRunOptionErr('entryPoint', entryPoint, 'non empty string'));
    throw '';
  }
  entryPoint = relativeToBase(entryPoint);
  let entry: IOptions['entry'] = {index: entryPoint};
  if (bundler === 'react')
    entry = {main: entryPoint};

  outputPath = outputPath ? relativeToBase(outputPath) : DIST_DIR;
  outputFilename = outputFilename || '';
  assetPath = assetPath ? relativeToBase(assetPath) : '';
  templatePath = templatePath ? relativeToBase(templatePath) : '';
  svgLoaderType = svgLoaderType || 'raw';
  host = host || 'localhost';
  port = port || 3000;
  publicPath = publicPath || '/';

  return {
    target,
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
      case 'target':
        result[1] = ['target', value];
        break;
      case 'entry':
        const value2 = Object
          .entries<string>(value)
          .reduce<{ [key in string]: string }>((acc, [k, v]) => {
            acc[k] = excludeBase(v);
            return acc;
          }, {});
        result[2] = ['entry', JSON.stringify(value2)];
        break;
      case 'outputPath':
        result[3] = ['outputPath', excludeBase(value)];
        break;
      case 'outputFilename':
        result[4] = ['outputFilename', orUnset(value)];
        break;
      case 'assetPath':
        value = value || 'unset';
        result[5] = ['assetPath', orUnset(excludeBase(value))];
        break;
      case 'templatePath':
        value = value || 'unset';
        result[6] = ['templatePath', orUnset(excludeBase(value))];
        break;
      case 'svgLoaderType':
        result[7] = ['svgLoaderType', value];
        break;
      case 'host':
        result[8] = ['host', value];
        break;
      case 'port':
        result[9] = ['port', value];
        break;
      case 'publicPath':
        result[10] = ['publicPath', value];
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

function orUnset(value: any) {
  return value || '--';
}
