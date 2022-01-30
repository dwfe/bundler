import {IOptions, IRunOptions} from '../bundler/contract';
import {DIST_DIR, relativeToBase} from '@util/params';
import {optionErrMessage} from '@util/common';

/**
 * We must ensure that:
 *  - all required fields passed;
 *  - all paths are aligned relative to the base directory;
 *  - if there is no parameter value, its default value is used.
 */
export const normalizeOptions = (runOptions: IRunOptions): IOptions => {
  const {entryPoint, outputPath, outputFilename, assetPath, templatePath, host, port, publicPath} = runOptions;

  if (!entryPoint)
    throw new Error(optionErrMessage('entryPoint', entryPoint, 'non empty string'));
  const entry = {
    main: relativeToBase(entryPoint)
  }

  return {
    entry,
    outputPath: outputPath ? relativeToBase(outputPath) : DIST_DIR,
    outputFilename: outputFilename || 'index.js',

    assetPath: assetPath ? relativeToBase(assetPath) : undefined,
    templatePath: templatePath ? relativeToBase(templatePath) : undefined,

    host: host || 'localhost',
    port: port || 3000,

    publicPath: publicPath || '/'
  }
}
