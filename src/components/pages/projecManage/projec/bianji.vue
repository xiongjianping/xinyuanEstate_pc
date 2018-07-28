<template>
  <!--新增项目-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="searchForm">


      <el-form-item label="项目名称">
        <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
      </el-form-item>


      <el-form-item label="区域">
        <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域">
          <el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-col :span="6">
        <el-form-item label="公司">
          <el-select size="small" v-model="searchForm.companyId" placeholder="请选择公司" @change="getDepartment()">
            <el-option v-for="(item,index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col><br><br><br><br><br>

        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.state" placeholder="请选择状态">
              <el-option v-for="(item,index) in stateList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="面积/平：">
            <el-input size="small" v-model="searchForm.acreage" :maxlength="11" placeholder=" "></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" :offset="1">
          <el-form-item label="部门">
            <el-select size="small" v-model="departmentId" placeholder="请选择部门" @change="getPerson()">
              <el-option v-for="(item,index) in departmentList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" :offset="1">
          <el-form-item label="运营负责人">
            <el-select size="small" v-model="searchForm.projectHeadId" placeholder="请选择负责人">
              <el-option v-for="(item,index) in projectHeadList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

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
      loading: true,
      areaList: [],
      companyList: [],
      departmentList: [],
      projectHeadList: [],
      searchForm: {},
      departmentId: '',
      stateList:[
        {
          label: '启用',
          value: true
        },
        {
          label: '禁用',
          value: false
        },
      ]
    }),
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.searchForm.projectId = this.$route.params.id
        window.$getAreaList().then((res) => {
          this.areaList = res
          console.log(that)
        }, (err) => {
          this.showAlert(res)
        })

        window.$getCompanyAll().then((res) => {
          this.companyList = res
        }, (err) => {
          this.showAlert(res)
        })
        window.$getProjectDetails(this.$route.params.id).then((res) => {
          this.loading = false
          this.searchForm = res
          this.departmentId = res.deptId
          this.getDepartment()
        }, (err) => {
          this.loading = false
          this.showAlert(err)
        })
      },
      getDepartment(){
        // 查询部门
        window.$getDepartments(this.searchForm.companyId).then((res) => {
          this.departmentList = res
          this.getPerson()
        }, (err) => {
          this.showAlert(err)
        })
      },
      getPerson(){
        // 查询人员
        window.$getPersion(this.departmentId).then((res) => {
          this.projectHeadList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      edit(){
        console.log(this.searchForm)
        window.$editProject(this.searchForm).then((res) => {
          this.showAlert('编辑成功')
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
    margin-bottom: 30px;
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
