/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-02-13 15:42:41 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-13 15:45:39
 */


'use strict'
const egg = require('egg')
const response = require('../extend/response')
const JSessionIdUtil = require('../extend/session')
const myDoctorRequest = require('../extend/myDoctorRequest')


class PhoneConsult extends egg.Controller {
    async index() {
        const {
            ctx
        } = this


        const {
            doctorOpenId,
        } = ctx.query


        if (doctorOpenId) {
            const res = await myDoctorRequest.requestApi(ctx, {
                url: 'phoneConsult/index',
                method: 'POST',
                data: ctx.query
            })

            const resData = res.data || {}

            if (resData.resultCode === 0) {
                response.sendSuccess(ctx, resData)
            } else {
                response.sendFail(ctx, resData.resultDesc, resData.resultCode)
            }

        } else if (!doctorOpenId) {
            response.sendFail(ctx, 'doctorOpenId为空')
        }
    }
}


module.exports = PhoneConsult