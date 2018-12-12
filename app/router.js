/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-11-21 22:22:30
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-12 21:43:59
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
