import Vue from 'vue'
import axios from 'axios'
// import { ERR_OK } from 'api/config'
var isRefresh = true

axios.defaults.baseURL = "http://192.168.3.33:8080" // 本地
    // axios.defaults.baseURL = "http://123.207.169.220:8080" // 测试
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

async function requestInterceptor(config) {
    let token = window.localStorage.getItem('xinyuan_accesstoken')
    console.log('token: ' + token)
    config.headers['ACCESS-TOKEN'] = token
    return config
}

axios.interceptors.request.use(config => {
    return requestInterceptor(config)
})

async function responseInterceptor(response) {
    if (response.data.code === '0' || response.data.code === 0) {
        return response.data.data
    } else if (response.data.code === 'AOP_CHECK_TOKEN_003') {
        console.log('token过期')
            // token过期, 刷新token
        if (isRefresh) {
            isRefresh = false
            let rToken = window.localStorage.getItem('xinyuan_refreshtoken')
            axios.get('/token/refresh/token/' + rToken)
                .then((res) => {
                    window.localStorage.setItem('xinyuan_accesstoken', res.accessToken)
                    window.localStorage.setItem('xinyuan_refreshtoken', res.refreshToken)
                    window.location.reload()
                    isRefresh = true
                })
                .catch((err) => {
                    console.log(err)
                    isRefresh = true
                })
        }

        return Promise.reject(response.data.message)
    } else {
        return Promise.reject(response.data.message)
    }
}

// 设置拦截器
axios.interceptors.response.use(function(response) {
    return responseInterceptor(response)
})

async function refreshApp() {
    Vue.prototype.clearData()
    window.localStorage.clear()
    window.location.href = window.location.href.replace(/#.*$/, '')
}
Vue.prototype.$axios = axios
