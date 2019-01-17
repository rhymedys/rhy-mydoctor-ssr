'use strict';
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.login.login.index)
  router.get('/my-doctor-ssr/login', controller.login.login.index)
  router.post('/my-doctor-ssr/api/login', controller.login.login.login)

  router.get('/my-doctor-ssr/doctor/index', controller.doctor.index)
  router.get('/my-doctor-ssr/doctor/getDoctorIndex', controller.doctor.getDoctorIndex)
};