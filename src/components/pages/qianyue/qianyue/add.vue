<template>
  <!--签约-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">签约信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="searchForm">

          <el-col :span="6">
          <el-form-item label="业态：">
            <el-select size="small" v-model="business" placeholder="请选择业态" @change="businessChanged()">
              <el-option v-for="(item, index) in bList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
        <el-col :span="6">
          <el-form-item label="业种：">
            <el-select size="small" v-model="species" placeholder="请选择业种" @change="speciesChanged()">
              <el-option v-for="(item, index) in sList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">

          <el-form-item label="品牌：">
            <el-select size="small" v-model="sendData.brandId" placeholder="请选择品牌">
              <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="区域：">
            <el-select size="small" v-model="area" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="项目：">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="楼栋：">
            <el-select size="small" v-model="building" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="楼层：">
            <el-select size="small" v-model="sendData.floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
        <el-form-item label="铺位：">
          <el-input size="small" maxlength="11" v-model="searchForm.roomName" placeholder="请输入铺位"/>
        </el-form-item>
        </el-col>

        <el-row>
          <el-button type="primary" class="xuan" @click="searchList()">搜索</el-button>
        </el-row><br>

      <div class="biao">
        <el-table :data="resultList" height="280" border style="width: 100%;margin: 0 auto;" @selection-change="changeFun">
          <el-table-column type="selection" width="55" class="selection" prop='id' @selection-change="changeFun"></el-table-column>
          <el-table-column type="index" label="序号" style='height:50px;text-align: center'>
          </el-table-column>
          <el-table-column prop="floorName" label="楼层名称" style='text-align: center'>
          </el-table-column>
          <el-table-column prop="roomName" label="铺位名称" style='text-align: center'>
          </el-table-column>
        </el-table>

      </div>

        <div class="xxk">
          <button type="button" @click="goBack()">取消</button>
          <button type="button" @click="create()">确定</button>
        </div>

      </el-form>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data: () => ({
      business:'',
      species:'',
      area:'',
      store:'',
      building:'',
      sendData: {},
      areaList: {},
      projectList: {},
      buildingList: {},
      brandList: {},
      floorList: {},
      storeList: {},
      bList: {},
      sList: {},
      loading: false,
      searchForm: {},
      resultList: [],
      checkedList: []
    }),
    created () {
      window.$getformSelect().then((res) => {
        this.bList = res
      }, (err) => {})

      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {})

      // this.searchList()
    },
    methods: {
      searchList () {
        window.$getNoSignContract(this.searchForm).then((res) => {
          this.resultList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      businessChanged(){
        window.$getSpeciesSelect(this.business).then((res) => {
          this.sList = res
        }, (err) => {
          this.showAlert(err)
        })

      },
      speciesChanged(){
        window.$getBrandForSpecies(this.species).then((res) => {
          this.brandList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      areaChanged(){
        window.$getProjectListForArea(this.area).then((res) => {
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
        window.$getFloorForBuilding(this.building).then((res) => {
          this.floorList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      changeFun(val){
        this.checkedList = val
      },
      create(){
        this.sendData.projectId = this.searchForm.projectId
        this.sendData.roomId = []
        for(var i = 0; i < this.checkedList.length; i++) {
          this.sendData.roomId.push(this.checkedList[i].roomId)
        }
        window.$createContract(this.sendData).then((res) => {
          this.showAlert('新增成功')
          this.goBack()
        }, (err) => {
          this.showAlert(err)
        })
      },
      goBack(){
        this.$router.back(-1)
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
  .xuan{
    margin-left: 170px;
    margin-top: 40px;
  }
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  .el-col-10 {
    width: 41.66667%;
    margin-top: 45px;
  }
  .el-form-item{
    margin-bottom: -7px;
    margin-top: 20px;
    margin-left: 52px;
  }
  .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 17px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  el-button{
    background: rgb(22,155,213);
  }
  .xxk{
    width: 100%;
    height: 100px;
    button{
      width: 100px;
      height: 50px;
      display: inline-block;
      border-radius: 10px;
      background: rgb(22,155, 213);
      outline:medium;
      outline: none;
      position: relative;
      left:500px;
      top: 50px;
      margin-left: 20px;
    }
  }
  .biao{
    width: 350px;
    height: 350px;
    border: 0px solid #fff;
    margin-left: 160px;
    el-table{
      margin-left: 10px;
    }
    /*.main{*/
      /*width: 280px;*/
      /*height: 280px;*/
      /*border: 1px solid #000;*/
      /*margin: 0 auto;*/
      /*margin-top: 10px;*/
      /*tr{*/
        /*height: 20px;*/
        /*border: 1px solid #CCC;*/
        /*background: red;*/
      /*}*/
      /*!*th,tr,td{*!*/
        /*!*height: 20px;*!*/
        /*!*border: 1px solid #ccc;*!*/
        /*!*border-collapse: collapse;*!*/
        /*!*text-align: center;*!*/
      /*!*}*!*/
    /*}*/
  }


</style>
