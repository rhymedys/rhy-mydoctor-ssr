/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-01-17 10:17:49 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-17 10:20:15
 */

'use strict';
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)



export default function createStore(initState) {
    const state = {
        initState: 'hello world',
        ...initState
    }

    return new Vuex.Store({
        state
    })
}