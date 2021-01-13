module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        // '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        [
          'import',
          {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
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
            style: 'css',
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
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
