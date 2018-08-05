<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">

        <el-col :span="5">
          <el-form-item label="业务类型">
            <el-select v-model="businessId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="维度" v-if="businessId === 2" >
            <el-select v-model="different" placeholder="请选择维度">
              <el-option v-for="(item, index) in dimensionList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="区域">
            <el-select v-model="areaId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目">
            <el-select v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="5">
          <el-form-item label="楼栋" v-if="different === 2">
            <el-select v-model="buildingId" placeholder="请选择项目" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼层" v-if="different === 2">
            <el-select v-model="searchForm.floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

        <el-col :span="5">
          <el-form-item label="业态" v-if="different === 3">
            <el-select v-model="searchForm.conditionId" placeholder="请选择业态">
              <el-option v-for="(item, index) in bList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList();">搜索</el-button>
            <el-button id="fileUpload_button" type="primary" size="medium" v-on:click="importFile()">导入</el-button>
            <input id="fileUpload_input" class="uploadInput" type="file" @change="fileUpload" />
            <el-button type="primary" size="medium" v-on:click="exportExl()">导出</el-button>
            <!-- <el-button type="primary" size="medium" v-on:click="kxxz(1);">客销度新增</el-button>
            <el-button type="primary" size="medium" v-on:click="yzl(1);">溢租率新增</el-button> -->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- <el-radio-group v-model="tabPosition" style="margin-top: 50px;margin-bottom:-25px;margin-left: 30px">
      <el-radio-button label="top">溢租率</el-radio-button>
      <el-radio-button label="right">客销度</el-radio-button>
      <el-radio-button label="bottom">适配值</el-radio-button>
    </el-radio-group> -->

    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="conditionName" label="业态"></el-table-column>
        <el-table-column align="center" prop="majoName" label="业种"></el-table-column>
        <el-table-column align="center" prop="yx" label="优秀"></el-table-column>
        <el-table-column align="center" prop="lh" label="良好"></el-table-column>
        <el-table-column align="center" prop="ts" label="提升"></el-table-column>
        <el-table-column align="center" prop="hl" label="合格"></el-table-column>
        <el-table-column align="center" prop="ks" label="亏损"></el-table-column>
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
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
          :total="data.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    different:'',
    dimensionList: window.$dimensionList,
    businessId:2,
    businessList:[{name: '客销度', id:2}],
    areaId:'',
    areaList:{},
    projectList:{},
    buildingList:{},
    buildingId:'',
    floorList:{},
    bList:{},
    sList:{},
    data: {},
    loading: false,
    searchForm: {
      area: '',
      company: '',
      startTime: null
    },
    infoData: {},
    page: 1,
    size: 10,
  }),
  created () {
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {console.log(err)})
  },
  methods: {
    importFile(){
      document.getElementById('fileUpload_input').click()
    },
    areaChanged(){
      window.$getProjectListForArea(this.areaId).then((res) => {
        this.projectList = res
      }, (err) => {this.showAlert(err)})
    },
    projectChanged(){
      if(this.different === 2){
        window.$getBuilding(this.searchForm.projectId).then((res) => {
          this.buildingList = res
        }, (err) => {
          this.showAlert(err)
        })
      } else if(this.different === 3){
        window.$getBusinessListForProject(this.searchForm.projectId).then((res) => {
          this.bList = res
        }, (err) => {this.showAlert(err)})
      }
    },
    buildingChanged(){
      window.$getFloorForBuilding(this.buildingId).then(res =>{
        this.floorList = res
      }, err => {
        this.showAlert(err)
      })
    },
    fileUpload(e){
      // if(!this.businessId){
      //   this.showAlert('请选择业务类型')
      //   return false
      // }

      let url = this.businessId === 1 ? '' : (this.businessId === 2 ? '/intervalimportexcel/excel/intervalguestimport/sheet' : '')
      window.$fileUpload(e, url).then((res) => {
        this.showAlert('导入成功')
        this.page = 1
        this.size = 10
        this.searchList()
      }, (err) =>{this.showAlert(err)})
    },
    exportExl(){
      // if(!this.businessId){
      //   this.showAlert('请选择业务类型')
      //   return false
      // }
      if(!this.searchForm.projectId){
        this.showAlert('请选择项目')
        return false
      }
      let url = this.businessId === 1 ? '' : (this.businessId === 2 ? '/standardexport/excel/qjszkxd' : '')
      window.$exportExls(url, this.searchForm.projectId).then((res) => {
        console.log(res)
        let link = document.createElement('a')
        link.href = res
        link.click()
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
    searchList(){
      this.$axios.post('/conditionguestinterval/find/conditionguestinterval/list?p=' + this.page + '&c=' + this.size, this.searchForm).then((res) => {
        this.data = res
      }).catch(function (eMsg) {
        this.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataManage/trigonometric/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/trigonometric/edit/' + id)
    },
    kxxz (id) {
      this.$router.push('/dataManage/trigonometric/kx-xinzeng/' + id)
    },
    yzl (id) {
      this.$router.push('/dataManage/trigonometric/yz-xinzeng/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:20px;font-size:15px'
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
  .uploadInput{
    top:0px;
    width: 0;
    height: 100%;
    visibility: hidden;
  }

</style>
