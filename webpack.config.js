'use strict';
// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue 

const path = require('path');

const staticDist = path.resolve(__dirname, 'public')

module.exports = {
  plugins: {
    imagemini: false
  },
  loaders: {
    less: true,
  },
  compile: {
    thread: true, // 多进程编译
    cache: true // 启动编译缓存
  },
  output: {
    publicPath: '/rhymedys_home/public/'
  },
  dll: [{
    name: 'vendor',
    lib: ['vue', 'vuex', 'vue-router'],
    path: staticDist,
    include: [],
    exclue: []
  }],
};