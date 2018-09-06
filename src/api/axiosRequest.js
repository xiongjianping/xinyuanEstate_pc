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
              console.log(res);
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

/*
 * 区间设置列表页
 *
 * 通过条件获取客销度项目列表(POST)
 */
Vue.prototype.getSectionGuestProjectList = window.$getSectionGuestProjectList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/project/find/list?p=' + page + '&c=' + size, params)
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
 * 区间设置列表页
 *
 * 通过条件获取客销度楼层列表(POST)
 */
Vue.prototype.getSectionGuestFloorList = window.$getSectionGuestFloorList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/floor/find/list?p=' + page + '&c=' + size, params)
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
 * 区间设置列表页
 *
 * 通过条件获取客销度业态列表(POST)
 */
Vue.prototype.getSectionGuestFormIdList = window.$getSectionGuestFormIdList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/form/find/list?p=' + page + '&c=' + size, params)
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
 * 区间设置列表页
 *
 * 通过条件获取客销度业种列表(POST)
 */
Vue.prototype.getSectionGuestBrandList = window.$getSectionGuestBrandList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/brand/find/list?p=' + page + '&c=' + size, params)
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
 * 动态三角形列表页
 *
 * 通过条件获取溢租率列表(POST)
 */
Vue.prototype.getRentList = window.$getRentList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/rentingrate/find/rentingrate/list?p=' + page + '&c=' + size, params)
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
 * 动态三角形列表页
 *
 * 通过条件获取客销度项目列表(POST)
 */
Vue.prototype.getGuestProjectList = window.$getGuestProjectList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/projectrate/find/projectrate/list?p=' + page + '&c=' + size, params)
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
 * 动态三角形列表页
 *
 * 通过条件获取客销度楼层列表(POST)
 */
Vue.prototype.getGuestFloorList = window.$getGuestFloorList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/floorrate/find/floorrate/list?p=' + page + '&c=' + size, params)
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
 * 动态三角形列表页
 *
 * 通过条件获取溢客销度品牌列表(POST)
 */
Vue.prototype.getGuestBrandList = window.$getGuestBrandList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/brandrate/find/brandrate/list?p=' + page + '&c=' + size, params)
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
 * 动态三角形列表页
 *
 * 通过条件获取适配值列表(POST)
 */
