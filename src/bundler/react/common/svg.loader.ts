import {RuleSetRule} from 'webpack';

/**
 * How to use SVGs in React
 *  https://blog.logrocket.com/how-to-use-svgs-in-react/
 */
export const svgLoader = (): RuleSetRule => ({
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
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
});
