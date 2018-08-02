<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="data">
        <el-col :span="6">
        <el-form-item label="铺位：">
          <el-input size="small" v-model="data.name" :maxlength="11" placeholder="请输入铺位名称"></el-input>
        </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="区域：">
            <el-select size="small" v-model="data.areaId" placeholder="请选择区域" @change="getProjectList()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="公司：">
            <el-select size="small" v-model="data.companyId" placeholder="请选择公司">
              <el-option v-for="(item, index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 项目：">
            <el-select size="small" v-model="data.projectId" placeholder="请选择项目" @change="getBuilding()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="楼栋：">
            <el-select size="small" v-model="data.buildingId" placeholder="请选择楼栋" @change="getFloor()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="6">
          <el-form-item label="楼层：">
            <el-select size="small" v-model="data.floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="面积/平：">
            <el-input size="small" v-model="data.acreage" :maxlength="11" placeholder="请输入面积"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="状态：">
            <el-select size="small" v-model="data.state" placeholder="请选择状态">
              <el-option v-for="(item, index) in stateList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br><br><br>


        <div class="xxk">
          <button type="button" @click="goBack()">取消</button>
          <button type="button" @click="edit()">确定</button>
        </div>


      </el-form>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data: () => ({
      data: {},
      loading: false,
      areaList: [],
      projectList: [],
      buildingList: [],
      floorList: [],
      companyList: [],
      stateList: [
        {
          name: '启用',
          id: 1
        },
        {
          name: '禁用',
          id: 2
        }
      ]
    }),
    created () {
      this.getData()
    },
    methods: {
      getData(){
        window.$getCompanyAll().then((res) => {
          this.companyList = res
        }, (err) => {
          this.showAlert(err)
        })
        window.$getAreaList().then((res) => {
            this.areaList = res
            window.$getStoreDetails(this.$route.params.id).then((res) => {
              this.data = res
              this.getProjectList()
            }, (err) => {
              this.showAlert(err)
            })
          }, (err) => {
            this.showAlert(err)
          })
      },
      getProjectList(){
        window.$getProjectListForArea(this.data.areaId).then((res) => {
          this.projectList = res
          this.getBuilding()
        }, (err) => {
          this.showAlert(err)
        })
      },
      getBuilding(){
        window.$getBuilding(this.data.projectId).then((res) => {
          this.buildingList = res
          this.getFloor()
        }, (err) => {
          this.showAlert(err)
        })
      },
      getFloor(){
        window.$getFloorForBuilding(this.data.buildingId).then((res) => {
          this.floorList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      edit(){
        window.$editStore(this.data).then((res) => {
          this.showAlert('修改成功')
          this.goBack()
        }, (err) => {
          this.showAlert(err)
        })
      },
      goBack(){
        this.$router.back(-1)
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
    margin-bottom: -6px;
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
