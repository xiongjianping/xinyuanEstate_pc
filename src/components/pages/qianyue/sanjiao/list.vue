<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select size="small" v-model="areaId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item,index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼栋">
            <el-select size="small" v-model="buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item,index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼层">
            <el-select size="small" v-model="searchForm.floorId" placeholder="请选择楼层" @change="getProjectList()">
              <el-option v-for="(item,index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.conditionId" placeholder="请选择业态" @change="getProjectList()">
              <el-option v-for="(item,index) in conditionList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业种">
            <el-select size="small" v-model="searchForm.majoId" placeholder="请选择业种" @change="getProjectList()">
              <el-option v-for="(item,index) in majoList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="铺位">
            <el-select size="small" v-model="searchForm.roomId" placeholder="请选择铺位" @change="getProjectList()">
              <el-option v-for="(item,index) in roomList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="品牌">
            <el-select size="small" v-model="searchForm.brandId" placeholder="请选择品牌" @click="brandAtClick()" @change="getProjectList()">
              <el-option v-for="(item,index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="listCont">
      <el-table :data="data.list" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="溢租率"></el-table-column>
        <el-table-column align="center" prop="area" label="客销度"></el-table-column>
        <el-table-column align="center" prop="company" label="适配值"></el-table-column>
        <el-table-column align="center" prop="projectleader" label="区域"></el-table-column>
        <el-table-column align="center" prop="operationleader" label="项目"></el-table-column>
        <el-table-column align="center" prop="phone" label="楼层"></el-table-column>
        <el-table-column align="center" prop="startTime" label="业态"></el-table-column>
        <el-table-column align="center" prop="operationleader" label="品牌名称"></el-table-column>
        <el-table-column align="center" prop="phone" label="铺位名称"></el-table-column>
      </el-table>
      </div>
    </div>

</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    areaId:'',
    areaList:{},
    projectList:{},
    buildingList:{},
    buildingId:'',
    floorList:{},
    conditionList:{},
    majoList:{},
    roomList:{},
    brandList:{},
    data: {},
    loading: false,
    searchForm: {},
    infoData: {},
    page:1,
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0
  }),
  created () {
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {this.showAlert(err)})
  },
  methods: {
    areaChanged(){
      this.searchForm = {}
      window.$getProjectListForArea(this.areaId).then((res) => {
        this.projectList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    projectChanged(){
      window.$getBuilding(this.searchForm.projectId).then((res) => {
        this.buildingList = res
      }, (err) => {this.showAlert(err)})

      window.$getBusinessListForProject(this.searchForm.projectId).then((res) => {
        this.conditionList = res
      }, (err) => {this.showAlert(err)})
    },
    buildingChanged(){
      window.$getFloorForBuilding(this.buildingId).then((res) => {
        this.floorList = res
      }, (err) => {this.showAlert(err)})
    },
    conditionChanged(){
      window.$getSpeciesSelect(this.searchForm.conditionId).then((res) => {
        this.majoList = res
      }, (err) => {this.showAlert(err)})
    },
    brandAtClick(){
      var params = {
        projectId: searchForm.projectId,
        floorId: searchForm.floorId,
        businessFormId: searchForm.conditionId
      }
      this.$axios.post('/pctriangle/find/Conditionlist/project', params).then((res) => {
        this.brandList = res
      }, (err) => {this.showAlert(err)})
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
      that.$axios.post('/pctriangle/find/findTriangle/byCQRS?p=' + this.page + '&c=' + this.size, searchForm).then((res) => {
        that.loading = false
        that.data = res
      }).catch(function (eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:20px;font-size:15px'
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
  .tabs{
    width: 100%;
    height:50px;
    background: #e7cb8a !important;
    margin-bottom: 5px;
    div{
      display: inline-block;
    }
  }
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
