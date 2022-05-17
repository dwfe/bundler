import {RuleSetRule} from 'webpack';
import {arrToStr, logBundlerErr, messageRunOptionErr} from '../util/common';
import {ALL_SVG_LOADERS, TSvgLoader} from '../bundler/contract';
import {assetLoader} from './asset.loader';

const svgRegex = /\.svg$/;

/**
 * How to use SVGs in React
 *  https://blog.logrocket.com/how-to-use-svgs-in-react/
 *  https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component#answer-42296853
 *
 *
 *  -rawFileContent
 *    For example:
 *      import fileContent from './location-pin.svg'
 *      const div = document.createElement('div') as HTMLDivElement;
 *      div.innerHTML = fileContent;
 *
 *  -fileURL
 *    For example:
 *      import fileURL from './location-pin.svg'
 *      1) <img src={fileURL}/>  ->  <img src="http://.../some.svg"/>
 *      2) <svg>
 *           <use xlinkHref={`${fileURL}#mySymbolId`}/>
 *         </svg>
 *
 *  -dataURL
 *    For example:
 *      import dataURL from './location-pin.svg'
 *      <img src={dataURL}/>  ->  <img src="data:image/svg+xml;base64,PD94bWw ...=="/>
 *
 *  -svgr
 *    Package "@svgr/webpack" is used.
 *    But what's the point if you can directly create a react component?
 *    For example:
 *      function LocationPinSvg(props: IProps) {
 *        const {width = 150, height = 150} = props
 *        return (<svg version="1.1" ... </svg>);
 *
 *
 */
export const svgLoader = (type: TSvgLoader): RuleSetRule => {
  switch (type) {
    case 'rawFileContent':
      return assetLoader(svgRegex, 'asset/source');
    case 'fileURL':
      return assetLoader(svgRegex, 'asset/resource');
    case 'dataURL':
      return assetLoader(svgRegex, 'asset/inline');
    case 'svgr':
      return svgrLoader();
    default:
      logBundlerErr(messageRunOptionErr('svgLoaderType', type, arrToStr(ALL_SVG_LOADERS as unknown as Array<string>)));
      throw '';
  }
};

function svgrLoader(): RuleSetRule {
  const svgrPackageId = '@svgr/webpack';
  try {
    require(svgrPackageId)
  } catch (err) {
    logBundlerErr('You need to install the "@svgr/webpack" version 6.x.x package');
    process.exit(1);
  }
  return {
    test: svgRegex,
    use: [
      {
        loader: svgrPackageId,
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{removeViewBox: false}]
          },
          titleProp: true,
          ref: true
        }
      }
      // {
      //   loader: 'file-loader',
      //   options: {
      //     name: 'static/media/[name].[hash].[ext]',
      //   },
      // },
    ],
    issuer: {
      and: [/\.(tsx|ts|js|jsx)$/]
    }
  }
}
