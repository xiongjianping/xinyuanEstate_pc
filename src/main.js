// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
// import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import App from './App'
// import cors from 'cors'
import echarts from 'echarts'
//中国地图
import "echarts/map/js/china.js"

import vueMethodsPromise from 'vue-methods-promise'
import babelPolyfill from 'babel-polyfill'
// import './assets/css/index.css'

// import './mock/mockData.js' // 调试接口时需要注释
import './components/js/comaxios.js'
import './api/axiosRequest.js'
import './api/helpPlan.js'
//组件
import './components/common/mrSelect/components.js'
import _ from 'lodash'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
require('swiper/dist/css/swiper.css')
// require('!style-loader!css-loader!less-loader!./assets/css/base.less');

import VueResource from 'vue-resource'

Vue.use(VueResource)
window.Vue = Vue

Vue.config.productionTip = false
window.XMLHttpRequest.withCredentials = true

Vue.prototype.helpTypeList = window.$helpTypeList = [{ name: '租金帮扶', id: 1 }, { name: '活动支持', id: 2 }, { name: '点位宣传支持', id: 3 }, { name: '品牌及会员', id: 4 }, { name: '其他', id: 5 }]
Vue.prototype.businessTypeList = window.$businessTypeList = [{ name: '溢租率', id: 1 }, { name: '客销度', id: 2 }, { name: '适配值', id: 3 }]
Vue.prototype.dimensionList = window.$dimensionList = [{ name: '项目', id: 1 }, { name: '楼层', id: 2 }, { name: '业态', id: 3 }]
Vue.prototype.businessTypeList2 = window.$businessTypeList2 = [{ name: '溢租率', id: 1 }, { name: '客销度', id: 2 }, { name: '适配值', id: 3 }]
Vue.prototype.dimensionList2 = window.$dimensionList2 = [{ name: '项目', id: 1 }, { name: '楼层', id: 2 }, { name: '品牌', id: 3 }]

// Vue.prototype.baseUrl = window.$baseUrl = 'http://10.17.9.134:8080' // 本地
// Vue.prototype.baseUrl = window.$baseUrl = 'http://10.17.9.126:8080' // 本地

Vue.prototype.baseUrl = window.$baseUrl = 'http://192.168.3.33:8080' // 测试
// Vue.prototype.baseUrl = window.$baseUrl = 'http://192.168.0.55:8080' // 生产

var alert = require('element-ui').MessageBox.alert

Vue.use(ElementUI);
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
