<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
        <el-form-item label="铺位：">
          <el-input size="small" v-model="searchForm.name" :maxlength="11" placeholder="请输入"></el-input>
        </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="区域：">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="getProjectList()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="公司：">
            <el-select size="small" v-model="searchForm.companyId" placeholder="请选择公司">
              <el-option v-for="(item, index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="所属项目：">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="getBuildingList()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="楼栋：">
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="getFloorList()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="6">
          <el-form-item label="楼层：">
            <el-select size="small" v-model="searchForm.floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="状态：">
            <el-select size="small" v-model="searchForm.state" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="面积/平：">
            <el-input size="small" v-model="searchForm.acreage" :maxlength="11" placeholder="请输入面积"></el-input>
          </el-form-item>
        </el-col>


        <div class="xxk">
          <button type="button" @click="goBack()">取消</button>
          <button type="button" @click="create()">确定</button>
        </div>

      </el-form>
    </el-row>
  </div>
</template>
<script>
  export default {
    data: () => ({
      loading: false,
      searchForm: {},
      areaList: [],
      companyList: [],
      projectList: [],
      buildingList: [],
      floorList: []
    }),
    created () {
      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {
        this.showAlert(res)
      })

      window.$getCompanyAll().then((res) => {
        this.companyList = res
      }, (err) => {
        this.showAlert(res)
      })
    },
    methods: {
      create(){
        window.$createStore(this.searchForm).then((res) => {
          this.showAlert('添加成功')
          this.goBack()
        }, (err) => {
          this.showAlert(err)
        })
      },
      goBack(){
        this.$router.back(-1)
      },
      getFloorList(){
        window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {
          this.floorList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      getBuildingList(){
        window.$getBuilding(this.searchForm.projectId).then((res) => {
          this.buildingList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      getProjectList(){
        window.$getProjectListForArea(this.searchForm.areaId).then((res) => {
          this.projectList = res
        }, (err) => {
          this.showAlert(err)
        })
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
  .el-col-10 {
    width: 41.66667%;
    margin-top: 45px;
  }
  .el-form-item{
    margin-bottom: 3px;
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


</style>
