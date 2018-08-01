<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域：">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目：">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼栋：">
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层：">
            <el-select size="small" v-model="searchForm.floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态：">
            <el-select size="small" v-model="searchForm.businessFormId" placeholder="请选择业态"  @change="businessChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业种：">
            <el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌：">
            <el-select size="small" v-model="searchForm.brandId" placeholder="请选择品牌">
              <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="铺位：">
            <el-input size="small" maxlength="11" v-model="searchForm.name" placeholder="请输入铺位"/>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList();">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="qianyue(0);">签约</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目"></el-table-column>
        <el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>
        <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
        <el-table-column align="center" prop="roomName" label="铺位名称"></el-table-column>
        <el-table-column align="center" prop="businessFormName" label="业态"></el-table-column>
        <el-table-column align="left" prop="businessSpeciesName" label="业种"></el-table-column>
        <el-table-column align="center" prop="acreage" label="面积"></el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.state">已签约</el-button>
            <el-button disabled  size="small" type="danger" v-if="!scope.row.state">已解约</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="breakContract(scope.row.id)" v-if="scope.row.state">解约</el-button>
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
    page: 1,
    size: 10,
    businessList: [],
    speciesList: [],
    brandList:[],
    areaList: [],
    projectList: [],
    buildingList: [],
    floorList: []
  }),
  created () {
    window.$getformSelect().then((res) => {
        this.businessList = res
      }, (err) => {})

      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {})
    this.searchList()
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
    searchList () {
      window.$getBrandAllList(this.page, this.size, this.searchForm).then((res) => {
        console.log(res)
        this.data = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    businessChanged(){
      window.$getSpeciesSelect(this.searchForm.businessFormId).then((res) => {
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })

    },
    speciesChanged(){
      window.$getBrandForSpecies(this.searchForm.businessSpeciesId).then((res) => {
        this.brandList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    areaChanged(){
      window.$getProjectListForArea(this.searchForm.areaId).then((res) => {
        this.projectList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    projectChanged(){
      window.$getBuilding(this.searchForm.projectId).then((res) => {
        this.buildingList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    buildingChanged(){
      window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {
        this.floorList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    breakContract(id){
      window.$breakContract(id).then((res) => {
        this.searchList()
      }, (err) => {
        this.showAlert(err)
      })
    },
    //签约
    qianyue(id) {
      this.$router.push('/qianyue/qianyue/add/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:20px;font-size:15px'
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
    height: 120%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
