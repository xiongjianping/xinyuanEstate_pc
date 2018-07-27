<template>
  <div class="header">
    <div class="navList">
      <ul class="navCont">
        <li v-for="(info, index) in navList" :key="info.id" class="navLi" :class="{'curLi': curLi === info.url}">
          <p @click="goLink(info, info)">{{info.name}}</p>
          <ul class="subMenu" v-if="info.subMenu && info.subMenu.length > 0" v-show="info.showSub">
            <li v-for="item in info.subMenu" :key="item.id" @click="goLink(item, info)">{{item.name}}</li>
          </ul>
        </li>
        <li>
          <img src="../../assets/images/zhong.png" alt="" style="width:50%;margin-left:-55px;">
          <img src="../../assets/images/logo.png"  alt="" class="logos">
        </li>
        <li v-for="(info, index) in navList1" :key="info.id" class="navLi1" :class="{'curLi': curLi === info.url}">
          <p @click="goLink(info, info)">{{info.name}}</p>
          <ul class="subMenu" v-if="info.subMenu && info.subMenu.length > 0" v-show="info.showSub">
            <li v-for="item in info.subMenu" :key="item.id" @click="goLink(item, info)">{{item.name}}
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
        navList: [
          {
            id: 1,
            name: '首 页',
            url: '/index',
            subMenu: []
          },
          {
            id: 2,
            name: '项目管理',
            url: '/projecManage',
            subMenu: [
              {
                id: 21,
                name: '项目管理',
                url: '/projecManage/projec/list'
              }, {
                id: 22,
                name: '楼层管理',
                url: '/projecManage/floor/list'
              },
              {
                id: 23,
                name: '铺位管理',
                url: '/projecManage/store/list'
              }
            ]
          },
          {
            id: 3,
            name: '品牌管理',
            url: '/indicatorsManage',
            subMenu: [
              {
                id: 31,
                name: '品牌管理',
                url: '/indicatorsManage/indicators/list'
              }
            ]

          },
          {
            id: 4,
            name: '签约管理',
            url: '/qianyue',
            subMenu: [
              {
                id: 41,
                name: '签约管理',
                url: '/qianyue/qianyue/list'
              }, {
                id: 42,
                name: '三角理论',
                url: '/qianyue/sanjiao/list'
              }
            ]
          },
        ],
        navList1:[
          {
            id: 5,
            name: '数据管理',
            url: '/dataManage',
            subMenu: [
              {
                id: 51,
                name: '标准三角形',
                url: '/dataManage/version/list'
              },
              {
                id: 52,
                name: '区间设置',
                url: '/dataManage/trigonometric/list'
              },
              {
                id: 53,
                name: '动态三角形',
                url: '/dataManage/dongtai/list'
              },
              {
                id: 54,
                name: '数据维护',
                url: '/dataManage/shuju/list'
              }
            ]
          },
          {
            id: 6,
            name: '帮扶计划',
            url: '/evaluationTpl',
            subMenu: [
              {
                id: 61,
                name: '项目帮扶',
                url: '/evaluationTpl/template/list'
              }, {
                id: 62,
                name: '楼层帮扶',
                url: '/evaluationTpl/evaluation/list'
              }, {
                id: 63,
                name: '业态帮扶',
                url: '/evaluationTpl/yetaibangfu/list'
              }, {
                id: 64,
                name: '帮扶内容',
                url: '/evaluationTpl/bangfuneirong/list'
              }
            ]

          },
          {
            id: 7,
            name: '评估模板',
            url: '/organizationStructure',

            subMenu: [
              {
                id: 71,
                name: '模板管理',
                url: '/organizationStructure/organization'
              }
            ]
          },
          {
            id: 8,
            name: '系统平台',
            url: '/dataDictionary',
            subMenu: [
              {
                id: 81,
                name: '业态管理',
                url: '/dataDictionary/brand/list',
              },
              {
                id: 82,
                name: '业种管理',
                url: '/dataDictionary/formats/list',
              },
              {
                id: 83,
                name: '适配值',
                url: '/dataDictionary/megabite/list',
              },

              {
                id: 84,
                name: '区间公司',
                url: '/dataDictionary/qujiangongsi/list',
              },
              {
                id: 85,
                name: '组织管理',
                url: '/dataDictionary/zuzhiguanli/list',
              },
              {
                id: 86,
                name: '人员管理',
                url: '/dataDictionary/renyuanguanli/list',
              }, {
                id: 87,
                name: '角色管理',
                url: '/dataDictionary/jueseguanli/list',
              }
            ]
          },
        ]
      }
    },
    created () {
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
      goLink (info, data) {
        if (info.subMenu && info.subMenu.length > 0) {
          this.closeAllSubMenu();
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
      },

      loginout () {
        var that = this
        this.$confirm('即将退出, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.get('/shop/userauth/logout/' + that.userInfo.id).then((res) => {
            window.localStorage.removeItem('userInfo')
            that.$router.push('/login')
          }).catch(function (eMsg) {
            that.showAlert('退出失败，请重试~')
          })
        })
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
