<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">项目管理</h3><br>
      <el-form label-width="100px" :model ="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域">
              <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="时间">
              <el-date-picker size="small" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <!--<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="showCreateCompany();">新增公司</el-button>-->
      <el-button type="primary" class="ml10" size="medium" v-on:click="editDetails(0);">新增项目</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">项目管理列表</div>
    <el-dialog title="新增公司" :visible.sync="dialogFormVisible">
      <el-form :model="newCompany">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="newCompany.name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="父公司" :label-width="formLabelWidth">
          <el-select v-model="newCompany.parentId" placeholder="添加父公司">
            <el-option v-for="(item,index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="createCompany()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="listCont">
      <el-table :data="projectList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="areaName" label="区域">
        </el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <!--<el-table-column align="center" prop="projectHeadName" label="运营负责人"></el-table-column>-->
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="当前状态">
          <template slot-scope="scope">
            <p class="using" v-if="scope.row.state">启用</p>
            <p class="unusing" v-if="!scope.row.state">禁用</p>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.projectId)">查看</el-button>
            <el-button type="text" v-on:click="bianji(scope.row.projectId)">编辑</el-button>
            <!-- <el-button type="text" v-on:click="deleteProject(scope.row.projectId)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="prev, pager, next"
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
      shortcuts: [
        {
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      },
        {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      },
        {
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
      }
    ],
    searchForm: {
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
    this.searchList(1)
  },

  methods: {
    showCreateCompany(){
      this.newCompany = {}
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
          this.showAlert('新增成功');
          this.dialogFormVisible = false
        }, (err) => {
          this.showAlert(err);
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
    searchList (type) {
      if(this.value6){
          this.searchForm.createTimeBegin = this.value6[0]
          this.searchForm.createTimeEnd = this.value6[1]
      }

      if(type === 1){
        this.page = 1
      }

      window.$getProjectList(this.page, this.size, this.searchForm)
        .then((res) => {
          console.log(res)
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
    //新增项目
    editDetails (id) {
      this.$router.push('/projecManage/projec/add/' + id)
    },
    //编辑
    bianji(id){
      this.$router.push('/projecManage/projec/bianji/' + id)
    },
    checkCompanyInfo(){
      console.log(this.newCompany.name)
      if(!this.newCompany.name || this.newCompany.name == ''){
        this.showAlert("请输入公司名称");
        this.$message('请输入公司名称');
        return false
      } else {
        return true
      }
    },
    deleteProject(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.loading = true
      window.$deleteProject(id).then((res) => {
        for(var i = this.projectList.length - 1; i >= 0; i--){
          if(this.projectList[i].projectId === id){
            this.projectList.splice(i, 1)
            this.loading = false
            return false
          }
        }
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
      }).catch(() => {

      })
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:50px;font-size:15px'
    },
    showAlert (cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  },
}

</script>
<style scoped  lang="less">
.dd{
  width: 100%;
  height:50px;
  background: #e7cb8a;
  margin-bottom: 5px;
}
</style>
