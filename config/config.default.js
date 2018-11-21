/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-11-21 22:22:40 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-11-21 22:30:49
 */

'use strict';

const path = require('path');


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


  config.security = {
    csrf: {
      useSession: false, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      enable: false,
    },
  };

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.ejs': 'ejs',
    },
  };

  // add your config here
  config.middleware = [];

  return config;
};