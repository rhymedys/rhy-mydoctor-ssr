/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-17 21:16:45 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-17 21:47:15
 */

'use strict'
const fs = require('fs')
const createRenderer = require('./helper').createRenderer


const isProd = process.env.NODE_ENV === 'production'


let renderer
let readyPromise

const templatePath = resolve('./app/view/mydoctor_ssr/index.template.html')

function init() {

}


module.exports = {
    init
}