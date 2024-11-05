const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  'react-native-gesture-handler',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(js|ts|tsx)$/,
  exclude: /node_modules/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native'),
    path.resolve(__dirname, 'node_modules/@react-native'),
    path.resolve(__dirname, 'node_modules/@react-navigation'),
    path.resolve(__dirname, 'index.web.js'), // Entry to your web application
    path.resolve(__dirname, 'App.tsx'), // App.web.tsx or App.tsx
    ...compileNodeModules,
    path.resolve(
      __dirname,
      // Important!
      'node_modules/@react-native/assets-registry/registry',
    ),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-web'],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/i,
  issuer: /\.[jt]sx?$/,
  use: [
    {loader: '@svgr/webpack', options: {typescript: true, dimensions: false}},
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
      },
    },
  ],
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web', // Aliases react-native to react-native-web for web compatibility
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      cssLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __DEV__: JSON.stringify(true),
    }),
  ],
  devServer: {
    historyApiFallback: true, // This is the key to handle client-side routing
  },
};
