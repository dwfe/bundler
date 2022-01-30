import {IOptions, IRunOptions} from '../bundler/contract';
import {DIST_DIR, relativeToBase} from './params';
import {messageRunOptionErr} from './common';
import {logBundlerErr} from './log';

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
