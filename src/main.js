// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
// import cors from 'cors'
import echarts from 'echarts'



import vueMethodsPromise from 'vue-methods-promise'
import babelPolyfill from 'babel-polyfill'
import './assets/css/index.css'
import './mock/mockData.js'


import VueResource from 'vue-resource'
Vue.use(VueResource)
window.Vue=Vue

Vue.config.productionTip = false
window.XMLHttpRequest.withCredentials = true
// axios.defaults.baseURL = 'http://125.94.37.240:8096' // 测试2
// axios.defaults.baseURL = 'http://120.78.210.69:8096' // 园区购

// Vue.prototype.$imgUrl = 'http://125.94.45.180:8063/storage/upload' // 测试环境图片上传地址
// Vue.prototype.$imgUrl = 'http://120.78.210.69:8063/storage/upload' // 园区购图片上传地址

axios.defaults.withCredentials = true
axios.defaults.timeout = 10000
var alert = require('element-ui').MessageBox.alert
var tokenBugNum = 0
var tokenBug = function (eMsg) {
  if (tokenBugNum === 1) {
    alert(eMsg, '温馨提示', {
      confirmButtonText: '确定',
      callback: action => {
        router.push('/login')
        tokenBugNum = 0
      }
    })
  }
}

axios.interceptors.response.use(function (response) {
  // 处理对响应数据
  if (response.data.code === '0' || response.data.code === 0) {
    return response.data.data
  } else if (response.data.code === 'SHOPA_10001' || response.data.code === 'ST_LO10008' || response.data.code === 'SHOP_10057') {
    tokenBugNum++
    tokenBug(response.data.msg)
  } else {
    return Promise.reject(response.data.msg)
  }
}, function () {
  alert('登录过期，请重新登录', '温馨提示', {
    confirmButtonText: '确定'
  })
})
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vueMethodsPromise,
  babelPolyfill,
  echarts,
  components: { App },
  template: '<App/>'
})
