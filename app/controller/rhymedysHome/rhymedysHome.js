/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 20:06:55 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-04 18:09:51
 */

'use strict'

const egg = require('egg')

class RhymedysHome extends egg.Controller {
    async public() {
        const {
            ctx
        } = this
        this.logger.warn(ctx.url)
        const staticFilePath = ctx.url.replace(/^.*rhymedys_home\//, '').replace(/\?(.*)/, '')
        await ctx.render(staticFilePath, {})
    }
}

module.exports = RhymedysHome