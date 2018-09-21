<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">三角理论</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼栋">
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层">
            <el-select size="small" v-model="floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.businessFormId" placeholder="请选择业态"  @change="businessChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业种">
            <el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌">
            <el-select size="small" v-model="searchForm.brandId" placeholder="请选择品牌">
              <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="铺位">
            <el-input size="small" maxlength="11" v-model="searchForm.name" placeholder="请输入铺位"/>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <!--<el-button type="primary" class="ml10" size="medium" v-on:click="qianyue(0);">签约</el-button>-->
    </div>

    <p class="t"></p>
    <div class="biaoti1">三角理论列表</div>
    <div class="listCont">
    <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
    <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
    <el-table-column align="center" prop="" label="溢租率"></el-table-column>
    <el-table-column align="center" prop="" label="客销度"></el-table-column>
    <el-table-column align="center" prop="" label="适配值"></el-table-column>
    <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
    <el-table-column align="center" prop="projectName" label="项目"></el-table-column>
    <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
    <el-table-column align="center" prop="" label="业态"></el-table-column>
    <el-table-column align="center" prop="" label="业种"></el-table-column>
    <el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>
    <el-table-column align="center" prop="roomName" label="铺位名称"></el-table-column>
    </el-table>
    </div>
    <!--<div class="listCont">-->
      <!--<el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">-->
        <!--<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>-->
        <!--<el-table-column align="center" prop="areaName" label="区域"></el-table-column>-->
        <!--<el-table-column align="center" prop="projectName" label="项目"></el-table-column>-->
        <!--<el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>-->
        <!--<el-table-column align="center" prop="floorName" label="楼层"></el-table-column>-->
        <!--<el-table-column align="center" prop="roomName" label="铺位名称"></el-table-column>-->
        <!--<el-table-column align="center" prop="businessFormName" label="业态"></el-table-column>-->
        <!--<el-table-column align="center" prop="businessSpeciesName" label="业种"></el-table-column>-->
        <!--<el-table-column align="center" prop="acreage" label="面积"></el-table-column>-->
        <!--<el-table-column align="center" prop="status" label="状态">-->
          <!--<template slot-scope="scope">-->
            <!--<p class="using" v-if="scope.row.state">已签约</p>-->
            <!--<p class="unusing" type="danger" v-if="!scope.row.state">已解约</p>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->
        <!--<el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>-->
        <!--<el-table-column align="center"  label="操作" width="100">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" v-on:click="breakContract(scope.row.id)" v-if="scope.row.state">解约</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->

      <!--<div class="paginationCont">-->
        <!--<el-pagination-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="page"-->
          <!--layout="prev, pager, next"-->
          <!--:total="data.countSize">-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</div>-->


  </div>
  <!--<div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">-->
    <!--<el-row class="searchBox" :gutter="30">-->
      <!--<h3 id="title">三角理论</h3><br>-->
      <!--<el-form label-width="100px" :model="searchForm">-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label="区域">-->
            <!--<el-select size="small" v-model="areaId" placeholder="请选择区域" @change="areaChanged()">-->
              <!--<el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="5">-->
          <!--<el-form-item label="项目">-->
            <!--<el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">-->
              <!--<el-option v-for="(item,index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="5">-->
          <!--<el-form-item label="楼栋">-->
            <!--<el-select size="small" v-model="buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
              <!--<el-option v-for="(item,index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="5">-->
          <!--<el-form-item label="楼层">-->
            <!--<el-select size="small" v-model="searchForm.floorId" placeholder="请选择楼层" @change="getProjectList()">-->
              <!--<el-option v-for="(item,index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="5">-->
          <!--<el-form-item label="业态">-->
            <!--<el-select size="small" v-model="searchForm.conditionId" placeholder="请选择业态" @change="getProjectList()">-->
              <!--<el-option v-for="(item,index) in conditionList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="5">-->
          <!--<el-form-item label="业种">-->
            <!--<el-select size="small" v-model="searchForm.majoId" placeholder="请选择业种" @change="getProjectList()">-->
              <!--<el-option v-for="(item,index) in majoList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="5">-->
          <!--<el-form-item label="铺位">-->
            <!--<el-select size="small" v-model="searchForm.roomId" placeholder="请选择铺位" @change="getProjectList()">-->
              <!--<el-option v-for="(item,index) in roomList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="5">-->
          <!--<el-form-item label="品牌">-->
            <!--<el-select size="small" v-model="searchForm.brandId" placeholder="请选择品牌" @click="brandAtClick()" @change="getProjectList()">-->
              <!--<el-option v-for="(item,index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-form>-->
    <!--</el-row>-->

    <!--<div class="buttonList">-->
      <!--<el-button type="primary" class="ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>-->
    <!--</div>-->


    <!--<p class="t"></p>-->
    <!--<div class="biaoti1">三角理论列表</div>-->
    <!--<div class="listCont">-->
      <!--<el-table :data="data.list" border size="medium" :header-cell-style="rowClass">-->
        <!--<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>-->
        <!--<el-table-column align="center" prop="projectName" label="溢租率"></el-table-column>-->
        <!--<el-table-column align="center" prop="area" label="客销度"></el-table-column>-->
        <!--<el-table-column align="center" prop="company" label="适配值"></el-table-column>-->
        <!--<el-table-column align="center" prop="projectleader" label="区域"></el-table-column>-->
        <!--<el-table-column align="center" prop="operationleader" label="项目"></el-table-column>-->
        <!--<el-table-column align="center" prop="phone" label="楼层"></el-table-column>-->
        <!--<el-table-column align="center" prop="startTime" label="业态"></el-table-column>-->
        <!--<el-table-column align="center" prop="operationleader" label="品牌名称"></el-table-column>-->
        <!--<el-table-column align="center" prop="phone" label="铺位名称"></el-table-column>-->
      <!--</el-table>-->
      <!--</div>-->
    <!--</div>-->

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
    floorList: [],
    floorId:'',
    brandId:'',

    effectTime:'',
    dialogFormVisible: false,
    sendData: {},
    currentTime: '',
    selectTime: '',

  }),
  // data: () => ({
  //   areaId:'',
  //   areaList:{},
  //   projectList:{},
  //   buildingList:{},
  //   buildingId:'',
  //   floorList:{},
  //   conditionList:{},
  //   majoList:{},
  //   roomList:{},
  //   brandList:{},
  //   data: {},
  //   loading: false,
  //   searchForm: {},
  //   infoData: {},
  //   page:1,
  //   size: 10,
  //   dialogFormVisible: false,
  //   dialogVisible: false,
  //   pictureList: [],
  //   picIndex: 0
  // }),
  // created () {
  //   window.$getAreaList().then((res) => {
  //     this.areaList = res
  //   }, (err) => {this.showAlert(err)})
  // },
  created () {


    window.$getformSelect().then((res) => {
      this.businessList = res
    }, (err) => {})

    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {})
    this.searchList(1)
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
    searchList (type) {
      this.searchForm.brandId = this.brandId
      this.searchForm.floorId = this.floorId

      if(type === 1){
        this.page = 1
      }
      window.$getBrandAllList(this.page, this.size, this.searchForm).then((res) => {
        this.data = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    businessChanged(){
      this.searchForm.businessSpeciesId = ''
      this.brandId = ''
      window.$getSpeciesSelect(this.searchForm.businessFormId).then((res) => {
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })

    },
    speciesChanged(){
      this.brandId = ''
      window.$getBrandForSpecies(this.searchForm.businessSpeciesId).then((res) => {
        this.brandList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    areaChanged(){
      this.searchForm.projectId = ''
      this.searchForm.buildingId = ''
      this.floorId = ''
      window.$getProjectListForArea(this.searchForm.areaId).then((res) => {
        this.projectList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    projectChanged(){
      this.searchForm.buildingId = ''
      this.floorId = ''
      window.$getBuilding(this.searchForm.projectId).then((res) => {
        this.buildingList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    buildingChanged(){
      this.floorId = ''
      window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {
        this.floorList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
//     areaChanged(){
//       this.searchForm = {}
//       window.$getProjectListForArea(this.areaId).then((res) => {
//         this.projectList = res
//       }, (err) => {
//         this.showAlert(err)
//       })
//     },
//     projectChanged(){
//       window.$getBuilding(this.searchForm.projectId).then((res) => {
//         this.buildingList = res
//       }, (err) => {this.showAlert(err)})
//
//       window.$getBusinessListForProject(this.searchForm.projectId).then((res) => {
//         this.conditionList = res
//       }, (err) => {this.showAlert(err)})
//     },
//     buildingChanged(){
//       window.$getFloorForBuilding(this.buildingId).then((res) => {
//         this.floorList = res
//       }, (err) => {this.showAlert(err)})
//     },
//     conditionChanged(){
//       window.$getSpeciesSelect(this.searchForm.conditionId).then((res) => {
//         this.majoList = res
//       }, (err) => {this.showAlert(err)})
//     },
//     brandAtClick(){
//       var params = {
//         projectId: searchForm.projectId,
//         floorId: searchForm.floorId,
//         businessFormId: searchForm.conditionId
//       }
//       this.$axios.post('/pctriangle/find/Conditionlist/project', params).then((res) => {
//         this.brandList = res
//       }, (err) => {this.showAlert(err)})
//     },
//     handleSizeChange (val) {
//       this.size = val
//       this.searchList(1)
//     },
//     handleCurrentChange (val) {
//       this.page = val
//       // this.searchList(1)
//     },
//     searchList (type) {
//       if(type === 1){
//         this.page = 1
//       }
// console.log(this.page);
//       this.$axios.post('/pctriangle/find/findTriangle/byCQRS?p=' + this.page + '&c=' + this.size, this.searchForm).then((res) => {
//         this.loading = false
//         this.data = res
//       }).catch(function (eMsg) {
//         this.loading = false
//         this.showAlert(eMsg)
//       })
//     },
//     // 查看详情
//     showDetails (id) {
//       this.$router.push('/projecManage/details/' + id)
//     },
//     editDetails (id) {
//       this.$router.push('/projecManage/edit/' + id)
//     },
    rowClass({ row, rowIndex}) {
      //console.log(rowIndex) //表头行标号为0
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
  .tabs{
    width: 100%;
    height:50px;
    background: #e7cb8a !important;
    margin-bottom: 5px;
    div{
      display: inline-block;
    }
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
