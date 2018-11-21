<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中" >
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">楼层指令</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="changeArea()">
              <el-option v-for="(item, index) in allArea" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="5">
          <el-form-item label="项目">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="changeProject()">
              <el-option v-for="(item, index) in allProject" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼栋">
            <el-select size="small" v-model="building" placeholder="请选择楼栋" @change="changeBuilding()">
              <el-option v-for="(item, index) in allBuilding" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼层">
            <el-select size="small" v-model="floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in allFloor" :key="index" :label="item.name" :value="item.id"></el-option>
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
      <el-button type="primary" class="ml10" size="medium" v-on:click="xinzeng(1);">新增</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">楼层指令列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column type="index" align="center" width="50" label="序号" :index="indexMethod"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="floorName" label="楼层名称"></el-table-column>
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
      <div class="paginationCont" v-if="data.countSize">
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
    floorId:'',
    data:{},
    building: '',
    loading: false,
    searchForm: {},
    page: 1,
    size: 10,
    allArea: {},
    allProject: {},
    allBuilding: {},
    allFloor: {},
    businessTypeList:window.$businessTypeList,
  }),
  created () {
    window.$getAreaList().then((res) => {
        this.allArea = res;
      }, (err) => {
        this.showAlert(err)
      })
    // this.searchList(1)
  },
  methods: {
    indexMethod(index) {
      return (this.page-1)*10+index + 1;
    },
    handleCurrentChange(){
      this.page = 1
      this.searchList()
    },
    searchList(type) {
      if(type === 1){
        this.page = 1
      }

      this.searchForm.floorId = this.floorId
      window.$helpFloorContent(this.page, this.size, this.searchForm).then((res) => {
        this.data = res;
      }, (err) => {
        this.showAlert(err)
      })
    },
    changeArea() {
      this.searchForm.projectId = ''
      this.building = ''
      this.floorId = ''
      window.$helpSearchproject(this.searchForm.areaId).then((res) => {
        this.allProject = res;
      }, (err) => {})
    },
    changeProject(){
      this.building = ''
      this.floorId = ''
      window.$getBuilding(this.searchForm.projectId).then((res) => {
        this.allBuilding = res;
      }, (err) => {})
    },
    changeBuilding(){
      this.floorId = ''
      window.$getFloorForBuilding(this.building).then((res) => {
        this.allFloor = res;
      }, (err) => {})
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/evaluationTpl/evaluation/' + id)
    },
    editDetails (id) {
      this.$router.push('/evaluationTpl/evaluation/' + id)
    },
    xinzeng(id){
      this.$router.push("/evaluationTpl/evaluation/xinzeng/"+id)
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
.el-table .cell {
  white-space: pre-line;
}
</style>
