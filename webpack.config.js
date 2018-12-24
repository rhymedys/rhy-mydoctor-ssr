'use strict';
// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue 
module.exports = {
  plugins: {
    imagemini: false
  },
  loaders:{
    less: true,
  },
  compile:{
    thread: true, // 多进程编译
    cache: true   // 启动编译缓存
  },
  dll:['vue','vuex','vue-router']
};