/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-02-13 15:01:35 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-14 15:36:46
 */
'use strict';



module.exports = app => {
  const {
    router,
    controller,
    middleware
  } = app;

  const checkMyDoctorSession = middleware.checkMyDoctorSession()

  router.get('/', controller.login.index)
  router.get('/my-doctor-ssr/login', controller.login.index)
  router.post('/my-doctor-ssr/api/login', controller.login.login)
  router.get('/my-doctor-ssr/api/doctor/getDoctorIndex', checkMyDoctorSession, controller.doctor.getDoctorIndex)
  router.get('/my-doctor-ssr/api/doctor/getDoctorVoiceIndex', checkMyDoctorSession, controller.doctor.getDoctorVoiceIndex)
  router.get('/my-doctor-ssr/api/doctor/getDoctorDetail', checkMyDoctorSession, controller.doctor.getDoctorDetail)
  router.get('/my-doctor-ssr/api/doctor/getDoctorConsltIndex', checkMyDoctorSession, controller.doctor.getDoctorConsltIndex)
  router.get('/my-doctor-ssr/api/doctor/getDoctorConsutComments', checkMyDoctorSession, controller.doctor.getDoctorConsutComments)
  router.get('/my-doctor-ssr/api/phoneConsult/index', checkMyDoctorSession, controller.phoneConsult.index)
  router.get('/my-doctor-ssr/api/product/listDoctorProduct', checkMyDoctorSession, controller.product.listDoctorProduct)
  router.get('/my-doctor-ssr/api/product/recommendProducts', checkMyDoctorSession, controller.product.recommendProducts)
};