<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="getProjectList()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="公司">
            <el-select size="small" v-model="searchForm.companyId" placeholder="请选择公司">
              <el-option v-for="(item, index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="铺位名称">
            <el-input size="small" v-model="searchForm.roomName" :maxlength="30" placeholder="请输入铺位名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.state" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="开始时间">
            <el-date-picker
              size="small"
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd"
              v-model="searchForm.createTimeBegin"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="至 " label-width="40px">
            <el-date-picker
              size="small"
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd"
              v-model="searchForm.createTimeEnd"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList();">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="showDetails(0);">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>

    </el-row>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
        <!--<el-table-column align="center" prop="company" label="公司"></el-table-column>-->
        <el-table-column align="center" prop="projectName" label="所属项目"></el-table-column>
        <el-table-column align="center" prop="buildingName" label="楼栋"></el-table-column>
        <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
        <el-table-column align="center" prop="name" label="铺位"></el-table-column>
        <el-table-column align="center" prop="acreage" label="面积/平"></el-table-column>
        <el-table-column align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.state === 1">启用</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.state === 2">禁用</el-button>
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
export default {
  data: () => ({
    data: {},
    loading: false,
    searchForm: {},
    areaList:[],
    companyList: [],
    projectList: [],
    page: 1,
    size: 10
  }),
  created () {
    this.searchList()
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
    getProjectList(){
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
    searchList () {
      this.loading = true
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
    showAlert: function (cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>
<style scoped  lang="less">
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
