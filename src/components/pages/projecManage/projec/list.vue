<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.area" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="6">
          <el-form-item label="项目名称">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>

        <el-form-item label="开始时间">
        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
          </el-form-item>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="resetForm();">新增公司</el-button>
            <el-button type="primary" size="medium" v-on:click="editDetails();">新增项目</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">

      <el-table :data="data.list" border size="medium">
        <el-table-column align="center" prop="id" label="序号"></el-table-column>
        <el-table-column align="center" prop="area" label="区域"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="operationleader" label="运营负责人"></el-table-column>
        <el-table-column align="center" prop="startTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="当前状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.status === 'ENABLED'">启用</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.status === 'DISABLED'">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
            <el-button type="text" v-on:click="editDetails(scope.row.id)">编辑</el-button>
            <el-button type="text" v-if="scope.row.status == 'DISABLED'" v-on:click="showDetails(scope.row)">启用</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="data.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.count">
        </el-pagination>
      </div>
    </div>
     </div>
</template>
<script>

import moment from 'moment'
import qs from 'qs';
import axios from 'axios';

export default {
  data: () => ({
    pickerOptions2: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
    value6: '',
    value7: '',
    data: {
    },
    loading: false,
    searchForm: {
      area: '',
      company: '',
      startTime: null
    },
    infoData: {},
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
  }),
  created () {
    this.searchList(1)
      // this.$http.post("http://123.207.169.220:8080/tissue/employee/login", {
      //   "userName": "admin",
      //   "userPassword": "admin"
      // })
      //   .then((data) => {
      //     this.arrs = data.body;
      //     window.Vue.http.headers.common['accessToken'] = data.body.data.accessToken;
      //   })

      this.$http.post("/api/region/find/project/list?p=1&c=10", {})
        // .then((data) => {
        //   this.arrs = data.body;
        //   window.Vue.http.headers.common['accessToken'] = data.body.data.accessToken;
        // })
        .then((data) => {
          this.arrs2 = data.body;
        })


    /*axios.post(url,qs.stringify({  // 通过qs.stringify()将对象解析成URL的形式
      name:'0', age:'2'
    }),{emulateJSON: true},{
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}
    }).then(reponse=>{
      console.log(reponse)
      this.tableData=reponse.data.data
    })*/


  },

  methods: {
    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.data.page = val
      this.searchList()
    },
    searchList (type) {
      this.loading = false
      var that = this
      var page
      var params = {
        publishedName: that.searchForm.publishedName ? that.searchForm.publishedName : null,
        merchandise: that.searchForm.merchandise ? that.searchForm.merchandise : null,
        startTime: that.searchForm.startTime ? moment(new Date(that.searchForm.startTime).getTime()).format('YYYY-MM-DD HH:mm:ss') : null
      }
      if (type === 1) {
        page = 1
      } else {
        page = this.data.page
      }
      that.loading = false
     // var self = this
     //  $.post('/api/tissue/employee/login', {}, function (res) {
     //    that.data = res;
     //  }, 'json')




      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      // that.$axios.post('/list').then((res) => {
      //   that.loading = false
      //   that.data = res
      //   console.log(res)
      // }).catch(function (eMsg) {
      //   that.loading = false
      //   that.showAlert(eMsg)
      // })

      that.$http.post('/api/region/find/project/list',{}).then(function (res) {
        that.loading = false;
        that.data = res
      },function (err) {})


    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/projec/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/projec/add/' + id)
    },
    showAlert: function (cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  },
}

</script>
<style scoped  lang="less">
/*.el-date-editor.el-input, .el-date-editor.el-input__inner{*/
  /*width: 100%;*/
/*}*/

  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .dd{
    width: 100%;
    height:50px;
    background: #e7cb8a;
    margin-bottom: 5px;
  }



  /*头部*/
  /*.tou{*/
    /*background: #fff;*/
    /*width: 100%;*/
    /*height:70px;*/
    /*position: relative;*/
    /*top: 0;*/
    /*left: 0;*/
  /*}*/
  /*.tou_left img{*/
    /*width: 240px;*/
    /*height:70px;*/
    /*margin-left: 50px;*/
  /*}*/
  /*.tou_right {*/
    /*width: 200px;*/
    /*float: right;*/
    /*color: #000;*/
    /*position: absolute;*/
    /*bottom:10px;*/
    /*right: 120px;*/
    /*p{*/
      /*font-size: 14px;*/
    /*}*/
    /*.deng{*/
      /*width: 100px;*/
      /*position: absolute;*/
      /*top: 0;*/
      /*right: -90px;*/
      /*font-size: 14px;*/
      /*span{*/
        /*padding: 3px;*/
        /*color: orange;*/
      /*}*/
    /*}*/

  /*}*/

  /*导航*/
  /*.navList{*/
    /*background: #159cd4;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*border-top: 5px solid #e7cb8a;*/
    /*ul{*/
      /*margin-left: 60px;*/
    /*}*/
    /*ul li{*/
      /*display: inline-block;*/
      /*padding: 3px;*/
      /*font-size: 14px;*/
      /*color: #fff;*/
    /*}*/
    /*ul li.navli{*/
      /*background: #fff;*/
      /*color: #159cd4;*/
      /*border-top-left-radius: 6px;*/
      /*border-top-right-radius: 6px;*/
      /*}*/
  /*}*/

</style>
