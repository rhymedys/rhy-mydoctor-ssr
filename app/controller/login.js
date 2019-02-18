/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 20:06:55 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-02-18 17:56:49
 */

'use strict'
const cryptoJS = require("crypto-js");
const egg = require('egg')
const response = require('../extend/response')
const rsa = require('../extend/rsa')
const jSessionUtil = require('../extend/session')

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

        let {
            info,
        } = ctx.request.body

        const {
            type
        } = ctx.request.body

        // 测试
        if(type==='test'){
            info = 'U2FsdGVkX1+VRgUn1GRsGcAREad+lKD0QqxQOrIGvbo0QIqRpN4xa8yV1wRzlB2DKnncA87kkEn0AocSmoS12w=='
        }

        if (info) {

            const secretKey = ctx.get('Referer')
            
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
                            jSessionUtil.setJSessionIdToCookies(ctx, match)
                            await ctx.service.session.insert({
                                userId: decryptLoginInfo.id,
                                jSessionId: match
                            })
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