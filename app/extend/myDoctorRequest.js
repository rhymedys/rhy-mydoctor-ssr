/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-02-13 15:11:41 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-13 15:24:59
 */
"use strict";
const JSessionIdUtil = require('./session')



function requestApi(ctx, params) {
    if (ctx && params) {
        return ctx.curl(
            `https://mp.mhealth100.com/ip-healthmanager-mobile-web/${params.url}`, {
                headers: {
                    Cookie: `JSESSIONID=${JSessionIdUtil.getMyDoctorSessionId(ctx)}`
                },
                dataType: 'json',
                ...params
            }
        )
    }
}

module.exports = {
    requestApi
}