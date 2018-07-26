<template>
  <div class="header">
    <div class="navList">
      <ul class="navCont">
        <li v-if="navList.length > 0" v-for="(info, index) in navList" :key="info.id" class="navLi" :class="{'curLi': curLi === info.url}">
          <p @click="goLink(info, info)">{{info.name}}</p>
          <ul class="subMenu" v-if="info.childMenus && info.childMenus.length > 0" v-show="info.showSub">
            <li v-for="item in info.childMenus" :key="item.id" @click="goLink(item, info)">{{item.name}}</li>
          </ul>
        </li>
        <li>
          <img src="../../assets/images/zhong.png" alt="" style="width:50%;margin-left:-55px;">
          <img src="../../assets/images/logo.png"  alt="" class="logos">
        </li>
        <li v-if="navList1.length > 0" v-for="(info, index) in navList1" :key="info.id" class="navLi1" :class="{'curLi': curLi === info.url}">
          <p @click="goLink(info, info)">{{info.name}}</p>
          <ul class="subMenu" v-if="info.childMenus && info.childMenus.length > 0" v-show="info.showSub">
            <li v-for="item in info.childMenus" :key="item.id" @click="goLink(item, info)">{{item.name}}
            <!--<ul class="subMenu" v-if="info.subMenu && info.subMenu.length > 0" v-show="info.showSub">-->
              <!--&lt;!&ndash;<li v-for="item in info.subMenu.subMenu1" :key="item.id" @click="goLink(item, info)"></li>&ndash;&gt;-->
            <!--</ul>-->
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<div class="breadcrumb" style="display: none">-->
      <!--<el-breadcrumb separator="/" class="bread">-->
        <!--<el-breadcrumb-item class="indexPage">您所在的位置</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item v-if="pageNameList.length > 1 && page.pageName"-->
                            <!--v-for="(page, index) in pageNameList" :key="page.pageName" v-show="index != 0" >{{page.pageName}}-->
        <!--</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</div>-->
  </div>

</template>
<script>
  export default {
    data () {
      return {
        userInfo: {},
        nowDate: '',
        week: '',
        curLi: '/index',
        navList: [],
        navList1:[]
      }
    },
    created () {
      this.getMenus()
      this.nowDate = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日'
      var weekList = ['日', '一', '二', '三', '四', '五', '六']
      this.week = '星期' + weekList[new Date().getDay()]
      var self = this
      if (!window.localStorage.getItem('userInfo') || window.localStorage.getItem('userInfo') === 'undefined') {
        self.$axios.get('/shop/user/permission').then((res) => {
          if (res) {
            window.localStorage.setItem('userInfo', JSON.stringify(res))
            self.userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}
          }
        })
      } else {
        self.userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}
      }

      this.curLi = this.$route.meta.parentPath ? this.$route.meta.parentPath : this.$route.path;
      console.log("create---header.vue---end");
    },
    computed: {
      pageNameList () {
        return this.$route.matched.map(route => route.meta)
      }
    },
    methods: {
      // 获取菜单并平分菜单为2个数组
      getMenus(){
        window.$menus().then((res) => {
          console.log(res)
          if(res.length === 1){
            // 如果只有首页权限
            this.navList = res
          } else {
            // 判断数组是单数还是双数
            let middle = res.length / 2
            if(res.length % 2 === 0){
              this.navList = res.slice(0, middle)
              console.log('this.navList: ' + JSON.stringify(this.navList))
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
      goLink (info, data) {
        this.closeAllSubMenu()
        if (info.childMenus && info.childMenus.length > 0) {
          this.$set(data, 'showSub', true);
          this.curLi = data ? data.url : info.url;
        } else {
          this.curLi = data ? data.url : info.url;
          this.$router.push(info.url);
          this.$set(data, 'showSub', false);
        }
      },
      closeAllSubMenu () {
        this.navList.map((item) => { this.$set(item, 'showSub', false) })
        this.navList1.map((item) => { this.$set(item, 'showSub', false) })
      },
      showAlert: function (cont) {
        this.$alert(cont, '温馨提示', {
          confirmButtonText: '确定'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .logos{
    width :200px;
    height: 66px;
    margin-left: 95px;
    margin-top :-50px;
  }

  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 85px;
    color: #fff;
    /*background: #fff;*/
    z-index: 99;
  }

  .header .logo{
    float: left;
    width:250px;
    height:50px;
    text-align: center;
    img{
      height: 100%;
    }
  }

  .navList{
    width: 100%;
    height: 32px;
    clear: both;
    position: relative;
    top: 35px;
    left: 0;
    ul.navCont{
      width: 1000px;
      min-width: 1000px;
      margin: 0 auto;
      position: absolute;
      top: 0;
      left: 100px;
    }
    ul.subMenu{
      position: absolute;
      z-index: 999;
      width: 100%;
      background: #fff;
      border: 1px solid #ddd;
      border-top: none;
      color: #333;
      left: 0;
      padding: 5px 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      li{
        padding: 0 10px;
        border-bottom: 1px solid #ddd;
      }
      li:last-child{
        border: none;
      }
    }
    li.navLi{
      float: left;
      padding: 0 20px;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      position: relative;
      left: -50px;
    }
    li.navLi:after{
      content: '';
      position: absolute;
      height: 10px;
      width: 1px;
      border-left: 1px solid #fff;
      right: -2px;
      top:11px;
      display: block;
    }
    li.navLi.curLi{
      background: #fff;
      color: #eacb8b;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    li.navLi.curLi:after, li.navLi:last-child:after{
      content: '';
      border: none;
    }

    li.navLi1{
      float: left;
      padding: 0 20px;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      position: relative;
      right: -770px;
      top: -53px;
    }
    li.navLi1:after{
      content: '';
      position: absolute;
      height: 10px;
      width: 1px;
      border-left: 1px solid #fff;
      right: -2px;
      top:11px;
      display: block;
    }
    li.navLi1.curLi{
      background: #fff;
      color: #eacb8b;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    li.navLi1.curLi1:after, li.navLi1:last-child:after{
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
  .date{
    display:inline-block;
    margin-right: 25px;
  }
  .breadcrumb{
    position: absolute;
    top: 60px;
    left:0;
    width: 100%;
    height: 40px;
    color: #333;
    border-bottom: 1px solid #ddd;
    z-index: 9;
    background: #fafafa;
    overflow: hidden;
  }
  .bread{
    padding: 0 30px;
    line-height: 40px;
  }
</style>
