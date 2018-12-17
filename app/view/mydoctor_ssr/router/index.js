/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-17 21:01:34 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-17 21:10:21
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Demo = ()=>import('../pages/demo/index.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {   
            path:'/demo',
            name:'demo',
            component:Demo
        }
    ]
  })
}
