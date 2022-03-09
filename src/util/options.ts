import {logAction, logOption} from '@do-while-for-each/log-node';
import {DIST_DIR, excludeBase, PUBLIC_DIR, relativeToBase} from './params';
import {logBundlerErr, messageRunOptionErr} from './common';
import {IOptions, IRunOptions} from '../bundler/contract';

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
  assetPath = assetPath ? relativeToBase(assetPath) : PUBLIC_DIR;
  templatePath = templatePath ? relativeToBase(templatePath) : '';
  svgLoaderType = svgLoaderType || 'react-component';
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
  const result: [keyof IOptions, string][] = [];

  for (let [option, value] of Object.entries(opt)) {
    switch (option as keyof IOptions) {
      case 'target':
        result.push(['target', value]);
        break;
      case 'entry':
        const value2 = Object
          .entries<string>(value)
          .reduce<{ [key: string]: string }>((acc, [k, v]) => {
            acc[k] = excludeBase(v);
            return acc;
          }, {});
        result.push(['entry', JSON.stringify(value2)]);
        break;
      case 'outputPath':
        result.push(['outputPath', excludeBase(value)]);
        break;
      case 'outputFilename':
        result.push(['outputFilename', valueOrUnset(value)]);
        break;
      case 'assetPath':
        result.push(['assetPath', valueOrUnset(excludeBase(value))]);
        break;
      case 'templatePath':
        result.push(['templatePath', valueOrUnset(excludeBase(value))]);
        break;
      case 'svgLoaderType':
        result.push(['svgLoaderType', value]);
        break;
      case 'host':
        result.push(['host', value]);
        break;
      case 'port':
        result.push(['port', value]);
        break;
      case 'publicPath':
        result.push(['publicPath', value]);
        break;
      default:
        logBundlerErr(`Print unknown option "${option}"`);
        throw '';
    }
  }
  logAction('Bundler options:');
  for (const [option, value] of result)
    logOption(option, value);
  console.log(' ');
}

function valueOrUnset(value: any) {
  return value || '--';
}
