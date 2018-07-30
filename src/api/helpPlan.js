import Vue from 'vue'
import axios from 'axios'

// 帮扶计划
//项目名称二级(GET)

Vue.prototype.helpSearchproject = window.$helpSearchproject = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/project/by/area/' + id)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

//项目帮扶搜索查询(post)

Vue.prototype.helpScarchAll = window.$helpScarchAll = function(p, c, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/help/find/help/plan/project/list?p=' + p + '&c=' + c, params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}


//帮扶内容

Vue.prototype.helpContent = window.$helpContent = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/help/find/help/context/list', params)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      });
  })
}

//帮扶内容
Vue.prototype.helpContent = window.$helpContent = function(p, c, params) {
        return new Promise(function(resolve, reject) {
            axios.post('/help/find/help/context/list?p=' + p + '&c=' + c, params)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                });
        })
    }
    //新增帮扶内容
Vue.prototype.createHelpContent = window.$createHelpContent = function(params) {
        return new Promise(function(resolve, reject) {
            axios.post('/help/save/help/context', params)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                });
        })
    }
    //删除帮扶内容
Vue.prototype.deleteHelpContent = window.$deleteHelpContent = function(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/help/remove/help/context/' + id)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

//帮扶项目下新增
//帮扶项目

Vue.prototype.addContent = window.$addContent = function(params) {
        return new Promise(function(resolve, reject) {
            axios.post('/help/save/help/plan/project', params)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                });
        })
    }
    //帮扶项目 新增 列表
Vue.prototype.addContentList = window.$addContentList = function(params) {
        return new Promise(function(resolve, reject) {
            axios.post('/help/find/help/context/all', params)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                });
        })
    }
    //帮扶项目 新增
Vue.prototype.createContentList = window.$createContentList = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/help/save/help/plan/project', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

/***************楼层帮扶*******************/
// 新增
Vue.prototype.createFloorList = window.$createFloorList = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/help/save/help/plan/floor', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

// 列表
Vue.prototype.helpFloorContent = window.$helpFloorContent = function(p, c, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/help/find/help/plan/floor/list?p=' + p + '&c=' + c, params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

/***************业种帮扶*******************/
// 新增
Vue.prototype.createBusinessList = window.$createBusinessList = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/help/save/help/plan/business/species', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}

// 列表
Vue.prototype.helpBusinessContent = window.$helpBusinessContent = function(p, c, params) {
    return new Promise(function(resolve, reject) {
        axios.post('/help/find/help/plan/business/species/list?p=' + p + '&c=' + c, params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });
    })
}
