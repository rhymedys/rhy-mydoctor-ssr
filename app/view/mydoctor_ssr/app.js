/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-17 20:53:19 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-17 21:06:27
 */

import Vue from 'vue'
import {createRouter} from './router'
import {createStore} from './stores'

export default function createApp(params) {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store,
        render: h => h('div', 'app')
    })


    return {
        app,
        router,
        store
    }
}