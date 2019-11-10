/*
 * @Author: your name
 * @Date: 2019-11-09 19:34:21
 * @LastEditTime: 2019-11-09 19:59:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\main.js
 */
// 生产环境中注释掉以下语句
import 'sysStatic/css/theme-default.scss'
import '../mock/index.js'

import 'babel-polyfill'
import Vue from "vue"
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import axios from './util/ajax'
import {fetch, post} from './util/http'
import i18n from './util/i18n'
import App from './index'

import './components/install'
import './plugins/install'

// 注册组件到Vue
Vue.prototype.$axios = axios
Vue.prototype.$get = fetch
Vue.prototype.$post = post
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

new Vue({
    i18n,
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app')