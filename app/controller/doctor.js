/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-01-17 10:00:51 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-17 10:52:44
 */


'use strict'
const egg = require('egg')
const response = require('../extend/response')
const JSessionIdUtil = require('../extend/session')


class Doctor extends egg.Controller {
    async index() {
        const {
            ctx
        } = this




        const JSessionIdInfo =await JSessionIdUtil.getDBJSessionInfoByCookiesJSession(ctx)
        const isValidJSession = JSessionIdInfo && JSessionIdInfo.jSessionId
        if (isValidJSession) {
            await ctx.render('doctorIndex/index.js');
        } else {
            ctx.redirect('127.0.0.1:7001/my-doctor-ssr/login')
        }
    }

    async getDoctorIndex() {
        const {
            ctx
        } = this


        const {
            doctorOpenId
        } = ctx.query

        const JSessionIdInfo = JSessionIdUtil.getDBJSessionInfoByCookiesJSession(ctx)

        const isValidJSession = JSessionIdInfo && JSessionIdInfo.jSessionId

        if (isValidJSession && doctorOpenId) {
            const doctorIndexInfo = await ctx.curl(
                'https://mp.mhealth100.com/ip-healthmanager-mobile-web/doctor/getDoctorIndex', {
                    method: 'POST',
                    dataType: 'json',
                    headers: {
                        Cookie: `JSESSIONID=${JSessionIdInfo.jSessionId}`
                    },
                    data: {
                        doctorOpenId,
                        commentCategory: 'CONSULTEVALUATE',
                        page: 1,
                        pageSize: 10
                    }
                }
            )

            console.log('doctorIndexInfo', doctorIndexInfo)

            const resData = doctorIndexInfo.data

            if (resData.resultCode === 0) {
                response.sendSuccess(ctx, resData)
            } else {
                response.sendFail(ctx, resData.resultDesc, resData.resultCode)
            }

        } else if (!doctorOpenId) {
            response.sendFail(ctx, 'doctorOpenId为空')
        } else {
            ctx.redirect('http://127.0.0.1:7001/my-doctor-ssr/login')
        }
    }
}


module.exports = Doctor