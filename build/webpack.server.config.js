/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-12-12 21:39:26
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-16 20:45:44
 */
'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(base, {
  mode: process.env.NODE_ENV,
  target: 'node',
  devtool: '#source-map',
  entry: './app/view/mydoctor_ssr/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/,
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
    }),
    new VueSSRServerPlugin(),
  ],
});
