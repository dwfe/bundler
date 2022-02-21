import {RuleSetRule} from 'webpack';

type TAsset =
  'asset/resource' | // emits a separate file and exports the URL. Previously achievable by using file-loader
  'asset/inline' |   // exports a data URI of the asset. Previously achievable by using url-loader
  'asset/source' |   // exports the source code of the asset. Previously achievable by using raw-loader
  'asset';           // automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using url-loader with asset size limit.

/**
 * Asset Modules.
 *  https://webpack.js.org/guides/asset-modules/
 */
export function assetLoader(
  test?: RuleSetRule['test'],
  type: TAsset = 'asset',
  {maxSize, filename}: IOptions = {}
): RuleSetRule {
  let rule: RuleSetRule = {
    test,
    type,
  };
  if (maxSize) {
    rule = {
      ...rule,
      parser: {
        dataUrlCondition: {
          maxSize
        }
      }
    };
  }
  if (filename) {
    rule = {
      ...rule,
      generator: {
        filename
      }
    };
  }
  return rule
}

interface IOptions {
  maxSize?: number; // 10 * 1024 ---> 10KiB
  filename?: string;
}
