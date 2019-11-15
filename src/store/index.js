/*
 * @Author: your name
 * @Date: 2019-11-15 10:17:03
 * @LastEditTime: 2019-11-15 11:23:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import vuexModules from './modules'

import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: vuexModules
})