<template>
  <!--新增项目-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="searchForm">

        <el-col :span="6">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域">
              <el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

      <el-col :span="6">
        <el-form-item label="公司">
          <el-select size="small" v-model="searchForm.companyId" placeholder="请选择公司" @change="getDepartment()">
            <el-option v-for="(item,index) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

        <el-col :span="6"   >
          <el-form-item label="部门">
            <el-select size="small" v-model="searchForm.deptId" placeholder="请选择部门" @change="getPerson()">
              <el-option v-for="(item,index) in departmentList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目负责人">
            <el-select size="small" v-model="projectHeadId" placeholder="请选择负责人">
              <el-option v-for="(item,index) in projectHeadList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="面积/平：">
            <el-input type="number" size="small" v-model="searchForm.acreage" :maxlength="11" placeholder=" "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.state" placeholder="请选择状态">
              <el-option v-for="(item,index) in stateList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开业时间">
            <el-input type="text" size="small" v-model="searchForm.createDate" :maxlength="11" placeholder="请输入开业时间"></el-input>
          </el-form-item>
        </el-col>







        <el-col class="uploadFiles mt40 mb10">
          <el-upload :action="getUploadUrl()"
                     list-type="picture-card"
                     :limit=6
                     :on-preview="handlePictureCardPreview"
                     :on-success="handleSuccess"
                     :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
        <el-col class="mb40 tip">
          (* 图片格式：png,jpg格式，1200px*1000px，大小不超过5M，限传5张)
        </el-col>

      </el-form>
    </el-row>
    <div class="xxk">
      <el-button type="primary" size="medium" class="mr10" @click="goBack()">取消</el-button>
      <el-button type="primary" size="medium" @click="edit()">确定</el-button>
    </div>
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
      searchForm: {
        projectImages: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
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
          console.log(res);

          window.$getDepartments(this.searchForm.companyId).then((res) => {
            this.departmentList = res
          }, (err) => {
            this.showAlert(err)
          })

          window.$getPersion(this.departmentId).then((res) => {
            this.projectHeadList = res
          }, (err) => {
            this.showAlert(err)
          })
        }, (err) => {
          this.loading = false
          this.showAlert(err)
        })
      },
      //通过公司获取部门(GET)
      getDepartment(){
        this.departmentId = ''
        this.searchForm.projectHeadId = ''
        // 查询部门
        window.$getDepartments(this.searchForm.companyId).then((res) => {
          this.departmentList = res
        }, (err) => {
          this.showAlert(err)
        })

      },
      getPerson(){
        this.searchForm.projectHeadId = ''
        window.$getPersion(this.searchForm.deptId).then((res) => {
          this.projectHeadList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      getUploadUrl(){
        return window.$baseUrl + '/file/upload/localhost'
      },
      handleSuccess(file){
        this.searchForm.projectImages.push(file.data)
      },
      handlePictureCardPreview(file){
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemove(file, fileList) {
        for(var i = this.searchForm.projectImages.length - 1; i >= 0; i--){
          if(this.searchForm.projectImages[i] === file.response.data){
            console.log(i)
            this.searchForm.projectImages.splice(i, 1)
          }
        }
      },
      // deleteImg(){
      //   for(var i = this.searchForm.projectImages.length - 1; i >= 0; i--){
      //     this.searchForm.projectImages.slice(i, 1)
      //   }
      // },

      edit(){
        this.loading = true
        this.searchForm.projectHeadId = this.projectHeadId
        window.$editProject(this.searchForm).then((res) => {
          this.loading = false
          this.searchForm = {}
          this.showAlert('编辑成功')
          this.goBack()
        }, (err) => {
          this.loading = false
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
  /*.xxk{*/
    /*width: 100%;*/
    /*height: 100px;*/
    /*button{*/
      /*width: 100px;*/
      /*height: 50px;*/
      /*display: inline-block;*/
      /*border-radius: 10px;*/
      /*background: rgb(22,155, 213);*/
      /*outline:medium;*/
      /*outline: none;*/
      /*position: relative;*/
      /*left:500px;*/
      /*top: 50px;*/
      /*margin-left: 20px;*/
    /*}*/
  /*}*/
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
  .uploadFiles{
    width: 100%;
    height: 150px;
  }
  .tip{
    color: #f4282c;
    font-size: 14px;
    font-weight: bold;
  }
  .img{
    width: 100px;
    height: 100px;
  }
  .buttonlist{
    width:200px;
    margin: 100px auto 0 auto;
  }

</style>
