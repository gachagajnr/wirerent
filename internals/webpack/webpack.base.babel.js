/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    // noParse: /moment\.js/,
    rules: [
      {
        test: /\.js?$/, // Transform all .js and .jsx files required somewhere with Babel
        // test: /\.less$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: [
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: true,
                },
                'antd',
              ],
              [
                'import',
                {
                  libraryName: '@ant-design/icons',
                  libraryDirectory: 'es/icons', // defaults to 'lib'
                  camel2DashComponentName: false, // defaults to true
                },
                'antdesignicons',
              ],
              [
                'import',
                {
                  libraryName: 'formik-antd',
                  libraryDirectory: 'es', // defaults to 'lib'
                  // camel2DashComponentName: false, // defaults to true
                  style: true,
                },
                'formikantd',
              ],
              [
                'babel-plugin-import',
                {
                  libraryName: '@material-ui/core',
                  // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                  libraryDirectory: 'esm',
                  camel2DashComponentName: false,
                },
                'core',
              ],
              [
                'babel-plugin-import',
                {
                  libraryName: '@material-ui/icons',
                  // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                  libraryDirectory: 'esm',
                  camel2DashComponentName: false,
                },
                'icons',
              ],
            ],
          },
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                  // 'primary-color': '#1DA57A',
                  'link-color': '#1890ff',
                  'border-radius-base': '2px',
                  'border-color-base': '#eee',
                  'layout-header-background': '#4789D2',
                  'layout-header-height': '50px',
                  modifyVars: getThemeVariables({
                    dark: true,
                    compact: true,
                  }),
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },

      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    // alias: {
    //   moment$: 'moment/moment.js',
    // },
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'module', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
