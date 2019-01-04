/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 20:06:55 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-04 17:54:15
 */

'use strict'

const egg = require('egg')

class Login extends egg.Controller {
    async index() {
        const {
            ctx
        } = this
        await ctx.render('login/login.js', {});
    }
}

module.exports = Login