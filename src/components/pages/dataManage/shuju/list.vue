<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select v-model="areaId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目">
            <el-select v-model="searchForm.projectId" placeholder="请选择项目">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="listCont">
      <div class="detailsContent">
        <h3 class="title">每日导入</h3>
        <i></i>
        <el-row class="detailsInfo" :gutter="30">
          <el-col :span="16" :offset="1">
            <div class="leftText">
            客流、销售导入：
            </div>
            <a class="rightText">动态三角形_客销度导入.xlsx</a>
            <el-button class="importButton" type="primary" size="medium" v-on:click="importFile(1);">导入</el-button>
            <el-button class="exportButton" type="primary" size="medium" v-on:click="exportFile(1);">导出</el-button>
          </el-col> <br/>
          <!-- <el-checkbox v-model="checked">选择导入导出</el-checkbox><br> -->
          <el-col :span="16" :offset="1">
            <div class="leftText">
            毛利率、客单价导入：
            </div>
            <a class="rightText">标准三角形_客销度导入.xlsx</a>
            <el-button class="importButton" type="primary" size="medium" v-on:click="importFile(2);">导入</el-button>
            <el-button class="exportButton" type="primary" size="medium" v-on:click="exportFile(2);">导出</el-button>
          </el-col>
        </el-row>

        <h3 class="title">每月导入</h3>
        <i></i>
        <el-row class="detailsInfo" :gutter="30">
          <el-col :span="16" :offset="1">
            <div class="leftText">
            固定成本导入：
            </div>
            <a class="rightText">动态三角形_溢租率导入.xlsx</a>
            <el-button class="importButton" type="primary" size="medium" v-on:click="importFile(3);">导入</el-button>
            <el-button class="exportButton" type="primary" size="medium" v-on:click="exportFile(3);">导出</el-button>
          </el-col>
        </el-row>

        <h3 class="title">每季导入</h3>
        <i></i>
        <el-row class="detailsInfo" :gutter="30">
          <el-col :span="16" :offset="1">
            <div class="leftText">
            适配值导入：
            </div>
            <a class="rightText">动态三角形_适配值导入.xlsx</a>
            <el-button class="importButton" type="primary" size="medium" v-on:click="importFile(4);">导入</el-button>
            <el-button class="exportButton" type="primary" size="medium" v-on:click="exportFile(4);">导出</el-button>
          </el-col>
        </el-row>

        <h3 class="title">其他导入</h3>
        <i></i>
        <el-row class="detailsInfo" :gutter="30">
          <el-col :span="16" :offset="1">
            <div class="leftText">
            客销度区间导入：
            </div>
            <a class="rightText">区间设置_客销度导入.xlsx</a>
            <el-button class="importButton" type="primary" size="medium" v-on:click="importFile(5);">导入</el-button>
            <el-button class="exportButton" type="primary" size="medium" v-on:click="exportFile(5);">导出</el-button>
          </el-col> <br/>
          <el-col :span="16" :offset="1">
            <div class="leftText">
            标准三角形适配值导入：
            </div>
            <a class="rightText">标准三角形_适配值导入.xlsx</a>
            <el-button class="importButton" type="primary" size="medium" v-on:click="importFile(6);">导入</el-button>
            <el-button class="exportButton" type="primary" size="medium" v-on:click="exportFile(6);">导出</el-button>
          </el-col> <br/>
          <el-col :span="16" :offset="1">
            <div class="leftText">
            标准三角形溢租率导入：
            </div>
            <a class="rightText">标准三角形_溢租率导入.xlsx</a>
            <el-button class="importButton" type="primary" size="medium" v-on:click="importFile(7);">导入</el-button>
            <el-button class="exportButton" type="primary" size="medium" v-on:click="exportFile(7);">导出</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    areaId: '',
    areaList: {},
    projectList: {},
    data: {},
    loading: false,
    searchForm: {},
    infoData: {},
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0
  }),
  created () {
    window.$getAreaList().then(res => {
      this.areaList = res
    }, err => {
      this.showAlert(err)
    })
  },
  methods: {
    areaChanged(){
       window.$getProjectListForArea(this.areaId).then(res => {
         this.projectList = res
       }, err => {
         this.showAlert(err)
       })
    },
    importFile (type) {
      if(!searchForm.projectId){
        this.showAlert('请选择项目')
      }

      let url = ''
      if(type === 1){
        url = '/importexcel/excel/guestimport/sheet'
      } else if(type === 2){
        url = '/standimport/excel/standguestimport/sheet'
      } else if(type === 3){
        url = '/importexcel/excel/rentimport/sheet'
      } else if(type === 3){
        url = '/importexcel/excel/rentimport/sheet'
      } else if(type === 4){
        url = '/importexcel/excel/fittedimport/sheet'
      } else if(type === 5){
        url = ''
      } else if(type === 6){
        url = ''
      } else if(type === 7){
        url = ''
      } 
    },
    exportFile (type) {
      if(!searchForm.projectId){
        this.showAlert('请选择项目')
      }

      let url = ''
      if(type === 1){
        url = '/standardexport/excel/dtkxd'
      } else if(type === 2){
        url = '/standardexport/excel'
      } else if(type === 3){
        url = '/standardexport/excel/dtyzl'
      } else if(type === 4){
        url = '/standardexport/excel/dtspz'
      } else if(type === 5){
        url = ''
      } else if(type === 6){
        url = ''
      } else if(type === 7){
        url = ''
      } 
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
    height: 150%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
.leftText{
  width: 30%;
  display: inline-block;
  margin-left: 10%;
}
.rightText{
  display: inline-block;
  width: 20%;
}
.importButton{
  margin-left: 40px
}
.exportButton{
  
}
</style>
