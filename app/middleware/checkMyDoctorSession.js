/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-26 10:14:30
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-13 15:06:20
 */
'use strict';
const response = require('../extend/response');
const JSessionIdUtil = require('../extend/session')

module.exports = () => {

  return async function checkMyDoctorSession(ctx, next) {
    const JSessionIdInfo = await JSessionIdUtil.getDBJSessionInfoByCookiesJSession(ctx)
    const isValidJSession = JSessionIdInfo && JSessionIdInfo.jSessionId
    console.log('checkMyDoctorSession',isValidJSession)
    if (!isValidJSession) {
      response.sendFail(ctx, '没有权限访问或权限已过期')
    } else {
      ctx.state.myDoctorSessionId = isValidJSession
      await next()
    }
  };
};