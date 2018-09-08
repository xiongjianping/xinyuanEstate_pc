<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中" >
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">业态指令</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select size="small" v-model="area" placeholder="请选择区域" @change="changeArea()">
              <el-option v-for="(item, index) in allArea" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目">
            <el-select size="small" v-model="projectId" placeholder="请选择项目" @change="changeProject()">
              <el-option v-for="(item, index) in allProject" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.fromId" placeholder="请选择业态">
              <el-option v-for="(item, index) in allForm" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业务类型">
            <el-select size="small" v-model="searchForm.helpType" placeholder="请选择业务类型">
              <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <el-button type="primary" class="ml10" size="medium" v-on:click="xinzeng();">新增</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">业态指令列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="businessFormName" label="业态名称"></el-table-column>
        <el-table-column align="center" prop="helpType" label="业务类型">
          <template slot-scope="scope">
            <el-button disabled type="text" size="small" v-if="scope.row.helpType === 1">溢租率</el-button>
            <el-button disabled type="text" size="small" v-if="scope.row.helpType === 2">客销度</el-button>
            <el-button disabled type="text" size="small" v-if="scope.row.helpType === 3">适配值</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="yx" label="优秀"></el-table-column>
        <el-table-column align="center" prop="lh" label="良好"></el-table-column>
        <el-table-column align="center" prop="ts" label="提升"></el-table-column>
        <el-table-column align="center" prop="hl" label="合理"></el-table-column>
        <el-table-column align="center" prop="ks" label="亏损"></el-table-column>
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
    area: '',
    data:{},
    building: '',
    loading: false,
    searchForm: {
      fromId:'',
      helpType:''
    },
    page: 1,
    size: 10,
    allArea: {},
    allProject: {},
    allForm:{},
    businessTypeList:window.$businessTypeList,
    projectId:''
  }),
  created () {
    window.$getAreaList().then((res) => {
        this.allArea = res;
      }, (err) => {
        this.showAlert(err)
      })
    // this.searchList()
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.searchList()
    },
    searchList(type) {

      if(type === 1){
        this.page = 1
      }

      this.searchForm.areaId = this.area
      this.searchForm.projectId = this.projectId
      window.$helpFourmContent(this.page, this.size, this.searchForm).then((res) => {
        this.data = res;
      }, (err) => {
        this.showAlert(err)
      })
    },
    changeArea() {
      this.projectId = ''
      this.searchForm.fromId = ''
      window.$helpSearchproject(this.area).then((res) => {
        this.allProject = res
      }, (err) => {})
    },
    changeProject(){
      this.searchForm.fromId = ''
      window.$getBusinessListForProject(this.projectId).then(res => {
        this.allForm = res
      }, err => {

      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
    },
    xinzeng(){
      this.$router.push("/evaluationTpl/yetaizhiling/xinzeng")
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
.el-table .cell {
  white-space: pre-line;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
