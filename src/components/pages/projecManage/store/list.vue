<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">铺位管理</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="getProjectList()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="公司">
            <el-select size="small" v-model="searchForm.companyId" placeholder="请选择公司">
              <el-option v-for="(item, index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目">
            <el-select size="small" v-model="projectId" placeholder="请选择项目">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="铺位">
            <el-input size="small" v-model="searchForm.roomName" :maxlength="30" placeholder="请输入铺位名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.state" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
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
      <el-button type="primary" class="ml10" size="medium" v-on:click="showDetails(0);">新增</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">铺位管理列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column type="index" align="center" width="50" label="序号" :index="indexMethod"></el-table-column>
        <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
        <!--<el-table-column align="center" prop="company" label="公司"></el-table-column>-->
        <el-table-column align="center" prop="projectName" label="所属项目"></el-table-column>
        <el-table-column align="center" prop="buildingName" label="楼栋"></el-table-column>
        <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
        <el-table-column align="center" prop="name" label="铺位"></el-table-column>
        <el-table-column align="center" prop="acreage" label="面积/平"></el-table-column>
        <el-table-column align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <p class="using" v-if="scope.row.state === 1">未签约</p>
            <p class="unusing" v-if="scope.row.state === 2">禁用</p>
            <p class="ongoing" v-if="scope.row.state === 3">已签约</p>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="xiangqing(scope.row.id)">查看</el-button>
            <el-button type="text" v-on:click="bianji(scope.row.id)">编辑</el-button>
            <!-- <el-button type="text" v-on:click="deleteStore(scope.row)">删除</el-button> -->
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
export default {
  data: () => ({
    data: {},
    loading: false,
    projectId:'',
    searchForm: {},
    areaList:[],
    companyList: [],
    projectList: [],
    page: 1,
    size: 10,
    value6: []
  }),
  created () {
    this.searchList(1)
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {
      this.showAlert(err)
    })
    window.$getCompanyAll().then((res) => {
      this.companyList = res
    }, (err) => {
      this.showAlert(err)
    })
  },

  methods: {
    indexMethod(index) {
      return (this.page-1)*10+index + 1;
    },
    getProjectList(){
      this.projectId = ''
      window.$getProjectListForArea(this.searchForm.areaId).then((res) => {
        this.projectList = res
      }, (err) => {
        this.showAlert(err)
      })
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
      this.loading = true
      this.searchForm.projectId = this.projectId
      this.searchForm.createTimeBegin = this.value6[0]
      this.searchForm.createTimeEnd = this.value6[1]

      if(type === 1){
        this.page = 1
      }

      window.$getStoreList(this.page, this.size, this.searchForm)
      .then((res) => {
        this.loading = false
        this.data = res
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    deleteStore (id) {
      this.$router.push('/projecManage/store/add/' + id)
    },
    bianji(id){
      this.$router.push('/projecManage/store/details/' + id)
    },
    //详情
    xiangqing(id){
      this.$router.push('/projecManage/store/xiangqing/' + id)
    },
    showDetails(id){
      this.$router.push('/projecManage/store/add/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:50px;font-size:15px'
    },
    showAlert(cont) {
        this.$alert(cont, '温馨提示', {
          confirmButtonText: '确定'
        })
      }
  }
}
</script>
<style scoped  lang="less">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
