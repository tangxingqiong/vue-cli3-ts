import Vue from 'vue'
import App from './App.vue'
import {router} from '@/router'
import store from '@/store'

// import iView from 'iview'
import iView from 'view-design';
Vue.use(iView,{
    // size: 'large',
})
// import './plugins/iview.js'

// import uploader from 'vue-simple-uploader'
// Vue.use(uploader)

import './styles/theme/index.less'
import './styles/common.less'

// import echarts from "echarts"
// Vue.prototype.$echarts = echarts

import VueHttpPlugin from '@/libs/vue-http-plugin'
Vue.use(VueHttpPlugin)

import api from '@/services/api'
Vue.prototype.$api = api

import {hasAuth} from '@/libs/utils.js'
Vue.prototype.hasAuth = hasAuth

import uploader from 'vue-simple-uploader'
Vue.use(uploader)

// 版本校验
import checkInfo from '@/libs/checkInfo.js'
checkInfo()

// Vue.config.productionTip = false
window.addEventListener('storage', e => {
    console.log('mw_broadcast')
    if (e.key === 'mw_broadcast') {
        debugger
    }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
