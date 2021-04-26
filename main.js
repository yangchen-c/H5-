import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

/**
 * 引入封装好的ajax网络请求
 */
import fetch from './libs/request.js'
import api from './api'
Vue.prototype.$fetch = fetch
Vue.prototype.$api = api

const app = new Vue({
    ...App
})
app.$mount()
