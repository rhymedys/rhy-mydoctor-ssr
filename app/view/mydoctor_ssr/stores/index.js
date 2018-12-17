/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-17 21:05:00 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-17 21:05:36
 */



import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
      state: {
        activeType: null,
        itemsPerPage: 20,
        items: {/* [id: number]: Item */},
        users: {/* [id: string]: User */},
        lists: {
          top: [/* number */],
          new: [],
          show: [],
          ask: [],
          job: []
        }
      }
    })
  }
  