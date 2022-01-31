import {Configuration} from 'webpack';

export const ALL_BUNDLERS = ['react'];
type BundlerTuple = typeof ALL_BUNDLERS;
export type TBundler = BundlerTuple[number];

export const ALL_SVG_LOADERS = ['react-component', 'raw'];
type SvgLoaderTuple = typeof ALL_SVG_LOADERS;
export type TSvgLoader = SvgLoaderTuple[number];

export type TPossibleBundlers = { [key in TBundler]: (opt: IOptions) => void };

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

  svgLoaderType?: TSvgLoader;

  host?: string;
  port?: number;

  publicPath?: string; // https://webpack.js.org/configuration/output/#outputpublicpath

  printOptions?: boolean;

}


/**
 * Normalized options that the bundler will work with
 */
export interface IOptions {

  entry: Configuration['entry']; // https://webpack.js.org/configuration/entry-context/#entry
  outputPath: string;
  outputFilename: string;

  assetPath: string;
  templatePath: string;

  svgLoaderType: TSvgLoader;

  host: string;
  port: number;

  publicPath: string;

}
