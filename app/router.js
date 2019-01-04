'use strict';
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.login.login.index)
  router.get('/my-doctor-ssr/login', controller.login.login.index)
};