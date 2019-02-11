/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 20:06:55 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-11 18:48:09
 */

'use strict'
const cryptoJS = require("crypto-js");
const egg = require('egg')
const response = require('../../extend/response')
const rsa = require('../../extend/rsa')
const jSessionUtil  = require('../../extend/session')

class Login extends egg.Controller {

    /**
     * @description 主页
     * @memberof Login
     */
    async index() {
        const {
            ctx
        } = this
        ctx.set('Access-Control-Allow-Origin', 'https://mp.mhealth100.com')
        await ctx.render('login/login.js', {
            encryptKey: rsa.privateKey
        });
    }


    /**
     * @description 登录接口
     * @memberof Login
     */
    async login() {
        const {
            ctx
        } = this

        const {
            info
        } = ctx.request.body
        if (info) {

            const secretKey = ctx.get('Referer')

            console.log(secretKey)

            const bytes = cryptoJS.AES.decrypt(info, secretKey)

            let decryptLoginInfo

            try {
                decryptLoginInfo = JSON.parse(bytes.toString(cryptoJS.enc.Utf8))
            } catch (e) {
                this.logger.error('Login decryptLoginInfo error', e)
                response.sendFail(ctx, '登录失败,decryptLoginInfo error')
            }

            if (decryptLoginInfo) {
                const res = await ctx.curl(
                    'https://mp.mhealth100.com/ip-healthmanager-mobile-web/loginValid', {
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            phone: decryptLoginInfo.id,
                            password: decryptLoginInfo.password,
                            type: 'password'
                        }
                    }
                )
                const {
                    data
                } = res
                if (Object.prototype.toString.call(data) === '[object Object]') {

                    if (data.resultCode === 0 && res.headers['set-cookie'] && res.headers['set-cookie'][0]) {
                        const JSESSIONIDReg = new RegExp(/^JSESSIONID=.*?\;/)
                        let match = res.headers['set-cookie'][0].match(JSESSIONIDReg)
                        if (match) {
                            match = match[0].replace('JSESSIONID=', '').replace(';', '')
                            jSessionUtil.setJSessionIdToCookies(ctx,match)

                            const saveJSessionIdRes = await ctx.service.session.insert({
                                userId: decryptLoginInfo.id,
                                jSessionId: match
                            })

                            console.log(saveJSessionIdRes)
                            // const doctorIndexInfo = await ctx.curl(
                            //     'https://mp.mhealth100.com/ip-healthmanager-mobile-web/doctor/getDoctorIndex', {
                            //         method: 'POST',
                            //         dataType: 'json',
                            //         headers: {
                            //             Cookie: `JSESSIONID=${match}`
                            //         },
                            //         data: {
                            //             commentCategory: 'CONSULTEVALUATE',
                            //             doctorOpenId: '2B50BDE7DBE3444C8CF0C4D9CEF8C818',
                            //             page: 1,
                            //             pageSize: 10
                            //         }
                            //     }
                            // )
                            // console.log('doctorIndexInfo',doctorIndexInfo)
                        }
                        response.send(ctx, data, data.resultCode, data.resultDesc)
                    } else {
                        response.send(ctx, data, data.resultCode, data.resultDesc)
                    }
                } else {
                    response.sendFail(ctx, '登录失败')
                }
            } else {
                response.sendFail(ctx, '登录失败')
            }
        } else {
            response.sendFail(ctx, 'info为空')
        }


    }
}

module.exports = Login