/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-17 21:15:06 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-17 21:19:14
 */

'use strict';
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)


function createRenderer(bundle, options) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {
        // for component caching
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./app/public/mydoctor_ssr'),
        // recommended for performance
        runInNewContext: false
    }))
}

module.exports = {
    createRenderer
}