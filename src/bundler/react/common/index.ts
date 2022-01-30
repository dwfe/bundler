import {htmlWebpackPlugin} from './html-webpack.plugin';
import {styleLoaders} from './style/style.loaders';
import {tscriptLoader} from './tscript.loader';
import {assetLoader} from './asset.loader';
import {svgLoader} from './svg.loader';

export {
  tscriptLoader,
  styleLoaders,
  assetLoader,
  svgLoader,

  htmlWebpackPlugin
};
