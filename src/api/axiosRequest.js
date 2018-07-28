import Vue from 'vue'
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
 * 新增项目(POST)
 */
Vue.prototype.createProject = window.$createProject = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/save/project', params)
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
 * 通过公司获取部门(GET)
 */
Vue.prototype.getDepartments = window.$getDepartments = function(companyId) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/department/by/parent/' + companyId)
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
 * 通过部门获取人员(GET)
 */
Vue.prototype.getPersion = window.$getPersion = function(departmentId) {
    return new Promise(function(resolve, reject) {
        axios.get('/tissue/find/employee/by/company/' + departmentId)
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

/*
 * 项目管理类列表页
 * 
 * 删除项目(GET)
 */
Vue.prototype.deleteProject = window.$deleteProject = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/remove/project/' + id)
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
 * 楼层管理类列表页
 * 
 * 删除项目(GET)
 */
Vue.prototype.getFloorList = window.$getFloorList = function(page, size, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/find/floor/list?p=' + page + '&c=' + size, params)
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
 * 楼层管理类列表页
 * 
 * 查看楼层详情(GET)
 */
Vue.prototype.getFloorDetails = window.$getFloorDetails = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/floor/by/' + id)
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
 * 品牌管理类列表页
 * 
 * 获取列表(POST)
 */
Vue.prototype.getBrandList = window.$getBrandList = function(page, size, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/brand/find/brand/list?p=' + page + '&c=' + size, params)
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
 * 品牌管理类列表页
 * 
 * 获取业态下拉列表(POST)
 */
Vue.prototype.getformSelect = window.$getformSelect = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/base/find/business/form/select')
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
 * 品牌管理类列表页
 * 
 * 获取业种下拉列表(POST)
 */
Vue.prototype.getspeciesSelect = window.$getspeciesSelect = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/base/find/business/species/select/' + id)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}