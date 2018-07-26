import Vue from 'Vue'
import axios from 'axios'

/*
 * 登录接口(GET)
 * userName：用户名
 */
Vue.prototype.login = window.$login = function(userName) {
    return new Promise(function(resolve, reject) {
        axios.get('/sso/login?userName=' + userName)
            .then((res) => {
                console.log('login: ' + JSON.stringify(res))
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

/*
 * 获取顶部菜单接口(GET)
 * userName：用户名
 */
Vue.prototype.menus = window.$menus = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/permission/login/menus')
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}