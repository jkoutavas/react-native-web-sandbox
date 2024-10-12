const path = require('path');
const webpack = require('webpack');

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  entry: './index.web.js', // Entry point for the web build
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for the web build
    filename: 'bundle.js', // The bundled output file
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web', // Aliases react-native to react-native-web for web compatibility
    },
    extensions: ['.web.js', '.js', '.json', '.ts', '.tsx'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/, // Matches JavaScript, TypeScript, and TSX files
        exclude: /node_modules/, // Exclude node_modules from being processed by Babel
        use: {
          loader: 'babel-loader', // Use babel-loader for transpiling
          options: {
            configFile: path.resolve(__dirname, 'babel.config.js'), // Use the Babel configuration file explicitly
          },
        },
      },
      imageLoaderConfiguration,
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true), // Sets __DEV__ for development mode
    }),
  ],
  devServer: {
    historyApiFallback: true, // This is the key to handle client-side routing
  },
};
