<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <!-- <el-col :span="6"> -->
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="全部">
              <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        <!-- </el-col> -->

        <!-- <el-col :span="6"> -->
          <el-form-item label="项目名称">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        <!-- </el-col> -->

        <el-form-item label="开始时间">
        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
          </el-form-item>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList();">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="showCreateCompany();">新增公司</el-button>
            <el-button type="primary" size="medium" v-on:click="editDetails(0);">新增项目</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-dialog title="新增公司" :visible.sync="dialogFormVisible">
      <el-form :model="newCompany">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="newCompany.name"></el-input>
        </el-form-item>
        <el-form-item label="父公司" :label-width="formLabelWidth">
          <el-select v-model="newCompany.parentId" placeholder="添加父公司">
            <el-option v-for="(item,index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCompany()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="listCont">
      <el-table :data="projectList" border size="medium">
        <el-table-column align="center" prop="projectId" label="序号"></el-table-column>
        <el-table-column align="center" prop="areaName" label="区域">
        </el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="projectAuditName" label="运营负责人"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="当前状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.state">启用</el-button>
            <el-button disabled  size="small" type="danger" v-if="!scope.row.state">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.projectId)">查看</el-button>
            <el-button type="text" v-on:click="editDetails(scope.row.projectId)">编辑</el-button>
            <el-button type="text" v-if="scope.row.status == 'DISABLED'" v-on:click="showDetails(scope.row)">启用</el-button>
            <el-button type="text" v-on:click="deleteProject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.countSize">
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
    options:[
      {
        name: '全部',
        // id: '0'
      }
    ],
    searchForm: {
      // areaId: null,
      // projectName: null,
      // createTimeBegin: null,
      // createTimeEnd:null
    },
    infoData: {},
    projectList:[],
    page: 1,
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
    newCompany: {},
    formLabelWidth: '120px',
    companyList: []
  }),
  created () {
    window.$getAreaList().then((res) => {
        this.options.push.apply(this.options, res)
      }, (err) => {
        console.log(err)
      })
    this.searchList()
  },

  methods: {
    showCreateCompany(){
      this.dialogFormVisible = true
      window.$getCompanyAll().then((res) => {
        this.companyList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    createCompany(){
      if(this.checkCompanyInfo()){
        window.$createCompany(this.newCompany).then((res) => {
          this.$message('新增成功');
          this.dialogFormVisible = false
        }, (err) => {
          this.$message(err);
        })
      }
    },
    changeArea() {
      console.log('select状态改变 ')
    },
    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.searchList()
    },
    searchList () {
    window.$getProjectList(this.page, this.size, this.searchForm)
      .then((res) => {
        this.data = res
        this.projectList = this.data.resultList
      }, (err) => {
        console.log(err)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/projec/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/projec/add/' + id)
    },
    checkCompanyInfo(){
      console.log(this.newCompany.name)
      if(!this.newCompany.name || this.newCompany.name == ''){
        this.$message('请输入公司名称');
        return false
      } else {
        return true
      }
    },
    deleteProject(project){
      window.$deleteProject(project.projectId).then((res) => {
        this.projectList.splice(project, 1)
      }, (err) => {
        this.showAlert(err)
      })
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
