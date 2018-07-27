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

/*
 * 项目管理类列表页
 * 
 * 获取区域列表(GET)
 */
Vue.prototype.getAreaList = window.$getAreaList = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/area/all')
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

/*
 * 项目管理类列表页
 * 
 * 通过区域获取项目列表(POST)
 */
Vue.prototype.getProjectList = window.$getProjectList = function(page, size, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/find/project/list?p=' + page + '&c=' + size, params)
            .then((res) => {
                console.log(res)
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

/*
 * 项目管理类列表页
 * 
 * 获取父公司列表(GET)
 */
Vue.prototype.getCompanyAll = window.$getCompanyAll = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/company/all')
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

/*
 * 项目管理类列表页
 * 
 * 新增公司(POST)
 */
Vue.prototype.createCompany = window.$createCompany = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/save/company', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

/*
 * 项目管理类列表页
 * 
 * 查看项目详情(GET)
 */
Vue.prototype.getProjectDetails = window.$getProjectDetails = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/project/by/' + id)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}