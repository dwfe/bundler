import {Configuration} from 'webpack';

export const ALL_BUNDLERS = ['react'] as const;
type BundlerTuple = typeof ALL_BUNDLERS;
export type TBundler = BundlerTuple[number];

/**
 * Options with which the bundler was launched
 */
export interface IRunOptions {

  bundler: TBundler;

  entryPoint: string;
  outputPath?: string;
  outputFilename?: string;

  assetPath?: string;
  templatePath?: string;

  host?: string;
  port?: number;

  publicPath?: string; // https://webpack.js.org/configuration/output/#outputpublicpath

}


/**
 * Normalized options that the bundler will work with
 */
export interface IOptions {

  entry: Configuration['entry'];
  outputPath: string;
  outputFilename: string;

  assetPath?: string;
  templatePath?: string;

  host: string;
  port: number;

  publicPath: string;

}
