/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-01-17 10:00:51 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-27 22:29:35
 */


'use strict'
const egg = require('egg')
const response = require('../extend/response')
const JSessionIdUtil = require('../extend/session')
const myDoctorRequest = require('../extend/myDoctorRequest')


class Doctor extends egg.Controller {
    async getDoctorIndex() {
        const {
            ctx
        } = this


        const {
            doctorOpenId
        } = ctx.query

        if (doctorOpenId) {
            const doctorIndexInfo = await myDoctorRequest.requestApi(ctx, {
                url: 'doctor/getDoctorIndex',
                method: 'POST',
                data: ctx.query
            })

            const resData = doctorIndexInfo.data

            if (resData.resultCode === 0) {
                response.sendSuccess(ctx, resData)
            } else {
                response.sendFail(ctx, resData.resultDesc, resData.resultCode)
            }

        } else if (!doctorOpenId) {
            response.sendFail(ctx, 'doctorOpenId为空')
        }
    }

    async getDoctorVoiceIndex() {
        const {
            ctx
        } = this


        const {
            doctorOpenId
        } = ctx.query

        if (doctorOpenId) {
            const res = await myDoctorRequest.requestApi(ctx, {
                url: 'doctor/getDoctorVoiceIndex',
                data: ctx.query
            })

            const resData = res.data || {resultCode:410001}

            if (resData.resultCode === 0) {
                response.sendSuccess(ctx, resData)
            } else {
                response.sendFail(ctx, resData.resultDesc, resData.resultCode)
            }

        } else if (!doctorOpenId) {
            response.sendFail(ctx, 'doctorOpenId为空')
        }
    }

    async getDoctorDetail() {
        const {
            ctx
        } = this


        const {
            doctorOpenId
        } = ctx.query

        if (doctorOpenId) {
            const res = await myDoctorRequest.requestApi(ctx, {
                url: 'doctor/getDoctorDetail',
                method: 'POST',
                data: ctx.query
            })

            const resData = res.data || {resultCode:410001}

            if (resData.resultCode === 0) {
                response.sendSuccess(ctx, resData)
            } else {
                response.sendFail(ctx, resData.resultDesc, resData.resultCode)
            }

        } else if (!doctorOpenId) {
            response.sendFail(ctx, 'doctorOpenId为空')
        }
    }

    async getDoctorConsltIndex() {
        const {
            ctx
        } = this


        const {
            doctorOpenId
        } = ctx.query

        if (doctorOpenId) {
            const res = await myDoctorRequest.requestApi(ctx, {
                url: 'doctor/getDoctorConsltIndex',
                method: 'POST',
                data: ctx.query
            })

            const resData = res.data || {resultCode:410001}

            if (resData.resultCode === 0) {
                response.sendSuccess(ctx, resData)
            } else {
                response.sendFail(ctx, resData.resultDesc, resData.resultCode)
            }

        } else if (!doctorOpenId) {
            response.sendFail(ctx, 'doctorOpenId为空')
        }
    }

    async getDoctorConsutComments() {
        const {
            ctx
        } = this


        const {
            doctorOpenId
        } = ctx.query

        if (doctorOpenId) {
            const res = await myDoctorRequest.requestApi(ctx, {
                url: 'doctor/getDoctorConsutComments',
                method: 'POST',
                data: ctx.query
            })

            const resData = res.data || {resultCode:410001}

            if (resData.resultCode === 0) {
                response.sendSuccess(ctx, resData)
            } else {
                response.sendFail(ctx, resData.resultDesc, resData.resultCode)
            }

        } else if (!doctorOpenId) {
            response.sendFail(ctx, 'doctorOpenId为空')
        }
    }

    async getDoctorComments(){
        const {
            ctx
        } = this


        const {
            doctorOpenId
        } = ctx.query

        if (doctorOpenId) {
            const res = await myDoctorRequest.requestApi(ctx, {
                url: 'doctor/getDoctorComments',
                method: 'POST',
                data: ctx.query
            })

            const resData = res.data || {resultCode:410001} || {}

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


module.exports = Doctor