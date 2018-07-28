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

Vue.prototype.helpScarchAll = window.$helpScarchAll = function(params) {
  return new Promise(function(resolve, reject) {
    axios.post('/help/find/help/plan/project/list', params)
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













