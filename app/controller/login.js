/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 20:06:55 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-03-23 10:19:40
 */

'use strict'
const cryptoJS = require("crypto-js");
const egg = require('egg')
const response = require('../extend/response')
const jSessionUtil = require('../extend/session')
const crypto = require('crypto')
const fs = require('fs')
const publicKey = fs.readFileSync('./rsa_1024_pub.pem', "utf8")
var privateKey = fs.readFileSync('./rsa_1024_priv.pem', "utf8")


const testRefer = 'http://120.79.205.36:3001/my-doctor-ssr/login?redirect_uri=http%3A%2F%2F120.79.205.36%3A3001%2Fmy-doctor-ssr%2Fh5%2Fdoctor-index%3FdoctorOpenId%3D2B50BDE7DBE3444C8CF0C4D9CEF8C818'
const testInfo = 'U2FsdGVkX1/Q/URvQag1U/59L0BFl/XYKHte6jQKO4N2n/Xy2ILN+MNXDIg+MuAPPy4d2xJTUHtBhOlxeOxSeQ=='

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
            encryptKey: publicKey
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
            type,
        } = ctx.request.body




        // 测试
        if (type === 'test') {
            info = testInfo
        }

        if (info) {

            const secretKey = type === 'test' ? testRefer : ctx.get('Referer')

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

    async loginV2() {
        const {
            ctx
        } = this

        let {
            info,
        } = ctx.request.body

        console.log('loginWithRsa')

        const {
            type,
        } = ctx.request.body


        // 测试
        if (type === 'test') {
            info = testInfo
        }

        if (info) {

            let decryptLoginInfo

            try {
                const secretInfoBuffer = new Buffer(info, "base64")
                decryptLoginInfo = crypto.privateDecrypt({
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_PADDING
                }, secretInfoBuffer)
                decryptLoginInfo = decryptLoginInfo.toString("utf8")
                decryptLoginInfo = JSON.parse(decryptLoginInfo)
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