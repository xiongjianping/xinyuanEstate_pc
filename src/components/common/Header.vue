<template>
  <!--<div class="header">-->
  <!--<el-row :gutter="20" class="">-->
  <!--<el-col :span="8">-->
  <!--<div class="index-left">-->
  <!--<ul style="margin-top: 20px">-->
  <!--<li>-->
  <!--<p>首页</p>-->
  <!--</li>-->
  <!--<li class="subMenu">项目管理</li>-->
  <!--<li>品牌管理</li>-->
  <!--<li>签约管理</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</el-col>-->
  <!--<el-col :span="8">-->
  <!--<div class="index-content">-->
  <!--<img src="../../assets/images/logo1.png" alt="" style="width:100%;margin-top:28px;">-->
  <!--</div>-->
  <!--</el-col>-->
  <!--<el-col :span="8"><div class="index-right">-->
  <!--<ul style="margin-top: 20px">-->
  <!--<li>数据管理</li>-->
  <!--<li>帮扶计划</li>-->
  <!--<li>评估模板</li>-->
  <!--<li>系统平台</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</el-col>-->
  <!--</el-row>-->
  <!--</div>-->
  <div class="header">
    <div class="navList">
      <ul class="navCont" @mouseleave="closeAllSubMenu">
        <li v-if="navList.length > 0" v-for="(info, index) in navList" :key="info.id" class="navLi" :class="{'curLi': curLi === info.url}">
        <p @click="goLink(info, info)">{{info.name}}</p>
          <ul class="subMenu" v-if="info.childMenus && info.childMenus.length > 0" v-show="info.showSub">
            <li v-for="item in info.childMenus" :key="item.id" @click="goLink(item, info)">{{item.name}}</li>
          </ul>
        </li>
      </ul>
      <img src="../../assets/images/logo_Q.png" alt="" class="logo">
      <ul class="navCont2" @mouseleave="closeAllSubMenu">
        <li v-if="navList1.length > 0" v-for="(info, index) in navList1" :key="info.id" class="navLi1" :class="{'curLi': curLi === info.url}">
          <p @click="goLink(info, info)">{{info.name}}</p>
          <ul class="subMenu" v-if="info.childMenus && info.childMenus.length > 0" v-show="info.showSub">
            <li v-for="item in info.childMenus" :key="item.id" @click="goLink(item, info)">{{item.name}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
      nowDate: '',
      week: '',
      curLi: '/index',
      navList: [],
      navList1: []
    }
  },
  created() {
    this.getMenus()
    // this.nowDate = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日'
    // var weekList = ['日', '一', '二', '三', '四', '五', '六']
    // this.week = '星期' + weekList[new Date().getDay()]
    // var self = this
    // if (!window.localStorage.getItem('userInfo') || window.localStorage.getItem('userInfo') === 'undefined') {
    //   self.$axios.get('/shop/user/permission').then((res) => {
    //     if (res) {
    //       window.localStorage.setItem('userInfo', JSON.stringify(res))
    //       self.userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}
    //     }
    //   })
    // } else {
    //   self.userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}
    // }

    // this.curLi = this.$route.meta.parentPath ? this.$route.meta.parentPath : this.$route.path;
  },
  computed: {
    pageNameList() {
      return this.$route.matched.map(route => route.meta)
    }
  },
  methods: {
    // 获取菜单并平分菜单为2个数组
    getMenus() {
      window.$menus().then((res) => {
        if (res.length === 1) {
          // 如果只有首页权限
          this.navList = res
        } else {
          // 判断数组是单数还是双数
          let middle = res.length / 2
          if (res.length % 2 === 0) {
            this.navList = res.slice(0, middle)
            this.navList1 = res.slice(middle)
          } else {
            this.navList = res.slice(0, middle + 1)
            this.navList1 = res.slice(middle + 1)
          }
        }
      }, (err) => {
        console.log(err)
      })
    },
    goLink(info, data) {
      this.closeAllSubMenu()
      if (info.childMenus && info.childMenus.length > 0) {
        this.$set(data, 'showSub', true);
        this.curLi = data ? data.url : info.url;
      } else {
        this.curLi = data ? data.url : info.url
        this.$router.push(info.url)
        this.$set(data, 'showSub', false)
      }
    },
    closeAllSubMenu() {
      this.navList.map((item) => { this.$set(item, 'showSub', false) })
      this.navList1.map((item) => { this.$set(item, 'showSub', false) })
    },
    showAlert: function(cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  }
}

</script>
<style scoped lang="less">
.header {
  box-sizing: border-box;
  width: 100%;
  min-width: 1300px;
  margin:0 auto;
  height: 100px;
  line-height: 100px;
  color: #fff;
  text-align: center;
  position: fixed;
  background: url("../../assets/images/nav_bg.jpg") repeat top center;
  background-size: 100% 100%;
  z-index: 9999;
}

.header .logo {
  display: inline-block;
  width: 35%;
  vertical-align: middle;
}

.navList {
  height: 100px;
  line-height: 100px;
  ul.navCont,ul.navCont2{display: inline-block;margin-bottom: 0;margin-top: 34px;vertical-align: top;}
  p{margin-bottom: 0;}
  // ul.navCont {
  //   width: 382px;
  //   position: absolute;
  //   left: 8%;
  // }
  // ul.navCont2 {
  //   width: 410px;
  //   position: absolute;
  //   left: 64%;
  // }
  ul.subMenu {
    position: absolute;
    z-index: 999;
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-top: none;
    color: #333;

    top: 25px;
    left: 0;
    padding: 5px 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    li {
      /*padding: 0 10px;*/
      border-bottom: 1px solid #ddd;
    }
    li:last-child {
      border: none;
    }
  }
  li.navLi {
    float: left;
    padding: 0 20px;
    cursor: pointer;
    /*height: 32px;*/
    line-height: 32px;
    font-size: 14px;
    position: relative;
  }
  li.navLi:after {
    content: '';
    position: absolute;
    height: 10px;
    width: 1px;
    border-left: 1px solid #fff;
    right: -2px;
    top: 11px;
    display: block;
  }
  li.navLi.curLi {
    background: #fff;
    color: #eacb8b;
    border-radius: 6px;
  }
  li.navLi.curLi:after,
  li.navLi:last-child:after {
    content: '';
    border: none;
  }
  /**/
  li.navLi1 {
    float: left;
    padding: 0 20px;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    position: relative;
  }
  li.navLi1:after {
    content: '';
    position: absolute;
    height: 10px;
    width: 1px;
    border-left: 1px solid #fff;
    right: -2px;
    top: 11px;
    display: block;
  }
  li.navLi1.curLi {
    background: #fff;
    color: #eacb8b;
    border-radius: 6px;
  }
  li.navLi1.curLi1:after,
  li.navLi1:last-child:after {
    content: '';
    border: none;
  }
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 12px;
  padding-top: 25px;
  color: #686868;
}

.date {
  display: inline-block;
  margin-right: 25px;
}

.breadcrumb {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 40px;
  color: #333;
  border-bottom: 1px solid #ddd;
  z-index: 9;
  background: #fafafa;
  overflow: hidden;
}

.bread {
  padding: 0 30px;
  line-height: 40px;
}

</style>