Vue.prototype.getFittedList = window.$getFittedList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/quarterrate/find/quarterrate/list?p=' + page + '&c=' + size, params)
      .then((res) => {
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
                // console.log(res)
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
 * 标准三角形
 * 项目溢租率新增(POST)
 */
Vue.prototype.createStandardProjectRentObj = window.$createStandardProjectRentObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardproject/save', params)
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
 * 标准三角形
 * 楼层溢租率新增(POST)
 */
Vue.prototype.createStandardFloorRentObj = window.$createStandardFloorRentObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardfloor/save', params)
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
 * 标准三角形
 * 业态溢租率新增(POST)
 */
Vue.prototype.createStandardFormRentObj = window.$createStandardFormRentObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardform/save', params)
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
 * 标准三角形
 * 业种溢租率新增(POST)
 */
Vue.prototype.createStandardMajorRentObj = window.$createStandardMajorRentObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardbrand/save', params)
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
 * 标准三角形
 * 品牌客销度新增(POST)
 */
Vue.prototype.createStandardGuestBrandObj = window.$createStandardGuestBrandObj= function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardguest/save', params)
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
 * 标准三角形
 * 项目适配值新增(POST)
 */
Vue.prototype.$createStandardProjectFittedObj = window.$createStandardProjectFittedObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedproject/save', params)
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
 * 标准三角形
 * 楼层适配值新增(POST)
 */
Vue.prototype.createStandardFloorFittedObj = window.$createStandardFloorFittedObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedfloor/save', params)
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
 * 标准三角形
 * 业态适配值新增(POST)
 */
Vue.prototype.createStandardFormFittedObj = window.$createStandardFormFittedObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedform/save', params)
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
 * 标准三角形
 * 业种适配值新增(POST)
 */
Vue.prototype.createStandardMajorFittedObj = window.$createStandardMajorFittedObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedbrand/save', params)
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
 * 标准三角形列表页
 *
 * 通过条件获取项目溢租率列表(POST)
 */
Vue.prototype.getStandardProjectRentList = window.$getStandardProjectRentList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardproject/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取楼层溢租率列表(POST)
 */
Vue.prototype.getStandardFloorRentList = window.$getStandardFloorRentList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardfloor/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取业态溢租率列表(POST)
 */
Vue.prototype.getStandardFormRentList = window.$getStandardFormRentList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardform/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取业种溢租率列表(POST)
 */
Vue.prototype.getStandardMajorRentList = window.$getStandardMajorRentList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardbrand/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取品牌客销度列表(POST)
 */
Vue.prototype.getStandardBrandGuestList = window.$getStandardBrandGuestList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/standardguest/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取项目适配值列表(POST)
 */
Vue.prototype.getStandardProjectFittedList = window.$getStandardProjectFittedList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedproject/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取楼层适配值列表(POST)
 */
Vue.prototype.getStandardFloorFittedList = window.$getStandardFloorFittedList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedfloor/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取业态适配值列表(POST)
 */
Vue.prototype.getStandardFormFittedList = window.$getStandardFormFittedList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedform/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形列表页
 *
 * 通过条件获取业种适配值列表(POST)
 */
Vue.prototype.getStandardMajorFittedList = window.$getStandardMajorFittedList = function(page, size, params) {
  return new Promise(function(resolve, reject) {
    axios.post('/fittedbrand/find/list?p=' + page + '&c=' + size, params)
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
 * 标准三角形溢租率管理类列表页
 *
 * 删除项目溢租率(GET)
 */
Vue.prototype.deleteStandardProjectRent = window.$deleteStandardProjectRent = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/standardproject/delete/id/' + id)
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
 * 标准三角形溢租率管理类列表页
 *
 * 删除楼层溢租率(GET)
 */
Vue.prototype.$deleteStandardFloorRent = window.$deleteStandardFloorRent = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/standardfloor/delete/id/' + id)
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
 * 标准三角形溢租率管理类列表页
 *
 * 删除业态溢租率(GET)
 */
Vue.prototype.deleteStandardFormRent = window.$deleteStandardFormRent = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/standardform/delete/id/' + id)
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
 * 区间设置客销度管理类列表页
 *
 * 删除项目客销度(GET)
 */
Vue.prototype.deleteTrigonometricProjectGuest = window.$deleteTrigonometricProjectGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/section/project/delete/id/' + id)
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
 * 区间设置客销度管理类列表页
 *
 * 删除楼层客销度(GET)
 */
Vue.prototype.deleteTrigonometricFloorGuest = window.$deleteTrigonometricFloorGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/section/floor/delete/id/' + id)
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
 * 区间设置客销度管理类列表页
 *
 * 删除业态客销度(GET)
 */
Vue.prototype.deleteTrigonometricFormGuest = window.$deleteTrigonometricFormGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/section/form/delete/id/' + id)
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
 * 区间设置客销度管理类列表页
 *
 * 删除业种客销度(GET)
 */
Vue.prototype.deleteTrigonometricMajorGuest = window.$deleteTrigonometricMajorGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/section/brand/delete/id/' + id)
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
 * 动态三角形溢租率管理类列表页
 *
 * 删除品牌溢租率(GET)
 */
Vue.prototype.deleteRent = window.$deleteRent = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/rentingrate/delete/rentingrate/id/' + id)
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
 * 动态三角形客销度管理类列表页
 *
 * 删除项目客销度(GET)
 */
Vue.prototype.deleteProjectGuest = window.$deleteProjectGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/projectrate/delete/projectrate/id/' + id)
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
 * 动态三角形客销度管理类列表页
 *
 * 删除楼层客销度(GET)
 */
Vue.prototype.deleteFloorGuest = window.$deleteFloorGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/floorrate/delete/floorrate/id/' + id)
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
 * 动态三角形客销度管理类列表页
 *
 * 删除品牌客销度(GET)
 */
Vue.prototype.deleteBrandGuest = window.$deleteBrandGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/brandrate/delete/brandrate/id/' + id)
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
 * 动态三角形适配值管理类列表页
 *
 * 删除适配值(GET)
 */
Vue.prototype.deleteFitted = window.$deleteFitted = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/quarterrate/delete/quarterrate/id/' + id)
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
 * 标准三角形溢租率管理类列表页
 *
 * 删除业种溢租率(GET)
 */
Vue.prototype.deleteStandardMajorRent = window.$deleteStandardMajorRent = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/standardbrand/delete/id/' + id)
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
 * 标准三角形客销度管理类列表页
 *
 * 删除品牌适配值(GET)
 */
Vue.prototype.deleteStandardBrandGuest = window.$deleteStandardBrandGuest = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/standardguest/delete/id/' + id)
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
 * 标准三角形适配值管理类列表页
 *
 * 删除项目适配值(GET)
 */
Vue.prototype.deleteStandardProjectFitted = window.$deleteStandardProjectFitted = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/fittedproject/delete/id/' + id)
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
 * 标准三角形适配值管理类列表页
 *
 * 删除楼层适配值(GET)
 */
Vue.prototype.$deleteStandardFloorFitted = window.$deleteStandardFloorFitted = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/fittedfloor/delete/id/' + id)
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
 * 标准三角形适配值管理类列表页
 *
 * 删除业态适配值(GET)
 */
Vue.prototype.deleteStandardFormFitted = window.$deleteStandardFormFitted = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/fittedform/delete/id/' + id)
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
 * 标准三角形适配值管理类列表页
 *
 * 删除业种适配值(GET)
 */
Vue.prototype.deleteStandardMajorFitted = window.$deleteStandardMajorFitted = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/fittedbrand/delete/id/' + id)
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
 * 动态三角形
 * 溢租率新增(POST)
 */
Vue.prototype.$createRentObj = window.$createRentObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/rentingrate/save/rentingrate', params)
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
 * 区间设置
 * 项目客销度新增(POST)
 */
Vue.prototype.createSectionProjectGuestObj = window.$createSectionProjectGuestObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/project/save/', params)
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
 * 区间设置
 * 楼层客销度新增(POST)
 */
Vue.prototype.createSectionFloorGuestObj = window.$createSectionFloorGuestObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/floor/save/', params)
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
 * 区间设置
 * 业态客销度新增(POST)
 */
Vue.prototype.createSectionFormIdGuestObj = window.$createSectionFormIdGuestObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/form/save/', params)
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
 * 区间设置
 * 业种客销度新增(POST)
 */
Vue.prototype.createSectionSpeciesGuestObj = window.$createSectionSpeciesGuestObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/section/brand/save/', params)
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
 * 动态三角形
 * 项目客销度新增(POST)
 */
Vue.prototype.createGuestProjectObj = window.$createGuestProjectObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/projectrate/save/projectrate', params)
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
 * 动态三角形
 * 楼层客销度新增(POST)
 */
Vue.prototype.createGuestFloorObj = window.$createGuestFloorObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/floorrate/save/floorrate', params)
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
 * 动态三角形
 * 品牌客销度新增(POST)
 */
Vue.prototype.createGuestBrandObj = window.$createGuestBrandObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/brandrate/save/brandrate', params)
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
 * 动态三角形
 * 适配值新增(POST)
 */
Vue.prototype.$createFittedObj = window.$createFittedObj = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/quarterrate/save/quarterrate', params)
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
Vue.prototype.getBuilding = window.$getBuilding = function(projectId) {
    return new Promise(function(resolve, reject) {
        axios.get('/region/find/building/project/' + projectId)
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
 * 获取业态下拉列表(POST)(原错误注释)
 * 获取区域下拉列表(Get)(2018.8.20 新的)
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
      if(typeof(params.projectId) == "undefined" ||  "" == params.projectId){
        reject("请选择查询条件")
        return ;
      }
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
 * 动态三角形查询签约id与品牌名称(xjp_20180826)
 * 通过业态和项目与签约列表(GET)
 */

Vue.prototype.getcontractIdForSpecies = window.$getcontractIdForSpecies = async function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/brand/find/contract', params)
      .then((res) => {
        console.log("getcontractIdForSpecies")
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
        axios.get('/contract/dispel/contract/' + id )
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
 * 解约(GET)-yyh
 */

Vue.prototype.breakContract_yyh = window.$breakContract_yyh = async function(id,effectTime) {
  return new Promise(function(resolve, reject) {
    axios.get('/contract/dispel/contract/' + id +'/'+effectTime)
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
