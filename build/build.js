/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-12-16 19:31:15
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-16 19:46:19
 */
'use strict';

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const serverConfig = require('./webpack.server.config');
const clientConfig = require('./webpack.client.config');

const spinner = ora('building for production...');
spinner.start();

rm('./app/public/mydoctor_ssr', rmErr => {
  if (rmErr) throw rmErr;

  webpack(clientConfig, (clientErr, clientStats) => {
    spinner.stop();
    if (clientErr) throw clientErr;

    process.stdout.write(clientStats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n');

    if (clientStats.hasErrors()) {
      console.log(chalk.red('  Build client failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build client complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));

    webpack(serverConfig, (serverErr, serverStats) => {
      if (serverErr) throw serverErr;
      process.stdout.write(serverStats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n');

      if (serverStats.hasErrors()) {
        console.log(chalk.red('  Build server failed with errors.\n'));
        process.exit(1);
      }

      console.log(chalk.cyan('  Build server complete.\n'));
    });

  });

});
