/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-12-12 21:31:47
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-16 20:23:47
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  VueLoaderPlugin,
} = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ?
    false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../app/public/mydoctor_ssr'),
    publicPath: '/public/mydoctor_ssr/',
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
      }),
    ],
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          preserveWhitespace: false,
        },
      },
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]',
      },
    },

    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false,
  },
  plugins: isProd ? [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ] : [
    new VueLoaderPlugin(),
    new FriendlyErrorsPlugin(),
  ],
};
