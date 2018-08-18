import Vue from 'vue'
import axios from 'axios'

/*
 * 登录接口(GET)
 * userName：用户名
 */
Vue.prototype.login = window.$login = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/sso/login', params)
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
            .catch((error) =>{
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

Vue.prototype.getProjectListForArea = window.$getProjectListForArea = function(areaId) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/project/by/area/' + areaId)
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
 * 编辑项目(POST)
 */
Vue.prototype.editProject = window.$editProject = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/edit/project', params)
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
 * 新增楼层(POST)
 */
Vue.prototype.createFloor = window.$createFloor = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/save/floor', params)
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
 * 通过项目获取楼栋(GET)
 */
Vue.prototype.getBuilding = window.$getBuilding = function(areaId) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/building/project/' + areaId)
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
 * 楼层管理类列表页
 *
 * 删除楼层(GET)
 */
Vue.prototype.deleteFloor = window.$deleteFloor = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/remove/floor/' + id)
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
 * 编辑楼层详情(POST)
 */
Vue.prototype.editFloor = window.$editFloor = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/edit/floor', params)
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
 * 铺位管理类列表页
 *
 */
Vue.prototype.getStoreList = window.$getStoreList = function(page, size, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/find/room/list?p=' + page + '&c=' + size, params)
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
 * 铺位管理类列表页
 *
 * 新增铺位(POST)
 */
Vue.prototype.createStore = window.$createStore = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/save/room', params)
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
 * 铺位管理类列表页
 *
 * 铺位详情(GET)
 */
Vue.prototype.getStoreDetails = window.$getStoreDetails = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/room/by/' + id)
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
 * 铺位管理类列表页
 *
 * 编辑铺位详情(POST)
 */
Vue.prototype.editStore = window.$editStore = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/edit/room', params)
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
 * 铺位管理类列表页
 *
 * 通过楼栋获取楼层(GET)
 */
Vue.prototype.getFloorForBuilding = window.$getFloorForBuilding = function(buildingId) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/floor/by/building/' + buildingId)
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
Vue.prototype.getSpeciesSelect = window.$getSpeciesSelect = function(id) {
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


/*
 * 品牌管理类列表页
 *
 * 新增品牌(POST)
 */
Vue.prototype.createBrand = window.$createBrand = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/brand/save/brand', params)
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
 * 品牌详情(GET)
 */
Vue.prototype.getBrandDetails = window.$getBrandDetails = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/brand/find/brand/by/' + id)
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
 * 编辑品牌(POST)
 */
Vue.prototype.editBrand = window.$editBrand = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/brand/edit/brand', params)
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
 * 删除品牌(GET)
 */
Vue.prototype.deleteBrand = window.$deleteBrand = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/brand/remove/brand/' + id)
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
 * 签约管理
 *
 * 获取所有品牌列表(POST)
 */

Vue.prototype.getAllBrand = window.$getAllBrand = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/brand/brand/all')
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
 * 签约管理
 *
 * 新增签约(POST)
 */
Vue.prototype.createContract = window.$createContract = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/contract/add/contract', params)
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
 * 签约管理
 *
 * 通过项目id和铺位id查询未签约品牌列表(POST)
 */

Vue.prototype.getNoSignContract = window.$getNoSignContract = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/region/find/room/by/project', params)
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
 * 签约管理
 *
 * 通过业种获取品牌列表(GET)
 */

Vue.prototype.getBrandForSpecies = window.$getBrandForSpecies = async function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/brand/find/brand/by/businessSpecies/' + id)
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
 * 签约管理
 *
 * 品牌列表(POST)
 */

Vue.prototype.getBrandAllList = window.$getBrandAllList = async function(p, c, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/contract/contract/list?p=' + p + '&c=' + c, params)
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
 * 签约管理
 *
 * 解约(GET)
 */

Vue.prototype.breakContract = window.$breakContract = async function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/contract/dispel/contract/' + id)
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
 * 导入
 */

Vue.prototype.fileUpload = window.$fileUpload = async function(e, url) {
    let params = new FormData() //创建form对象
    params.append('file', e.target.files[0]) //通过append向form对象添加数据
    return new Promise(function(resolve, reject) {
        axios.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } })
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
 * 导出
 */

Vue.prototype.exportExls = window.$exportExls = async function(url, id) {
    let params = {
        projectId: id
    }
    return new Promise(function(resolve, reject) {
        axios.post(url, params)
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
 * 通过项目获取业态
 */
Vue.prototype.getBusinessListForProject = window.$getBusinessListForProject = function(id) {
    var params = {
        projectId: id
    }
    return new Promise(function(resolve, reject) {
        axios.post('/pctriangle/find/Conditionlist/project', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}
