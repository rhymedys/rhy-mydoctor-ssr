/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-11-21 22:22:40 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-11-21 22:23:58
 */

'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542810037172_9203';

  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/mydoctor_ssr',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  // add your config here
  config.middleware = [];

  return config;
};
